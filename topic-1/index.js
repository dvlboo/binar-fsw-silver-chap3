// const fs = require('fs')
const express = require('express')


const app = express()
const port = 3000
const student = require('./data/students.json')

app.use(express.static('public'))


// by query
app.get('/student', (req, res) => {
  
  const {name, city, province} = req.query
  // console.log(req.query.province)
  let data = [...student]
  // console.log(data)
  
  data = data.filter((student) => {
    let filteredStatus = true

    if (name) {
      filteredStatus = 
        filteredStatus && student.name
          .toLowerCase()
          .includes(name?.toLowerCase()) //tanda "?" => untuk skipping data jika undefine
    }

    if (city) {
      filteredStatus = 
        filteredStatus && student.address.city
          .toLowerCase()
          .includes(city?.toLowerCase())
    }

    if (province) {
      filteredStatus = 
        filteredStatus && student.address.province
          .toLowerCase()
          .includes(province?.toLowerCase())
    }

    return filteredStatus
  
  })

  // standart handling data
  const response = {
    data,
    message: null,
  }
  
  res.status(200).json(response)
})


// search by params
app.get('/students/:id', (req, res) => {
  // console.log(req.params)
  const { id } = req.params

  let data = [...student]

  data = data.filter(student => student.id == id)
  
  // standart handling data
  const response = {
    data: data[0],
    message: null,
  }

  data.length == 0 
    ? res.status(404).json({message : `Student with id ${id} is Not Found!`}) 
    : res.status(200).json(response)
  console.log(response)
})

app.listen(port, () => {
  console.log(`Listening server on port : ${port}`)
})


