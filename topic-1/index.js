const fs = require('fs')
const express = require('express')


const app = express()
const port = 3000
const student = require('./data/students.json')

app.use(express.static('public'))

app.get('/student', (req, res) => {
  // Write File
  fs.writeFileSync('./data/write.json', `{"success" : true}`, 'utf-8')
  
  res.status(200).json(student)
})

app.listen(port, () => {
  console.log(`Listening server on port : ${port}`)
})


