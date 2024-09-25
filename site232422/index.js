const express = require('express')
const app = express()
const path = require('path');
const mongoose = require('mongoose')
const session = require("express-session");

app.use(express.json());

//connessione al database
const mongoDBUri = "mongodb+srv://erikdervishi100:9kLXNrcPVfwKlfzd@site232422.5x4wa.mongodb.net/?retryWrites=true&w=majority&appName=site232422"
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
    realname: String,
    username: String,
    password: String
})

const User = mongoose.model("User", userSchema)

//gestione sessione
app.use(session({
    secret: 'site232422key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}))

//directory file statici
app.use(express.static(path.join(__dirname, 'public')))

//directory views
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render(path.join(__dirname, "public","index.html"))
})

//API sessione utente
app.post('/api/newreg', async (req, res) => {
    const user = await User.find({username: req.body.username})
    if(user[0]) {
        res.status(401).json({ success: false, message: "Registrazione non avvenuta. Prova a cambiare l'username." })
    }
    else {
        var newUser = new User({
            realname: req.body.realname,
            username: req.body.username,
            password: req.body.password
        })
        newUser.save()
        req.session.user = req.body.username
        res.status(200).json({ success: true, message: "Registrazione avvenuta con successo." })
    }
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.find({username: username})
    if(!user[0]) {
        res.status(401).json({ success: false, message: "Utente non trovato." })
    }
    else {
        if(password == user[0].password) {
            req.session.user = {username}
            res.status(200).json({ success: true, message: "Login effettuato con successo." })
        }
        else {
            res.status(401).json({ success: false, message: "Password non corretta." })
        }
    }

})

app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: "Errore durante il logout." })
        }
        res.status(200).json({ success: true, message: "Logout avvenuto con successo." })
    })
})
  
app.get('/api/auth-check', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ authenticated: true, user: req.session.user })
    }
    else {
        res.status(401).json({ authenticated: false })
    }
}) 

//ascolta sulla porta default 3000
app.listen(3000)