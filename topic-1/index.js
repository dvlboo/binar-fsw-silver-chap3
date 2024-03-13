const fs = require('fs')
const express = require('express')


const app = express()
const port = 3000
const student = require('./data/students.json')

app.use(express.static('public'))

app.get('/student', (req, res) => {
  // Write File
  // fs.writeFileSync('./data/write.json', `{"success" : true}`, 'utf-8')
  
  const {name, city, province} = req.query
  // console.log(req.query.province)
  let dataStudent = [...student]
  // console.log(dataStudent)

  dataStudent = dataStudent.filter(
    (student) => 
      student.name.toLowerCase().includes(name.toLowerCase()) &&
      student.address.city.toLowerCase().includes(city.toLowerCase()) &&
      student.address.province.toLowerCase().includes(province.toLowerCase())
  )

  res.status(200).json(dataStudent)
})

app.listen(port, () => {
  console.log(`Listening server on port : ${port}`)
})


