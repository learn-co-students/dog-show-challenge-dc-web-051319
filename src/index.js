const DOGS_URL = "http://localhost:3000/dogs"


document.addEventListener('DOMContentLoaded', () => {
    console.log("1. Dom Loaded");
    init();

})

function init(){
    Dog.fetchDogs();
}