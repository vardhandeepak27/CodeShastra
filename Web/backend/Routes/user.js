const express = require("express")
const fetchuser = require("../middleware/fetchuser")

const { loginUser, signupUser, getuser } = require("../controllers/userController")

const router = express.Router()

router.post("/login", loginUser)

router.post("/signup", signupUser)

router.post('/getuser', fetchuser, getuser)


module.exports = router