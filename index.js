const express = require("express")
const path = require('path')
const BlogPost = require('./models/blogPost.js')
const fileUpload = require('express-fileupload')


// calls express function to start new Express app
const app = express()
const ejs = require('ejs')

// sets ejs as templating engine
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json()) 
app.use(express.urlencoded())

app.use(fileUpload())


app.listen(4000, () => {
    console.log("App listening on port 4000")
})

app.get('/', async (req, res) => {
    word = req.query.searchWord

    if (word) {
        const blogposts = await BlogPost.find({title: new RegExp(word, "i")})
        res.render('index', {
            blogposts
        })
    } else {
        const blogposts = await BlogPost.find({})
            res.render('index', {
                blogposts
            })
    }
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', { blogpost })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    console.log(image)
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })

})

