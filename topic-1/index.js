// const fs = require('fs')
const express = require('express')
const route = require('./routes')


const app = express()
const port = 3000


// Enable request body (json)
app.use(express.json())
app.use(express.static('public'))
app.use("/", route)

// app.delete("/students/:id", (req, res) => {
//   const id = parseInt(req?.params?.id)

//   const index = student.findIndex(student => student.id === id);
//   if (index === -1) {
//     return res.status(404).json({ message: `Student with id ${id} is Not Found!` });
//   }
//   student.splice(index, 1);

//   const response = {
//     message : "Student data deleted successfully"
//   }
//   res.status(200).json(response)
// })

app.listen(port, () => {
  console.log(`Listening server on port : ${port}`)
})