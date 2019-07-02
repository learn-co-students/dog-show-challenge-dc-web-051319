class Adapter {

    static render(dogs) {
        let tableBody = document.querySelector("#table-body")

        dogs.forEach(dog => {
            let row = document.createElement("tr");
            row.id = `dog-${dog.id}`
        
            let name = document.createElement("td");
            name.innerText = dog.name;
            row.appendChild(name);

            let breed = document.createElement("td");
            breed.innerText = dog.breed;
            row.appendChild(breed);

            let sex = document.createElement("td");
            sex.innerText = dog.sex;
            row.appendChild(sex);

            let buttonContainer = document.createElement("td");
            row.appendChild(buttonContainer);

            let button = document.createElement("button");
            button.innerText = "Edit";
            button.classList.add("margin");
            button.classList.add("flex");
            button.addEventListener("click", this.fillForm);
            buttonContainer.appendChild(button);

            tableBody.appendChild(row); 
        });
    }

    static update(dog) {
        let tableRow = document.querySelector(`#dog-${dog.id}`);
        let newDogData = this.getFormData();
        dog.update(DOGS_URL, newDogData)
        //what happens on error?
        // optimistic render :(
        tableRow.children[0].innerText = newDogData.name //dog.name
        tableRow.children[1].innerText = newDogData.breed //dog.breed
        tableRow.children[2].innerText = newDogData.sex //dog.sex
    }

    static getFormData() {
        let data = {};
        let form = document.querySelector("#dog-form");
        data.name = form.children[0].value
        data.breed = form.children[1].value
        data.sex = form.children[2].value
        return data;
    }

    static fillForm() {
        let rowId = this.parentNode.parentNode.id
        let dog = Dog.findByRowId(rowId)
        let form = document.querySelector("#dog-form");
        form.children[0].value = dog.name;
        form.children[1].value = dog.breed;
        form.children[2].value = dog.sex;
        form.children[3].disabled = false;

        let submitHandler = function(event) {
            event.preventDefault();
            Adapter.update(dog);
            form.reset();
            form.children[3].disabled = true;
            form.removeEventListener("submit", submitHandler);
        }
        
        form.addEventListener("submit", submitHandler);
    }
}