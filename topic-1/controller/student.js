const studentUsecase = require("../usecase/student");

exports.getStudents = (req, res) => {
    const { name, city, province } = req.query;

    // call the usecase
    const data = studentUsecase.getStudents(name, city, province);

    const response = {
        data,
        message: null,
    };

    res.status(200).json(response);
};

exports.getStudent = (req, res) => {
    const { id } = req.params;

    const data = studentUsecase.getStudent(id);
    if (!data) {
        return res.status(404).json({
            data: null,
            message: `Student with id ${id} is not found!`,
        });
    }

    const response = {
        data: data,
        message: null,
    };

    res.status(200).json(response);
};

exports.postStudent = (req, res) => {
  const { name, address } = req.body
  const { city, province } = address

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

  const data = studentUsecase.postStudent(req.body)
  
  const response = {
    data,
    message : null
  }

  res.status(201).json(response)
}

exports.putStudent = (req, res) => {
  const { id } = req.params
  const { name, address } = req.body

  const data = studentUsecase.putStudent(id)

  if (!data) {
    return res.status(404).json({ message: `Student with id ${id} is Not Found!` })
  }

  if (!name || name === "" || !address) {
    return res.status(400).json({ message: "Name and Address must be filled" })
  }

  const { city, province } = address

  if (!city || city === "" || !province || province === "") {
    return res.status(400).json({ message: "City and Province must be filled" })
  }

  data.name = name
  data.address = address

  const response = {
    data,
    message: "Student data updated successfully",
  }

  res.status(200).json(response)
}