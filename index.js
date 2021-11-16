const express = require('express')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')

// customed middleware
const validateMiddleware = require('./middleware/validateMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAutenticatedMiddleware = require('./middleware/redirectIfAutenticatedMiddleware')


// controllers
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home') 
const storePostController = require('./controllers/storePost') 
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginUserController = require('./controllers/loginUser')
const loginController = require('./controllers/login')
const logoutController = require('./controllers/logout')

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

// middleware
app.use('/posts/store', validateMiddleware)


// session
app.use(expressSession({
    secret: 'keyboard cat'
}))




app.listen(4000, () => {
    console.log("App listening on port 4000")
})

// declaring a gobal variable that will be accessible from all EJS files 
global.loggedIn = null

// this middleware will be executed on all requests
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

// home
app.get('/', homeController)

// single post
app.get('/post/"id', getPostController)

// user login
app.get('/auth/login', redirectIfAutenticatedMiddleware, loginController)

// user register form
app.get('/auth/register', redirectIfAutenticatedMiddleware, newUserController)

// user login
app.post('/users/login', redirectIfAutenticatedMiddleware, loginUserController)

// storing user info
app.post('/users/register', redirectIfAutenticatedMiddleware, storeUserController)


// authMiddleware will be called before the controllers

// new post
app.get('/posts/new', authMiddleware, newPostController)

// storing a post
app.post('/posts/store', authMiddleware, storePostController)

// user log out
app.get('/auth/logout', logoutController)

