const express = require("express")
const path = require('path')
const BlogPost = require('./models/blogPost.js')


// calls express function to start new Express app
const app = express()
const ejs = require('ejs')

// sets ejs as templating engine
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json()) 
app.use(express.urlencoded())


app.listen(4000, () => {
    console.log("App listening on port 4000")
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body)
    res.redirect('/')
    // BlogPost.create(req.body, (error, blogpost) => {
    //     res.redirect('/')
    // })
})

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
        res.render('index', {
            blogposts
        })
})