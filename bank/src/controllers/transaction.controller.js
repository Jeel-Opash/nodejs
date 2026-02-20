const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const accountModel = require("../models/account.model")
const emailService = require("../services/email.services")
const mongoose = require("mongoose")



async function createTransaction(req, res) {

    const { fromAccount, toAccount, amount, idempotencyKey } = req.body

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "FromAccount, toAccount, amount and idempotencyKey are required"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,
    })

    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })

    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Invalid fromAccount or toAccount"
        })
    }
    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })

    if (isTransactionAlreadyExists) {
        if (isTransactionAlreadyExists.status === "COMPLETED") {
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: isTransactionAlreadyExists
            })

        }

        if (isTransactionAlreadyExists.status === "PENDING") {
            return res.status(200).json({
                message: "Transaction is still processing",
            })
        }

        if (isTransactionAlreadyExists.status === "FAILED") {
            return res.status(500).json({
                message: "Transaction processing failed, please retry"
            })
        }

        if (isTransactionAlreadyExists.status === "REVERSED") {
            return res.status(500).json({
                message: "Transaction was reversed, please retry"
            })
        }
    }





    if (fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
        return res.status(400).json({
            message: "Both fromAccount and toAccount must be ACTIVE to process transaction"
        })
    }




    const balance = await fromUserAccount.getBalance()

    if (balance < amount) {
        return res.status(400).json({
            message: `Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}`
        })
    }

    let transaction;
    try {
        transaction = await transactionModel.create({
            fromAccount,
            toAccount,
            amount,
            idempotencyKey,
            status: "PENDING"
        })

        const debitLedgerEntry = await ledgerModel.create({
            account: fromAccount,
            amount: amount,
            transaction: transaction._id,
            type: "DEBIT"
        })

        // Artificial delay removed or kept if it was intentional for testing
        // await new Promise((resolve) => setTimeout(resolve, 15 * 1000));

        const creditLedgerEntry = await ledgerModel.create({
            account: toAccount,
            amount: amount,
            transaction: transaction._id,
            type: "CREDIT"
        })

        transaction = await transactionModel.findOneAndUpdate(
            { _id: transaction._id },
            { status: "COMPLETED" },
            { new: true }
        )


        // Non-blocking email send
        emailService.sendTransactionEmail(req.user.email, req.user.name, amount, toAccount)
            .catch(err => console.error("Email send failed:", err));

        return res.status(201).json({
            message: "Transaction completed successfully",
            transaction: transaction
        })

    } catch (error) {
        console.error("Transaction failed:", error);
        return res.status(400).json({
            message: "Transaction is Pending due to some issue, please retry after sometime",
        })

    }

}

async function createInitialFundsTransaction(req, res) {
    try {
        const { toAccount, amount, idempotencyKey } = req.body

        if (!toAccount || !amount || !idempotencyKey) {
            return res.status(400).json({
                message: "toAccount, amount and idempotencyKey are required"
            })
        }

        const toUserAccount = await accountModel.findOne({
            _id: toAccount,
        })

        if (!toUserAccount) {
            return res.status(400).json({
                message: "Invalid toAccount"
            })
        }

        const fromUserAccount = await accountModel.findOne({
            user: req.user._id
        })

        if (!fromUserAccount) {
            return res.status(400).json({
                message: "System user account not found"
            })
        }

        const transaction = new transactionModel({
            fromAccount: fromUserAccount._id,
            toAccount,
            amount,
            idempotencyKey,
            status: "PENDING"
        })

        const debitLedgerEntry = await ledgerModel.create({
            account: fromUserAccount._id,
            amount: amount,
            transaction: transaction._id,
            type: "DEBIT"
        })

        const creditLedgerEntry = await ledgerModel.create({
            account: toAccount,
            amount: amount,
            transaction: transaction._id,
            type: "CREDIT"
        })

        transaction.status = "COMPLETED"
        await transaction.save()

        return res.status(201).json({
            message: "Initial funds transaction completed successfully",
            transaction: transaction
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error processing initial funds transaction"
        })
    }
}

module.exports = {
    createTransaction,
    createInitialFundsTransaction
}
