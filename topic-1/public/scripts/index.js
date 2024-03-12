import student from "./students.js"

const studentCard = document.getElementById('student-card')

const getStudents = async () => {
  const studentData = await student.getStudents()
  console.log(studentData)

  let studentWithCard = ""
    studentData.map((student) => {
      studentWithCard += `<div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${student.name}</h5>
              <p class="card-text">${student.address.city}, ${student.address.province}</p>
            </div>
          </div>
      </div>`
    })

  studentCard.innerHTML = studentWithCard
}

getStudents()