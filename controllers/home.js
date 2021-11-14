const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    const blogPosts = await BlogPost.find({})
    res.render('index', {
        blogPosts
    })
}