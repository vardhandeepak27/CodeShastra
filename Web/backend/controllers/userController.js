const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}


//login user
const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)

        res.status(200).json({ _id: user._id, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Signup user
const signupUser = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const user = await User.signup(email, password, username)
        const token = createToken(user._id)

        res.status(200).json({ email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getuser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}

module.exports = { loginUser, signupUser, getuser }