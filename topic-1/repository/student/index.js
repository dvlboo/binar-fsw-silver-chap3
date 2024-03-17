const students = require("../../data/students.json");

exports.getStudents = (name, city, province) => {
    let data = students.map((student) => student);

    data = data.filter((student) => {
      let filteredStatus = true;
      if (name) {
        filteredStatus =
          filteredStatus &&
          student.name.toLowerCase().includes(name?.toLowerCase());
      }
      if (city) {
        filteredStatus =
          filteredStatus &&
          student.address.city
            .toLowerCase()
            .includes(city?.toLowerCase());
      }
      if (province) {
        filteredStatus =
          filteredStatus &&
          student.address.province
            .toLowerCase()
            .includes(province?.toLowerCase());
      }

      return filteredStatus;
  });

  return data;
};

exports.getStudent = (id) => {
  let data = students.map((student) => student);

  data = data.filter((student) => student.id == id);
  if (data.length == 0) {
    return null;
  }

  return data[0];
};

exports.postStudent = (payload) => {

  const lastStudent = students[students.length - 1]
  payload = {
    id : lastStudent.id + 1,
    ...payload
  }

  students.push(payload)

  return payload
}

exports.putStudent = (id) => {
  const data = students.filter((student) => student.id == id)
  return data[0]
}