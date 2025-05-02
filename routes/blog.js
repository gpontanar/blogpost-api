const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const auth = require('../auth');


router.post('/', auth.verify, auth.isLoggedIn, blogController.createBlogPost);
router.get('/', blogController.getAllBlogPosts);
router.get('/:id', blogController.getBlogPostById);
router.put('/:id', auth.verify, auth.isLoggedIn, blogController.updateBlogPost);
router.delete('/:id', auth.verify, auth.isLoggedIn, blogController.deleteBlogPost);

module.exports = router;