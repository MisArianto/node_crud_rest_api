const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

let whiteList = [
    'http://localhost:8081'
]

// Cross-Origin Resource Sharing (CORS)
let corsOption = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOption))

// parse request application/json x-www-form-urlencode
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// membuat route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome Mis Arianto'
    })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})