const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true})
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide title']

    },
    body: {
        type: String,
        required: [true, 'Please provide content']
    },
    username: String, 
    datePosted:{
        type: Date, 
        default: new Date()
    },
    image: String
})

const BlogPost = mongoose.model("BlogPost", BlogPostSchema)

module.exports = BlogPost
