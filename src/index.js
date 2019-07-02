document.addEventListener('DOMContentLoaded', () => {
    getDogs()
    form_disabled()
})

function getDogs(){
    fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => dogs.forEach(grabDogs))
}

function getTd(){
    return document.createElement('td')
}

function grab_form(){
   return form = document.getElementById('dog-form').children
}

function form_disabled(){
     grab_form()[0].disabled = true
     grab_form()[1].disabled = true
    return grab_form()[2].disabled = true
}

function form_enabled(){
    grab_form()[0].disabled = false
    grab_form()[1].disabled = false
    return grab_form()[2].disabled = false
}

function createBtn(){
    let btn = document.createElement('button')
    btn.innerText = 'Edit Dog'
    btn.addEventListener('click', dogButton)
    btn.dataset.id = ""
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
   td4.children[0].dataset.id = dogs.id
    
    tr.dataset.id = dogs.id

    tr.append(td1, td2, td3, td4)

    head.appendChild(tr)  
}

function dogButton(e){
    e.preventDefault()
    form_enabled()
    let tr = document.querySelector(`[data-id = '${e.target.dataset.id}']`)
    
    grab_form()[0].value = tr.children[0].innerText
    grab_form()[1].value = tr.children[1].innerText
    grab_form()[2].value = tr.children[2].innerText
    grab_form()[3].id = tr.dataset.id
    
    submit()
    
}



function submit(){
    
    return document.addEventListener('submit', editDog)
    
}



function editDog(e){
    e.preventDefault()
    let form = e.target
    
    let id = parseInt(e.target.children[3].id)
    let name = e.target.children[0].value 
    let breed = e.target.children[1].value 
    let sex = e.target.children[2].value
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
    form_disabled()
        
}


function replaceData(data){
   let children = document.querySelector(`[data-id = '${data.id}']`).childNodes
    children[0].innerText = data.name 
    children[1].innerText = data.breed
    children[2].innerText = data.sex   
}