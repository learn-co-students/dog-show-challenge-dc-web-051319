document.addEventListener('DOMContentLoaded', init)

const BASE_URL = "http://localhost:3000"
const DOG_URL = `${BASE_URL}/dogs`
let dogForm = document.getElementById('dog-form')
dogForm.addEventListener('submit', dogSubmit)
const table = document.querySelector("tbody")

function init(){

  getDogs()

}

function dogSubmit(e) {
  event.preventDefault()
  // console.log(dogForm.dataset.id)
  let name = dogForm.name.value
  let breed = dogForm.breed.value
  let sex = dogForm.sex.value

  fetch (DOG_URL + "/" + `${dogForm.dataset.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name,
      breed,
      sex
    })
  })
  .then( response => response.json())
  .then( dog => {
      let x = document.querySelector(`[data-tr-id='${dog.id}']`)
      x.querySelector(`#name-${dog.id}`).innerText = dog.name
      x.querySelector(`#breed-${dog.id}`).innerText = dog.breed
      x.querySelector(`#sex-${dog.id}`).innerText = dog.sex
      
  })
}


function getDogs() {

  return fetch (DOG_URL)
  .then(resp => resp.json())
  .then(dogs => {
    dogs.forEach(dog => dogCard(dog))
  })

}

function dogCard(dog) {
    let tr = document.createElement(`tr`)
    tr.className = "padding"
    tr.setAttribute(`data-tr-id`, dog.id)
    table.appendChild(tr)
    let tdName = document.createElement(`td`)
    tdName.id = `name-${dog.id}`
    tdName.innerText = dog.name
    let tdBreed = document.createElement(`td`)
    tdBreed.id = `breed-${dog.id}`
    tdBreed.innerText = dog.breed
    let tdSex = document.createElement(`td`)
    tdSex.id = `sex-${dog.id}`
    tdSex.innerText = dog.sex
    let tdButton = document.createElement('td')
    let button = document.createElement(`button`)
    button.setAttribute(`data-dog-id`, dog.id)
    button.setAttribute(`data-dog-name`, dog.name)
    button.setAttribute(`data-dog-breed`, dog.breed)
    button.setAttribute(`data-dog-sex`, dog.sex)
    button.innerText = "Edit"
    button.addEventListener("click", editDog)
    tdButton.appendChild(button)
    tr.appendChild(tdName)
    tr.appendChild(tdBreed)
    tr.appendChild(tdSex)
    tr.appendChild(tdButton)
  }

function editDog(e) {
  dogForm.name.value = e.target.dataset.dogName
  dogForm.breed.value = e.target.dataset.dogBreed
  dogForm.sex.value = e.target.dataset.dogSex
  dogForm.dataset.id = e.target.dataset.dogId
}


// fillform??? document.getElementById('username').value="moo"

// dog.js is just creating dogs
// adapter.js just fetches dogs
// controller manages display of dogs
// breakup
