const Book = require("../models/Book");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { logInfo } = require("../utils/logger");
const User = require("../models/User")


exports.getAllAvailableBooks = catchAsync(async(req,res,next)=>{
    //paggination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      
      const skip = (page - 1) * limit;
    
      const keyword = req.query.keyword
        ? {
            $or: [
              { title: { $regex: req.query.keyword, $options: "i" } },
              { Author: { $regex: req.query.keyword, $options: "i" } },
              { Category: { $regex: req.query.keyword, $options: "i" } }
            ]
          }
        : {};
    
    
    const allBooks = await Book.find({
        Availablecopies: { $gt: 0 }, // ✅ availability logic
        ...keyword,
    })
    .select("-Borrowed")   // 👈 hide borrowed info
    .collation({ locale: "en", strength: 2 }) 
    .skip(skip)
    .limit(limit);
    
    
    res.status(200).json({
        success: true,
        count: allBooks.length,
        data: allBooks,
    });
});

exports.borrowedBook = catchAsync(async(req,res,next)=>{
  const userId =req.user.id;
  const bookId = req.params.id;
  const book = await Book.findById(bookId);
  
  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  //check if user alreadyborrowed 
  const alreadyborrowed = book.Borrowed.some(
    (entry) => entry.user.toString()===userId.toString()
  );

  if(alreadyborrowed){
    return next(new AppError("You already borrowed this book",400))
  }

  //check availability
  if(book.Availablecopies <= 0){
    return next(new AppError("No copies available for this book", 400));
  }

  //borrow book
  book.Availablecopies -=1;

  book.Borrowed.push({
    user: userId
});
  await book.save();

  res.status(200).json({
    success:true,
    message:"Book borrowed successfully",
  })

});
//Return a book
exports.returnBook = catchAsync(async(req,res,next)=>{
  const userId =req.user.id;
  const bookId = req.params.id;
  const book = await Book.findById(bookId);
  
  if (!book) {
    return next(new AppError("Book not found", 404));
  }
  const alreadyReturned = book.Borrowed.some(
    (entry) => entry.user.toString()===userId.toString()
  );

  if(!alreadyReturned){
    return next(new AppError("You already returned or never Borrowed this book",400))
  }

  book.Availablecopies +=1;

  book.Borrowed.pop({
    user:userId
  })
  await book.save();

  res.status(200).json({
    success:true,
    message:"Book returned successfully",
  })

})