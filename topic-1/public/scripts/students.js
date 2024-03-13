const getStudents = async (name) => {
  const res = await fetch(`/student?name=${name}`)
  // console.log(props)
  const { data, message } = await res.json()
  return data
}

export default { getStudents }