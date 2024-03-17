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

exports.editStudent = (id) => {
  const data = studentRepo.editStudent(id)
  return data
}

exports.delStudent = (id) => {
  const data = studentRepo.delStudent(id)
  if (!data) {
    return null
  }
  return data
}