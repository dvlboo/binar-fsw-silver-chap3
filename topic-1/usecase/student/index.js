const studentRepo = require("../../repository/student")

exports.getStudents = (name, city, province) => {
  const data = studentRepo.getStudents(name, city, province)
  return data
}

exports.getStudent = (id) => {
  const data = studentRepo.getStudent(id)
  return data
}

exports.postStudent = (payload) => {
  const data = studentRepo.postStudent(payload)
  return data
}