const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true})

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// tells the schema execute the call back function before 'save' a document
// mongoose makes the UserSchema available via 'this'
UserSchema.pre('save', function(next) {
    const user = this
    console.log('유저 객체 확인: ', user)
    // the second argument means how many rounds the function hash the password
    bcrypt.hash(user.password, 10, (error, hash) => {
        console.log(error, hash)
        user.password = hash

        next()
    })
})

const User = mongoose.model("User", UserSchema)

module.exports = User
