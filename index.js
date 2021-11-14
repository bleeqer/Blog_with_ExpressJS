const express = require('express')
const fileUpload = require('express-fileupload')
const validateNiddleware = require('./middleware/validateMiddleware')

// controllers
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home') 
const storePostController = require('./controllers/storePost') 
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = required('./controllers/login')

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

// home
app.get('/', homeController)

// single post
app.get('/post/"id', getPostController)

// user register form
app.get('/auth/register', newUserController)

app.get('/auth/login', loginController)

// storing user info
app.post('/users/register', storeUserController)

// storing a post
app.post('/posts/store', storePostController)


