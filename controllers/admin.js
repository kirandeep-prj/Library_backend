const Book = require("../models/Book");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { logInfo } = require("../utils/logger");
const User = require("../models/User")

// ONLY ADMIN CAN ACCESS THIS
exports.getAllBookForAdmin = catchAsync(async (req, res, next) => {

  //paggination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  
  const skip = (page - 1) * limit;

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: "i" } },
          { Author: { $regex: req.query.keyword, $options: "i" } },
          { Category: { $regex: req.query.keyword, $options: "i" } },
        ]
      }
    : {};


const allBooks = await Book.find({
  ...keyword
})
  .collation({ locale: "en", strength: 2 }) 
  .skip(skip)
  .limit(limit);


  res.status(200).json({
    success: true,
    count: allBooks.length,
    data: allBooks,
  });
});

// ADMIN CAN DELETE ANY Book
exports.adminDeleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  await book.deleteOne();
  
  logInfo(`Admin deleted book: ${book._id}`);

  res.status(200).json({
    status: "success",
    message: "Book deleted by admin",
  });
});


// ADMIN UPDATE Book (separate API)
exports.updateBookByAdmin = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError("book not found", 404));
  }

  // Admin can update ANY book — no ownership check needed
  book.title = req.body.title || book.title;
  book.Author = req.body.Author || book.content;
  book.Category = req.body.Category || book.Category;
  book.Availablecopies = req.body.Availablecopies || book.Availablecopies;
 

  await book.save();

  logInfo(`Admin updated book: ${book._id}`);

  res.json({
    status: "success",
    message: "book updated by admin",
    book
  });
});

// ADMIN: VIEW borrowed books MAP
exports.adminBorrowedMap = catchAsync(async (req, res, next) => {
  const books = await Book.find({
    "Borrowed.0": { $exists: true } // only nbooks borrowed
  })
    .populate("Borrowed.user", "name email"); // shared users

  const result = books.map(book => ({
    bookId: book._id,
    title: book.title,
    book: book.Author,

    Borrowed: book.Borrowed.map(s => ({
      user: s.user,
    }))
  }));

  res.status(200).json({
    status: "success",
    results: result.length,
    data: result
  });
});

// CREATE book
exports.createBook = catchAsync(async (req, res, next) => {
  const {  title, Author, Category, Availablecopies} = req.body;

  const book = await Book.create({
    title,
    Author,
    Category,
    Availablecopies,
    user: req.user.id,
  });

  logInfo(`Book created: ${book._id}`);

  res.status(201).json(book);
});

//get single book details

exports.getSingleBook = catchAsync(async(req, res, next)=>{
  const book= await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});

//ADMIN CAN SEE THE LIST OF USERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("name email role createdAt");

  res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
});