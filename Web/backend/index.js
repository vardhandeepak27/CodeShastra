require('dotenv').config()

// const passport = require("passport");
// const cookieSession = require("cookie-session");
// const passportStrategy = require("./passport");

require("./Database/db")
const cors = require("cors");
const PORT = process.env.PORT

const express = require('express')
const userRoutes = require("./Routes/user")
// const profileRoutes = require("./Routes/profile")
// const chatRoutes = require("./Routes/chat")
// const authRouter = require('./routes/auth');


// express app
const app = express()

// app.use(logger('combined'));


app.use(cors({ origin: true }));

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/user', userRoutes)
// app.use('/api/profile', profileRoutes)
// app.use("/api/chat", chatRoutes)
// app.use('/api/auth/', authRouter);

app.listen(PORT, () => {
    console.log("Server connected")
})
