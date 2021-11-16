const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    const blogPosts = await BlogPost.find({}).populate('userid')

    res.render('index', {
        blogPosts
    })
}