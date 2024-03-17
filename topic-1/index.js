// const fs = require('fs')
const express = require('express')
const route = require('./routes')


const app = express()
const port = 3000


// Enable request body (json)
app.use(express.json())
app.use(express.static('public'))
app.use("/", route)

app.listen(port, () => {
  console.log(`Listening server on port : ${port}`)
})