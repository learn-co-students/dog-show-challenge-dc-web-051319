class Dog {
    constructor(id, name, breed, sex) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.sex = sex;
        Dog.all.push(this);
    }

    static fetch(url) {
        return fetch(url)
            .then(response => response.json())
            .then(dogs => {
                dogs.forEach(dog => {
                    let dogObj = new Dog (
                        dog.id,
                        dog.name,
                        dog.breed,
                        dog.sex
                    )
                });
                return Dog.all
            })
    }

    update(url, data) {
        let updateData = {
            id: this.id,
            name: data.name,
            breed: data.breed,
            sex: data.sex
        };
        
        let configObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(updateData)
        };
        
        return fetch(`${url}/${this.id}`, configObject)
            .then(response => response.json())
            .then(returnedDog => {
                this.name = returnedDog.name
                this.breed = returnedDog.breed
                this.sex = returnedDog.sex
            })
            .catch(error => {
                window.alert(error.message);
            });
    }

    static findByRowId(rowId) {
        return Dog.all.find(dog => dog.id == rowId.split("-")[1])
    }
}

Dog.all = [];