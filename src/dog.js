export class Dog {
  constructor(dog) {
    let { id, name, breed, sex } = dog
    this.id = id
    this.name = name
    this.breed = breed
    this.sex = sex
  }

  dogRow() {
    const row = document.createElement('tr')
    row.dataset.id = this.id

    const nameCell = document.createElement('td')
    const breedCell = document.createElement('td')
    const sexCell = document.createElement('td')

    const editCell = document.createElement('td')
    const editButton = document.createElement('button')
    editButton.innerText = "Edit"
    editCell.appendChild(editButton)

    nameCell.innerText = this.name
    breedCell.innerText = this.breed
    sexCell.innerText = this.sex
    
    row.append(nameCell, breedCell, sexCell, editCell)

    return row
  }

}