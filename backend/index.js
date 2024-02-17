const express = require('express')
const connectToMongo = require('./db');

connectToMongo();
const app = express()
var cors = require('cors')

app.use(cors())

// const PORT = process.env.PORT || 5000
const PORT = 5000

app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(PORT, () => {
    console.log(`iNotebook listening at http://localhost:${PORT}`)
})