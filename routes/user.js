const express = require("express");
const router = express.Router();

const user = require("../controllers/user");
const validate = require("../validators/validate");
const book=require("../controllers/book");
const restrictTo = require("../middleware/restrictTo");
const auth = require("../middleware/auth");
const admin = require("../controllers/admin")
const { registerSchema, loginSchema } = require("../validators/user.schema");

router.post("/register", validate(registerSchema), user.register);
router.post("/login", validate(loginSchema), user.login);
router.get("/admin/users", auth, restrictTo("admin"), admin.getAllUsers);

router.get("/allbooks",auth,restrictTo("user"),book.getAllAvailableBooks);
router.patch("/borrowedBook/:id",auth,restrictTo("user"),book.borrowedBook);
router.patch("/returnBook/:id",auth,restrictTo("user"),book.returnBook);
module.exports = router;
