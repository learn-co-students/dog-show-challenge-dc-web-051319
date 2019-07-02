document.addEventListener('DOMContentLoaded', init);

class Dog{
    constructor(dog){
        let {id,name,breed,sex} = dog;
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.sex = sex;
    }

    render(parentWindow){
        let dogRow = document.createElement("tr");
            dogRow.dataset.dogId = this.id;
        dogRow.innerHTML += `
        <td class="name">${this.name}</td>
        <td class="breed">${this.breed}</td>
        <td class="sex">${this.sex}</td>`
        let editButton = document.createElement("button");
            editButton.innerText = "Edit Dog";
            editButton.addEventListener("click",editHandler);
            editButton.dataset.dogId =this.id;
        dogRow.append(editButton);
        parentWindow.append(dogRow);
    }

    updateDog(parentWindow){
        parentWindow.querySelector("td.name").innerText = this.name;
        parentWindow.querySelector("td.breed").innerText = this.breed;
        parentWindow.querySelector("td.sex").innerText = this.sex;
    }
}

function populatePage(){
    fetch("http://localhost:3000/dogs/")
    .then(response => response.json())
    .then(dogs =>dogs.forEach(dog =>{
            let Objdog = new Dog(dog);
            let tableBody = document.getElementById("table-body");
            Objdog.render(tableBody);
    }));
}

function init(){
    populatePage();
    initForm();
}

function initForm(){
    let form = document.getElementById("dog-form");
    form.addEventListener("submit",editDogHandler);
    form.name.disabled = true;
    form.breed.disabled = true;
    form.sex.disabled = true;
}

function editHandler(e){
    let form = document.getElementById("dog-form");
    form.dataset.dogid = e.currentTarget.dataset.dogId;
    form.name.value = e.currentTarget.parentElement.querySelector("td.name").innerText;
    form.breed.value = e.currentTarget.parentElement.querySelector("td.breed").innerText;
    form.sex.value = e.currentTarget.parentElement.querySelector("td.sex").innerText;
    form.name.disabled = false;
    form.breed.disabled = false;
    form.sex.disabled = false;
}

function getFormValues(){
    let form = document.getElementById("dog-form");
    return {name: form.name.value ,breed: form.breed.value ,sex: form.sex.value};
}

function editDogHandler(e){
    e.preventDefault();
    let form = document.getElementById("dog-form");
    if (form.dataset.dogid){
        fetch("http://localhost:3000/dogs/"+e.currentTarget.dataset.dogid,{
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getFormValues())
        })
        .then(res => res.json())
        .then(dog => {
            let updatedDog = new Dog(dog);
            let dogRow = document.querySelector(`[data-dog-id='${dog.id}']`);
            updatedDog.updateDog(dogRow);
            form.removeAttribute("data-dogid");
            form.name.disabled = true;
            form.breed.disabled = true;
            form.sex.disabled = true;
            form.reset();
        });
    }else{
        alert("Form cannot be empty.");
    }
}