const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = async (req, res) => {
    if (req.files) {
        console.log("storing post with img")
        console.log("req.files: ", req.files)
        let image = req.files.image
        image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name
            }, (error, post) => {
                if (error) {
                    const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                    req.flash('validationErrors', validationErrors)
                    req.flash('data', req.body)
                    res.redirect('/posts/new')
                } else {
                    res.redirect('/')
                }
            })
        })
    } else {
        console.log("storing post without img")
        await BlogPost.create({
            ...req.body
        }, (error, post) => {
            if (error) {
                console.log("issue occured during creating")
                const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                req.flash('validationErrors', validationErrors)
                req.flash('data', req.body)
                return res.redirect('/posts/new')
            } else {
                res.redirect('/')
            }
        })
    }
    
}