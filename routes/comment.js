const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment'); // Ensure this path is correct
const auth = require('../auth');

// Add a comment to a blog post
router.post('/:blogPostId', auth.verify, auth.isLoggedIn, commentController.addComment);

// Get all comments for a specific blog post
router.get('/:blogPostId', commentController.getCommentsForBlogPost);

// Admin delete a comment
router.delete('/admin/:id', auth.verify, auth.verifyAdmin, commentController.deleteComment);

module.exports = router;