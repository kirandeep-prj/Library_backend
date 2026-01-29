const { z } = require("zod");

exports.createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  Author: z.string().min(1, "Author is required"),
  Category: z.string().min(1, "Category is required")
});

exports.updateBookSchema = z.object({
  title: z.string().optional(),
  Author: z.string().optional(),
  Category: z.string().optional()
});
