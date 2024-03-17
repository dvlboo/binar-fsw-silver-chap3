// const fs = require('fs')
const express = require('express')
const student = require('./data/students.json')
const route = require('./routes')


const app = express()
const port = 3000


// Enable request body (json)
app.use(express.json())
app.use(express.static('public'))
app.use("/", route)

// API to Update (PUT the Data)
// app.put("/students/:id", (req, res) => {
//   const { id } = req.params
//   const { name, address } = req.body

//   const studentId = student.find(student => student.id == id)

//   if (!studentId) {
//     return res.status(404).json({ message: `Student with id ${id} is Not Found!` })
//   }

//   if (!name || name === "" || !address) {
//     return res.status(400).json({ message: "Name and Address must be filled" })
//   }

//   const { city, province } = address

//   if (!city || city === "" || !province || province === "") {
//     return res.status(400).json({ message: "City and Province must be filled" })
//   }

//   studentId.name = name
//   studentId.address = address

//   const response = {
//     data: studentId,
//     message: "Student data updated successfully",
//   }

//   res.status(200).json(response)
// })

// API to Update (PATCH the Data)
app.patch("/students/:id", (req, res) => {
  const { id } = req.params
  const { name, address } = req.body

  const studentId = student.find(student => student.id == id)

  if (!studentId) {
    return res.status(404).json({ message: `Student with id ${id} is Not Found!` })
  }

  if (name) {
    studentId.name = name
  }

  if (address) {
    const { city, province } = address
    if (city) {
      studentId.address.city = city
    }
    if (province) {
      studentId.address.province = province
    }
  }

  const response = {
    data: studentId,
    message: "Student data updated successfully",
  }

  res.status(200).json(response)
})


app.delete("/students/:id", (req, res) => {
  const id = parseInt(req?.params?.id)

  const index = student.findIndex(student => student.id === id);
  if (index === -1) {
    return res.status(404).json({ message: `Student with id ${id} is Not Found!` });
  }
  student.splice(index, 1);

  const response = {
    data : null,
    message : "Student data deleted successfully"
  }
  res.status(200).json(response)
})

app.listen(port, () => {
  console.log(`Listening server on port : ${port}`)
})