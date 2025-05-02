const BlogPost = require('../models/Blog');

// Create a blog post
module.exports.createBlogPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blogPost = new BlogPost({ title, content, author: req.user.id });
        await blogPost.save();
        res.status(201).json(blogPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all blog posts
module.exports.getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().populate('author', 'username');
        res.json(blogPosts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single blog post
module.exports.getBlogPostById = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id).populate('author', 'username');
        if (!blogPost) return res.status(404).json({ message: 'Post not found' });
        res.json(blogPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a blog post
module.exports.updateBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findOneAndUpdate(
            { _id: req.params.id, author: req.user.id },
            req.body,
            { new: true }
        );
        if (!blogPost) return res.status(403).json({ message: 'Unauthorized' });
        res.json(blogPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a blog post
module.exports.deleteBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findOneAndDelete({ _id: req.params.id, author: req.user.id });
        if (!blogPost) return res.status(403).json({ message: 'Unauthorized' });
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};