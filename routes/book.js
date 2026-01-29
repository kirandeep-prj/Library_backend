const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const validate = require("../validators/validate");
const restrictTo = require("../middleware/restrictTo");
const admin =require("../controllers/admin");


const {
  createBookSchema,
  updateBookSchema
} = require("../validators/book.schema");

router.get("/admin/all", auth, restrictTo("admin"),admin.getAllBookForAdmin);
router.get("/admin/borrowed-map",auth,restrictTo("admin"),admin.adminBorrowedMap);
router.delete("/admin/:id", auth, restrictTo("admin"), admin.adminDeleteBook);
router.put("/admin/:id", auth, validate(updateBookSchema), restrictTo("admin"), admin.updateBookByAdmin);
router.get("/admin/:id", auth, restrictTo("admin"), admin.getSingleBook);

router.post("/admin/createBook", auth, validate(createBookSchema), restrictTo("admin"), admin.createBook);



module.exports = router;
