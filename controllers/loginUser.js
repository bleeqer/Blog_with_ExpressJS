const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const {username, password} = req.body
    User.findOne({username: username}, (error, user) => {
        if (user) {
            console.log(user.password)
            console.log(password)

            if (user.password == password) {
                console.log("비밀번호 같음")
            }
            bcrypt.compare(password, user.password, (error, same) => {
                console.log(error)
                console.log(same)
                if (same) {
                    // the session package saves _id on the user's browser so that each time the user makes a request, this cookie will be sent back to the server with the authenticated id
                    req.session.userId = user._id
                    res.redirect('/')
                } else {
                    res.redirect('/auth/login')
                }
            })
        } else {
            res.redirect('/auth/login')
        }
    })
}