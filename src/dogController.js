import {Dog} from "./dog.js"
import {Adapter} from "./adapter.js"

export class DogController {
  static init() {
    Adapter.getDogs().then(DogController.renderDogs)

    const form = document.getElementById('dog-form')
    form.addEventListener('submit', DogController.handleEditSubmit)
  }

  static renderDogs(dogs) {
    //dogs.forEach(DogController.renderDog)
    dogs.forEach(dog => {
      const table = document.getElementById('table-body')
      table.append(new Dog(dog).dogRow())
      const edit = table.querySelector(`tr[data-id="${dog.id}"] button`)
      edit.addEventListener('click', DogController.handleEditClick)
    })
  }

  static updateDog(dog) {
    const row = document.querySelector(`tr[data-id="${dog.id}"]`)
    row.children[0].innerText = dog.name
    row.children[1].innerText = dog.breed
    row.children[2].innerText = dog.sex

    row.classList.add('flash')
    setTimeout(function() {
      row.classList.remove('flash');
    }, 1000);
  }

  static handleEditClick(e) {
    const id = e.target.closest('tr').dataset.id
    Adapter.getDog(id).then(DogController.populateForm)
  }

  static populateForm(dog) {
    const form = document.getElementById('dog-form')
    form.dataset.dogId = dog.id
    form.children[0].value = dog.name
    form.children[1].value = dog.breed
    form.children[2].value = dog.sex
    const submit = form.querySelector('input[type="submit"]')
    submit.disabled = false;

  }

  static handleEditSubmit(e) {
    e.preventDefault()
    const data = {
      id: e.target.dataset.dogId,
      name: e.target.name.value,
      breed: e.target.breed.value,
      sex: e.target.sex.value
    }
    Adapter.editDog(data)
    .then(DogController.updateDog)

    e.target.reset()
    e.target.dataset.dogId = ''
    const submit = document.querySelector('input[type="submit"]')
    submit.disabled = true;
  }

  dogTable() {
    return document.getElementById('table-body')
  }

  dogForm() {
    return document.getElementById('dog-form')
  }

}