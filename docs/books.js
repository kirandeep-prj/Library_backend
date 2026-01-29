/**
 * @swagger
 * /api/users/allbooks:
 *   get:
 *     summary: Get all books (member only)
 *     tags: [Books]
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
 *         description: Forbidden - member only
 */
/**
 * @swagger
 * /api/users/borrowedBook/{id}:
 *   patch:
 *     summary: borrowed any book (memeber only)
 *     tags: [Books]
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
 *         description: Book Borrowed Successfully
 *       404:
 *         description: Book not found
 *       403:
 *         description: Forbidden
 */
/**
 * @swagger
 * /api/users/returnBook/{id}:
 *   patch:
 *     summary: return any book (memeber only)
 *     tags: [Books]
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
 *         description: Book return Successfully
 *       404:
 *         description: Book not found
 *       403:
 *         description: Forbidden
 */

