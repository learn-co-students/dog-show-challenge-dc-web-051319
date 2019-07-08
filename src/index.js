document.addEventListener('DOMContentLoaded', () => {
    console.log("dom content loaded, bitches")
    getDogs();

})

function getDogs() {
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(data => data.forEach(dog => renderDog(dog)))
}

function renderDog(dogObj) {
    let dogRow = document.createElement("tr");
    dogRow.id = `dog-${dogObj.id}`
    
    let dogTable = document.getElementById("table-body");

    let dogName = document.createElement("td");
    dogName.innerText = dogObj.name;

    let dogBreed = document.createElement("td");
    dogBreed.innerText = dogObj.breed;

    let dogSex = document.createElement("td");
    dogSex.innerText = dogObj.sex;

    let dogLikes = document.createElement("td");
    dogLikes.innerText = dogObj.likes;

    let dogEdit = document.createElement("td");
    let editButton = document.createElement("button");
    editButton.id = dogObj.id;
    editButton.innerText = "Edit Dog";
    editButton.addEventListener("click", editDog)
    dogEdit.appendChild(editButton);

    let dogLike = document.createElement("td");
    let likeButton = document.createElement("button");
    likeButton.id = dogObj.id;
    likeButton.innerText = "Like <3";
    likeButton.addEventListener("click", likeDog)
    dogLike.append(likeButton);

    let dogDelete = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.id = dogObj.id;
    deleteButton.innerText = "Delete Dog";
    deleteButton.addEventListener("click", deleteDog)
    dogDelete.appendChild(deleteButton);


    dogRow.append(dogName, dogBreed, dogSex, dogLikes, dogLike, dogEdit, dogDelete);
    dogTable.append(dogRow);

}

function getNewForm() {
    return document.getElementById("new-dog-form");
}

function createDog(event) {
    event.preventDefault();
    let form = getNewForm();
    form.addEventListener("submit", actuallyCreateDog)
}

function actuallyCreateDog(event) {
    let nameField = document.getElementById("new-name-field").value;
    let breedField = document.getElementById("new-breed-field").value;
    let sexField = document.getElementById("new-sex-field").value;

    fetch("http://localhost:3000/dogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: nameField,
          breed: breedField,
          sex: sexField,
          likes: 0
        })
      })
      .then(resp => resp.json())
      .then(data => renderDog(data))
    
      getNewForm().reset();
}

function likeDog(event) {
    let dogID = event.currentTarget.id;
    let currentLikes = event.currentTarget.parentNode.previousSibling
    currentLikes.innerText = parseInt(currentLikes.innerText) + 1

    fetch(`http://localhost:3000/dogs/${dogID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            likes: parseInt(currentLikes.innerText)
        })
    })
    // .then(resp => resp.json())
    // .then(data => console.log(data))
    // don't seem to need these, since I directly changed the "likes".
}

function getEditForm() {
    return document.getElementById("dog-form");
}

function editDog(event) {
    event.preventDefault();
    let form = getEditForm()
    form.addEventListener("submit", actuallyEditDog)

    let currentDog = event.target.parentElement.parentElement
    let arr = Array.from(currentDog.children)
    
    form.dogId.value = currentDog.id.split("-")[1]
    form.name.value = arr[0].innerText;
    form.breed.value = arr[1].innerText;
    form.sex.value = arr[2].innerText;

}

function actuallyEditDog(event) {
    let nameField = document.getElementById("name-field").value;
    let breedField = document.getElementById("breed-field").value;
    let sexField = document.getElementById("sex-field").value;

    let dogID = event.currentTarget.dogId.value;

    fetch(`http://localhost:3000/dogs/${dogID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: nameField,
            breed: breedField,
            sex: sexField
        })
    })
}

function getDogTable() {
    return document.getElementById("table-body");
}

function deleteDog(event) {
    event.preventDefault();
    let toRemove = event.currentTarget.parentElement.parentElement;
    let dogID = event.currentTarget.id;
    getDogTable().removeChild(toRemove)
    fetch(`http://localhost:3000/dogs/${dogID}`, {
        method: "DELETE"
    })

}
