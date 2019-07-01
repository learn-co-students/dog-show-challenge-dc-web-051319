const DOG_URL = 'http://127.0.0.1:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
    getDogs()
    dogForm().addEventListener('submit', patchDog)
})

// API

function getDogs(){
    fetch(DOG_URL)
    .then(resp => resp.json())
    .then(dogs => {
        dogs.forEach(dog => addDogToTable(dog))
        console.log(dogs)
    })
}

function patchDog(event){
    event.preventDefault()
    let id = event.target.dogId.value
    let name = event.target.name.value
    let breed = event.target.breed.value 
    let sex = event.target.sex.value
    let data = {
        id: id,
        name: name, 
        breed: breed,
        sex: sex
    }

    fetch(`${DOG_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(dog => {
        tableBody().innerHTML = ""
        getDogs()
        console.log(dog)
    })

}

// Dom Creation

function addDogToTable(dog){
    let tr = document.createElement('tr')

    let tdName = document.createElement('td')
    tdName.innerText = dog.name

    let tdBreed = document.createElement('td')
    tdBreed.innerText = dog.breed

    let tdSex = document.createElement('td')
    tdSex.innerText = dog.sex

    let tdEdit = document.createElement('td')
    let editBtn = document.createElement('button')
    editBtn.innerText = "Edit"
    editBtn.dataset.dogId = dog.id
    editBtn.addEventListener('click', editDog)
    tdEdit.appendChild(editBtn)

    tr.append(tdName, tdBreed, tdSex, tdEdit)
    tableBody().appendChild(tr)
}

function editDog(event){
    let form = dogForm()
    let currentDog = event.target.parentNode.parentNode.children
    form.dogId.value = event.target.dataset.dogId
    form.name.value = currentDog[0].innerText
    form.breed.value = currentDog[1].innerText
    form.sex.value = currentDog[2].innerText
}

// Selectors

function tableBody(){
    return document.getElementById('table-body')
}

function dogForm(){
    return document.getElementById('dog-form')
}