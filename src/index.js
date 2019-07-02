const DOGS_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    Dog.fetch(DOGS_URL)
        .then((dogs) => Adapter.render(dogs));
})