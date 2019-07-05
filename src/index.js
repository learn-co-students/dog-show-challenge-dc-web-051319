document.addEventListener('DOMContentLoaded', () => {
  renderListOfRegisteredDogs()
})

function renderListOfRegisteredDogs(){
  fetch("http://localhost:3000/dogs")
  .then(response => response.json())
  .then(arrayOfDogsObjects => iterateThroughArrayOfDogsObjects(arrayOfDogsObjects))
}
function iterateThroughArrayOfDogsObjects(arrayOfDogsObjects){
  arrayOfDogsObjects.forEach((dogObject)=>{
    renderDogObject(dogObject)
  })
}
function renderDogObject(dogObject){
  //create elements, all held inside a tr entry
  let dogRowContainer = document.createElement("tr")
  //td for Dog name
  let dogName = document.createElement("td")
  dogName.innerText = dogObject.name
  //td dog breed
  let dogBreed = document.createElement("td")
  dogBreed.innerText = dogObject.breed
  //td for Dog Sex
  let dogSex = document.createElement("td")
  dogSex.innerText = dogObject.sex
  //td for edit button
  //hold dog id
  let buttonContainer = document.createElement("td")
  let dogEditButton = document.createElement("button")
  dogEditButton.innerText = "Edit this Dog"
  dogEditButton.dataset.dogId = dogObject.id
  let dogObjectId = dogObject.id
  dogEditButton.addEventListener("click",()=>{
    renderFormToEditDog(event,dogObjectId)
  })
  buttonContainer.append(dogEditButton)

  dogRowContainer.append(dogName,dogBreed,dogSex,buttonContainer)

  //find table to add row to
  let dogTable = document.querySelector("#table-body")
  dogTable.appendChild(dogRowContainer)
  console.log(`created row for ${dogObject.name}`)
}


function renderFormToEditDog(event,dogObjectId){
  console.log(`edit ${event.currentTarget.parentElement.parentElement.firstElementChild.innerText}`)

  //fill out dog-form elements with the event target elements
  let eventDogName = event.currentTarget.parentElement.parentElement.firstElementChild.innerText

  document.querySelector("#dog-form")[0].placeholder = eventDogName
  let eventDogBreed = event.currentTarget.parentElement.parentElement.firstElementChild.nextElementSibling.innerText

  document.querySelector("#dog-form")[1].placeholder = eventDogBreed

  let eventDogSex = event.currentTarget.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerText
  document.querySelector("#dog-form")[2].placeholder = eventDogSex

  //add eventlistern to Submit

  let submitButton = document.querySelector("#dog-form")
  submitButton.addEventListener("submit", (event) => {
    event.preventDefault()
    submitRequest(event,dogObjectId)
  })
}

function submitRequest(event,dogObjectId){


  let newDogName;
  if(document.querySelector("#dog-form")[0].value == ""){
    newDogName = document.querySelector("#dog-form")[0].placeholder
  }else{
    newDogName = document.querySelector("#dog-form")[0].value
  }

  let newDogBreed;
  if(document.querySelector("#dog-form")[1].value == ""){
    newDogBreed = document.querySelector("#dog-form")[1].placeholder
  }else{
    newDogBreed = document.querySelector("#dog-form")[1].value
  }

  let newDogSex;
  if(document.querySelector("#dog-form")[2].value != ""){
    newDogSex =
    document.querySelector("#dog-form")[2].value
  }else {
    newDogSex = document.querySelector("#dog-form")[2].placeholder
  }
  let dogId = dogObjectId

  fetch(`http://localhost:3000/dogs/${dogId}`,{
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: newDogName,
      breed: newDogBreed,
      sex: newDogSex
    })
  })
  .then(resp => resp.json())
  .then(data => redisplay(data))
}
function redisplay(data){
  let dogTable = document.querySelector("#table-body")
  dogTable.innerHTML = ""
  renderListOfRegisteredDogs()

}
