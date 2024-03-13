import student from "./students.js"

const studentCard = document.getElementById('student-card')
const searchInput = document.getElementById('search-input')
const searchSubmit = document.getElementById('search-submit')


const getStudents = async (name) => {
  const data = await student.getStudents(name)
  console.log(data)

  let studentWithCard = ""
    data.map((student) => {
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

searchSubmit.addEventListener('submit', (event) => {
  event.preventDefault()

  const name = searchInput.value
  getStudents(name)
})

getStudents("")