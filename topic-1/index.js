// const fs = require('fs')
const express = require('express')


const app = express()
const port = 3000
const student = require('./data/students.json')

app.use(express.static('public'))

// Enable request body (json)
app.use(express.json())

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

// Post
app.post("/students", (req, res) => {

  const { name, address } = req.body

  if (!name || name == "") {
    return res.status(400).json({
      data : null,
      message : "Name must be filled"
    })
  }
  if (!address) {
    return res.status(400).json({
      data : null,
      message : "Address must be filled"
    })
  }

  const { city, province } = address

  if (!city || city == "") {
    return res.status(400).json({
      data : null,
      message : "City must be filled"
    })
  }
  if (!province || province == "") {
    return res.status(400).json({
      data : null,
      message : "Province must be filled"
    })
  }

  // console.log(req.body)
  
  const response = {
    data : null,
    message : null
  }

  // Process insert data
  // get last id 
  const lastStudent = student[student.length - 1]
  req.body = {
    id : lastStudent.id + 1,
    ...req.body
  }

  student.push(req.body)

  res.status(201).json(response)
})

// API to Update (PUT the Data)
app.put("/students/:id", (req, res) => {
  const { id } = req.params
  const { name, address } = req.body

  const studentId = student.find(student => student.id == id)

  if (!studentId) {
    return res.status(404).json({ message: `Student with id ${id} is Not Found!` })
  }

  if (!name || name === "" || !address) {
    return res.status(400).json({ message: "Name and Address must be filled" })
  }

  const { city, province } = address

  if (!city || city === "" || !province || province === "") {
    return res.status(400).json({ message: "City and Province must be filled" })
  }

  studentId.name = name
  studentId.address = address

  const response = {
    data: studentId,
    message: "Student data updated successfully",
  }

  res.status(200).json(response)
})

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

  // let studentIndex = -1;

  // student.map((stud, index) => {
  //   if (stud.id === id) {
  //     studentIndex = index;
  //   }
  // });

  // if (studentIndex === -1) {
  //   return res.status(404).json({ message: `Student with id ${id} is Not Found!` });
  // }

  // for (let i = studentIndex; i < student.length - 1; i++) {
  //   student[i] = student[i + 1];
  // }

  // student.length--;

  // by filter
  // const updatedStudents = student.filter(student => student.id !== id);

  // if (updatedStudents.length === student.length) {
  //   return res.status(404).json({ message: `Student with id ${id} is Not Found!` });
  // }

  // student = updatedStudents;

  const response = {
    data : null,
    message : "Student data deleted successfully"
  }
  res.status(200).json(response)
})

app.listen(port, () => {
  console.log(`Listening server on port : ${port}`)
})