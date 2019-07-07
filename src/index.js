const dogsURL = 'http://localhost:3000/dogs'
let currentDog = ''

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
    getDogForm().addEventListener('submit', editDog)
})

function editDog(event){
    event.preventDefault()
    name =  getDogForm()[0].value
    breed =  getDogForm()[1].value
    sex =  getDogForm()[2].value
    
    let updatedDog = {
        name: name,
        breed: breed,
        sex: sex
    }

    fetch(`${dogsURL}/${currentDog}`,{
        method: `PATCH`,
        headers:{
            'Content-Type': 'appliication/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(updatedDog)
    })
    .then(response => response.json())
    .then(result => console.log(result))
}

function fetchDogs() {
    fetch(dogsURL)
    .then(response => response.json())
    .then(dogs =>  dogs.forEach(dog => displayDog(dog)))
}
function displayDog(dog) {
    
    let row = getRow(dog.id)
    
    let dogName = document.createElement('td')
    dogName.innerText = dog.name

    let dogBreed = document.createElement('td')
    dogBreed.innerText = dog.breed

    let dogSex = document.createElement('td')
    dogSex.innerText = dog.sex

    let dogEdit = document.createElement('td')

    let dogButton = document.createElement('button')
    dogButton.addEventListener('click', populateDogForm)
    dogButton.id = dog.id
    dogButton.innerText = "edit pup"

    dogEdit.appendChild(dogButton)
    row.append(dogName, dogBreed, dogSex, dogEdit)
    getTable().append(row)
} 

function populateDogForm(event){
    let dogId  = event.target.id
    let dogRow = document.getElementById(`row-${dogId}`)
   
    getDogForm().children[0].value = dogRow.children[0].innerText
    getDogForm().children[1].value = dogRow.children[1].innerText
    getDogForm().children[2].value = dogRow.children[2].innerText
    currentDog = dogId
//    debugger
}
////

function getDogForm(){
   let form  = document.querySelector('#dog-form')
   return form
//    form.id = "dog-"
}

function getTable(){
   return document.querySelector('#table-body')
}

function getRow(dogId){
    
    let dogRow = document.createElement('tr')
    dogRow.id = `row-${dogId}`
    return dogRow
}