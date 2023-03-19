require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')
const genPassword = require('./lib/passwordUtils').genPassword
const methodOverride = require('method-override')
const session = require('express-session');
const passport = require('passport')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')
const passportLocal = require('passport-local')
const articleRouter = require('./routers/articles')
const app = express()

const dbString = "mongodb+srv://harrislich:_Welc0memanuel13@cluster0.amkrpdx.mongodb.net/?retryWrites=true&w=majority"
mongoose.set({strictQuery: false})
mongoose.connect(dbString)

const sessionStore = MongoStore.create({ mongoUrl: dbString, collectionName: 'session' })

app.use(session({
    secret: "ASHJDKLSAFS21341lkjdsfa234dfSAD",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

require("./passport-config")
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("index")
})

app.get('/register', (req, res) => {
    res.render("login/register")
})

app.get('/logout', function(req, res, next) {
    console.log('user has logged out')
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

app.post('/register', async (req, res) => {
    try {
        const saltHash = genPassword(req.body.password)
        const salt = saltHash.salt
        const hash = saltHash.hash
        let user = new User()
        user.username = req.body.username
        user.hash = hash
        user.salt = salt
        const registerUser = await user.save().then((user) => {
            console.log(user)
        })
        res.redirect('/login')
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})

app.get('/login', (req,res)=>{
    res.render('login/login')
})

app.post('/login', passport.authenticate('local', { failureRedirect:'/login', successRedirect: '/' }))

app.use("/articles", articleRouter)

app.listen(5000)
