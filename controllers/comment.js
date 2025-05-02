const Comment = require('../models/Comment');
const BlogPost = require('../models/Blog');

// Add a comment to a blog post
module.exports.addComment = async (req, res) => {
    try {
        const { comment } = req.body; // Ensure this matches the request body
        const { blogPostId } = req.params;

        // Ensure the blog post exists
        const blogPost = await BlogPost.findById(blogPostId);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        const newComment = new Comment({
            comment: comment, // Map 'content' to 'comment'
            author: req.user.id,
            blogPost: blogPostId,
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get all comments for a specific blog post
module.exports.getCommentsForBlogPost = async (req, res) => {
    try {
        const { blogPostId } = req.params;

        const comments = await Comment.find({ blogPost: blogPostId }).populate('author', 'username');
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin delete a comment
module.exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};