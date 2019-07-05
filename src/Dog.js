class Dog{
    constructor(dog){
        //console.log("3. We are constructing new Dog instance")
        this.id = dog.id;
        this.name = dog.name;
        this.breed = dog.breed;
        this.sex = dog.sex;
    }

    static fetchDogs(){
        console.log("2. We are now fetching the dogs")
        fetch(DOGS_URL)
        .then(response => response.json())
        .then( dogArray => dogArray.forEach( (dog) => {
            let d = new Dog(dog)
            d.renderDOM()
        })
    )}

    renderDOM(){
        console.log("3.5. We are now rendering the Dog DOM ");
        let tableBody = document.querySelector('tbody');
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        tdName.innerText = `${this.name}`;
        let tdBreed = document.createElement('td');
        tdBreed.innerText = `${this.breed}`;
        let tdSex = document.createElement('td');
        tdSex.innerText = `${this.sex}`;
        let tdButton = document.createElement('td');
        let button = document.createElement('button')
        button.innerText = "Edit"
        button.addEventListener('click', this.editDog.bind(this))
        tdButton.append(button)
        tr.append(tdName, tdBreed, tdSex, tdButton)
        tableBody.append(tr)
    }

    editDog(){
        console.log("4. In edit Dog")
        let form = document.querySelector('form');
        form[0].value = `${this.name}`
        form[1].value = `${this.breed}`
        form[2].value = `${this.sex}`
        form[3].addEventListener('click', this.patchDog.bind(this))
    }

    patchDog(event){
        let dogData = {
            name: this.name,
            breed: this.breed,
            sex: this.sex
        }
        event.preventDefault();
        console.log("5. Editing Dog")
        fetch(`${DOGS_URL}/${this.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dogData)
          })
        .then(response => response.json())
        // .then(this.renderDOM)
    }

}

{/* <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr> */}