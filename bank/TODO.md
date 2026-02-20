# TODO - Fix All Errors in Bank Application

## Identified Errors and Fixes:

### 1. src/routes/transaction.routes.js
- [ ] Fix: Change `transactionController.createFundTransaction` to `transactionController.createInitialFundsTransaction`

### 2. src/controllers/transaction.controller.js
- [ ] Fix: Change `require("../services/email.service")` to `require("../services/email.services")`
- [ ] Fix: Add proper transaction rollback with `session.abortTransaction()` in catch block
- [ ] Fix: Move email sending inside try-catch or add proper error handling
- [ ] Fix: Add try-catch to `createInitialFundsTransaction` function

### 3. src/controllers/account.controller.js
- [ ] Fix: Add try-catch to `getUserAccountsController` function

### 4. src/routes/account.routes.js
- [ ] Fix: Change `authMiddleware.authMiddleware` to `authMiddleware`

### 5. src/services/email.services.js
- [ ] Fix: Remove redundant `require("dotenv").config()` line

## Progress:
- [ ] Step 1: Fix transaction.routes.js
- [ ] Step 2: Fix transaction.controller.js
- [ ] Step 3: Fix account.controller.js
- [ ] Step 4: Fix account.routes.js
- [ ] Step 5: Fix email.services.js
