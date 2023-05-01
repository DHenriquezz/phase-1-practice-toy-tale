let addToy = false;

function updateLikes(id, newLikes){
  fetch(`http://localhost:3000/toys/${id}`, {
 method : "PATCH",
  headers:
{
"Content-Type": "application/json",
Accept: "application/json"
},

body: JSON.stringify({
"likes": newLikes
})
}).then((resp) => resp.json())
.then()
}









function createCardElement(toy){
  let card = document.createElement('div')
  card.classList.add('card')
  //child Elements of cards above
  let h2 = document.createElement('h2')
  h2.textContent = toy.name;
  let img = document.createElement('img')
  img.src= toy.image;
  img.classList.add('toy-avatar');
  let p = document.createElement('p')
  p.textContent = toy.likes + " likes";
  let button = document.createElement('button')
  button.addEventListener('click', () => {
    p.textContent = `${toy.likes += 1} likes`
    updateLikes(toy.id, toy.likes)
  })
  button.classList.add('like-btn');
  button.id = toy.id
  button.textContent = 'like ❤️'
  //Add elements to card
  card.append(h2, img, p, button)
  document.getElementById('toy-collection').appendChild(card)
}
function uploadNewToy(newToy){
  fetch('http://localhost:3000/toys', {
    method : "POST",
    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},

body: JSON.stringify({
  ...newToy,
  "likes": 0
})
  }).then((resp) => resp.json())
  .then(respToy => createCardElement(respToy))
}





document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy =>
    createCardElement(toy)));
    // Adding new toys using "POST"
    const form = document.querySelector('form.add-toy-form');
    form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    uploadNewToy(formData)
  })



  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
