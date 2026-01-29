/**
 * @swagger
 * /api/books/admin/all:
 *   get:
 *     summary: Get all books (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search books by title, Author, Category
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Books per page
 *     responses:
 *       200:
 *         description: List of all Books
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /api/books/admin/{id}:
 *   delete:
 *     summary: Delete any book (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted by admin
 *       404:
 *         description: Book not found
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/books/admin/{id}:
 *   put:
 *     summary: Update any book (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               Author:
 *                 type: string
 *               Category:
 *                 type: string
 *               Availablecopies:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated by admin
 *       404:
 *         description: Book not found
 *       403:
 *         description: Forbidden
 */
/**
 * @swagger
 * /api/books/admin/{id}:
 *   get:
 *     summary: Get single book (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get single book by admin
 *       404:
 *         description: Book not found
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/books/admin/borrowed-map:
 *   get:
 *     summary: View book sharing map (Admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shared books mapping
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 results:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/books/admin/createBook:
 *   post:
 *     summary: Create a new book (Admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - Author
 *               - Category
 *             properties:
 *               title:
 *                 type: string
 *               Author:
 *                 type: string
 *               Category:
 *                 type: string
 *               Availablecopies:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created
 */
/**
 * @swagger
 * /api/users/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin-User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 results:
 *                   type: number
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 */
