document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})

function getDogs(){
    fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => dogs.forEach(grabDogs))
}

function getTd(){
    return document.createElement('td')
}

function createBtn(){
    let btn = document.createElement('button')
    btn.innerText = 'Edit Dog'
    btn.addEventListener('click', dogButton)
    return btn
}

function grabDogs(dogs){
   let head = document.getElementById('table-body')
   let tr = document.createElement('tr')
   let td1 = getTd()
   let td2 = getTd()
   let td3 = getTd()
   let td4 = getTd()
   
   td1.innerText= dogs.name
   td2.innerText = dogs.breed
   td3.innerText = dogs.sex
   td4.appendChild(createBtn())

    tr.dataset.id = dogs.id

    tr.append(td1, td2, td3, td4)

    head.appendChild(tr)  
}

function dogButton(e){
    e.preventDefault()
    let newTr = document.getElementsByName("name")[0].value = e.target.parentElement.parentElement.children[0].innerText
    let breed = document.getElementsByName("breed")[0].value = e.target.parentElement.parentElement.children[1].innerText
    let sex = document.getElementsByName("sex")[0].value = e.target.parentElement.parentElement.children[2].innerText
    let hidden = document.getElementsByName("hidden")[0].id = e.target.parentElement.parentElement.dataset.id
    
    submit()
}

function submit(){
    return document.addEventListener('submit', editDog)
}

function editDog(e){
    e.preventDefault()
    let form = e.target
    let id = parseInt(e.target.children.hidden.id)
    let name = e.target.children.name.value 
    let breed = e.target.children.breed.value 
    let sex = e.target.children.sex.value
    fetch(`http://localhost:3000/dogs/${id}`,{
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }, 
        body: JSON.stringify({
            name: name,
            breed: breed,
            sex: sex
        }) 
    })
    .then(response => response.json())
    .then(data => { 
       replaceData(data)
    }) 
    form.reset()
        
}

function replaceData(data){
   let children = document.querySelector(`[data-id = '${data.id}']`).childNodes
    children[0].innerText = data.name 
    children[1].innerText = data.breed
    children[2].innerText = data.sex   
}