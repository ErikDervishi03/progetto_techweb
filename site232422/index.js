const express = require('express')
const app = express()
const path = require('path');
const mongoose = require('mongoose')
const session = require("express-session");

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
    saveUninitialized: true,
    cookie: { secure: false },
}))

//directory file statici
app.use(express.static(path.join(__dirname, 'public')))

//directory views
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render(path.join(__dirname, "public","index.html"))
})

app.all('*', (req, res) => {
    res.send('<h1>Risorsa non trovata</h1>')
})

//ascolta sulla porta default 3000
app.listen(3000)