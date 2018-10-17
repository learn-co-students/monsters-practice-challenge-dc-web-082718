document.addEventListener('DOMContentLoaded', () => {
  pageCounter = 1
  getPage(pageCounter)
})

function getPage(page) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(res => res.json())
  .then(json => renderPage(json))
}

function renderPage(data) {
  let monsterBox = document.querySelector(`div#monster-container`)
  monsterBox.innerHTML = ''
  data.forEach(monster => {
    let div = document.createElement('div')
    let name = document.createElement('h2')
    let age = document.createElement('h4')
    let bio = document.createElement('h4')

    name.innerText = monster.name
    age.innerText = monster.age
    bio.innerText = monster.description

    div.appendChild(name)
    div.appendChild(age)
    div.appendChild(bio)
    monsterBox.appendChild(div)
  })
  addButtons()
  addMonsterForm()
}

function addButtons() {
  let back = document.querySelector('button#back')
  let forward = document.querySelector('button#forward')
  back.addEventListener('click', event => {
    pageCounter--
    getPage(pageCounter)
  })
  forward.addEventListener('click', event => {
    pageCounter++
    getPage(pageCounter)
  })
}

function addMonsterForm() {
  let form = document.querySelector('div#create-monster')
  inputName = document.createElement('input')
  inputName.placeholder = "name.."
  inputName.id = "name"
  form.appendChild(inputName)

  inputAge = document.createElement('input')
  inputAge.placeholder = "age.."
  inputAge.id = "age"
  form.appendChild(inputAge)

  inputBio = document.createElement('input')
  inputBio.placeholder = "description.."
  inputBio.id = "description"
  form.appendChild(inputBio)

  submitBtn = document.createElement('button')
  submitBtn.innerText = "Create Monster"
  submitBtn.id = "submit"
  form.appendChild(submitBtn)

  submitBtn.addEventListener('click', (event) => {
    createMonster()
  })
}

function createMonster() {
  let name = document.querySelector('#name').value
  let age = document.querySelector('#age').value
  let description = document.querySelector('#description').value
  fetch('http://localhost:3000/monsters', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "age": age,
      "description": description
    })
  })
}
