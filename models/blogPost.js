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
    userid: {
        // the value is supposed to be a valid Mongo object id
        type: mongoose.Schema.Types.ObjectId,
        // tells which collection it should refer to
        ref: 'User',
        required: true
    }, 
    datePosted:{
        type: Date, 
        default: new Date()
    },
    image: String
})

const BlogPost = mongoose.model("BlogPost", BlogPostSchema)

module.exports = BlogPost
