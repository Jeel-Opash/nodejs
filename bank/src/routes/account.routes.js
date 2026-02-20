const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth.middleware")
const accountController = require("../controllers/account.controller")

router.post("/", authMiddleware, accountController.createAccountController)
router.get("/", authMiddleware, accountController.getUserAccountsController)
router.get("/balance/:accountId", authMiddleware, accountController.getAccountBalanceController)

module.exports = router;
