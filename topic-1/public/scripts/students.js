const getStudents = async () => {
  const props = await fetch('/student')
  // console.log(props)
  return props.json()
}

export default { getStudents }