const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true})
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    title: String,
    body: String,
})

const BlogPost = mongoose.model("BlogPost", BlogPostSchema)

module.exports = BlogPost
