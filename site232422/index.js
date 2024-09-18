const express = require('express')
const app = express()
const mongoose = require('mongoose')

//connessione al database
const mongoDBUri = "mongodb+srv://erikdervishi100:<9kLXNrcPVfwKlfzd>@site232422.5x4wa.mongodb.net/?retryWrites=true&w=majority&appName=site232422"
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })

//directory file statici
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.all('*', (req, res) => {
    res.send('<h1>Risorsa non trovata</h1>')
})

//ascolta sulla porta default 3000
app.listen(3000)