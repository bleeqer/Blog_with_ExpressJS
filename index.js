const express = require('express')
const fileUpload = require('express-fileupload')
const validateNiddleware = require('./middleware/validateMiddleware')

// controllers
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home') 
const storePostController = require('./controllers/storePost') 
const getPostController = require('./controllers/getPost')

// calls express function to start new Express app
const app = express()
const ejs = require('ejs')

// sets ejs as templating engine
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json()) 
app.use(express.urlencoded())

// i switched the order because we call req in the middleware which has file property
app.use(fileUpload())

// middleware tests
app.use('/posts/store', validateMiddleWare)




app.listen(4000, () => {
    console.log("App listening on port 4000")
})

app.get('/', homeController)
app.get('/post/"id', getPostController)
app.post('/posts/store', storePostController)

