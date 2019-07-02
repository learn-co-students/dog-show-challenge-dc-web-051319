const DOGS_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    Dog.fetch(DOGS_URL);
    //Adapter.render(Dog.all);
})