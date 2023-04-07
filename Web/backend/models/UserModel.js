const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    }
})

//static signup method

userSchema.statics.signup = async function (email, password, username) {

    if (!email || !password || !username) {
        throw Error("All fields are required")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("Email already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, username })
    return user
}

// static login method
userSchema.statics.login = async function (username, password) {

    if (!username || !password) {
        throw Error("All fields are required")
    }

    const user = await this.findOne({ username })

    if (!username) {
        throw Error("Invalid Username")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect Password")
    }

    return user

}

module.exports = mongoose.model("User", userSchema);