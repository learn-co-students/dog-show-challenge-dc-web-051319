const url = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', init)

function init() {
    fetchDogs()

}

function fetchDogs() {
    fetch(url)
        .then(response => response.json())
        .then(dogs => dogs.forEach(dog => renderToDom(dog)))
}

function renderToDom(dog) {
    let tr = document.createElement('tr')
    tr.id = dog.id
    let name = document.createElement('td')
    name.innerText = dog.name

    let sex = document.createElement('td')
    sex.innerText = dog.sex

    let breed = document.createElement('td')
    breed.innerText = dog.breed

    let edit = document.createElement('td')
    let btn = document.createElement('button')
    btn.addEventListener('click', () => populateForm(dog))
    btn.innerText = 'Edit Dog'
    edit.appendChild(btn)
    
    tr.append(name, sex, breed, edit)
    getTable().appendChild(tr)
}

function populateForm(dog) {
    let form = document.querySelector('#dog-form')
    form.addEventListener('submit', () => editDog(event, dog))
    form.children[0].value = dog.name
    form.children[1].value = dog.sex
    form.children[2].value = dog.breed
}

function editDog(event, dog) {
    event.preventDefault()

    let update = {
        name: event.currentTarget.children[0].value,
        sex: event.currentTarget.children[1].value,
        breed: event.currentTarget.children[2].value
    }
    fetch(`${url}/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(update)
    })
        .then(response => response.json())
        .then(data => {
            let tr = document.getElementById(`${data.id}`)
            tr.children[0].innerText = data.name
            tr.children[1].innerText = data.sex
            tr.children[2].innerText = data.breed
        })
}

function getTable() {
    return document.querySelector('#table-body')
}
