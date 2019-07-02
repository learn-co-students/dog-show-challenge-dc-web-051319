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
        <td data-dog-name='${this.name}'>${this.name}</td>
        <td data-dog-breed='${this.breed}'>${this.breed}</td>
        <td data-dog-sex='${this.sex}'>${this.sex}</td>`
        let editButton = document.createElement("button");
            editButton.innerText = "Edit Dog";
            editButton.addEventListener("click",editHandler);
            editButton.dataset.dogId =this.id;
        dogRow.append(editButton);
        parentWindow.append(dogRow);
    }

    updateDog(parentWindow){
        parentWindow.children[0].innerText = this.name;
        parentWindow.children[0].dataset.dogName = `${this.name}`;
        parentWindow.children[1].innerText = this.breed;
        parentWindow.children[1].dataset.dogBreed = `${this.breed}`;
        parentWindow.children[2].innerText = this.sex;
        parentWindow.children[2].dataset.dogSex = `${this.sex}`;
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
    form.name.value = e.currentTarget.parentElement.children[0].innerText;
    form.breed.value = e.currentTarget.parentElement.children[1].innerText;
    form.sex.value = e.currentTarget.parentElement.children[2].innerText;
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