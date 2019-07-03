const ALL_THE_DOGS = "http://localhost:3000/dogs"

export class Adapter {

  static getDogs() {
    return fetch(ALL_THE_DOGS).then(resp => resp.json())
  }

  static getDog(id) {
    return fetch(`${ALL_THE_DOGS}/${id}`).then(resp => resp.json())
  }

  static editDog(data) {
    return fetch(`${ALL_THE_DOGS}/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
  }

}