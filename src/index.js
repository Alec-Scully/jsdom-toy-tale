let addToy = false;

const BASE_URL = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
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

  getToys()
  handleForm()
});

const getToys = () => {
  document.querySelector('#toy-collection').innerHTML = ""
  fetch(BASE_URL)
    .then(res => res.json() )
    .then(toyData => toyData.forEach(renderToys))
}

const renderToys = (toy) => {
  let toyBox = document.querySelector('#toy-collection')

  let card = document.createElement('div')
      card.classList.add("card");
  
  let toyName = document.createElement('h2')
      toyName.innerText = toy.name
      
  let toyImg = document.createElement('img')
      toyImg.classList.add("toy-avatar");
      toyImg.src = toy.image
      
  let toyLikes = document.createElement('p')
      toyLikes.innerText = toy.likes + ' Likes'
      toyLikes.id = `toyLikes-${toy.id}`
      
  let toyButton = document.createElement('button')
      toyButton.classList.add("like-btn");
      toyButton.innerText = "Like <3"

      toyButton.addEventListener('click', () => {
        updateLikes(toy)
      })

      card.append(toyName, toyImg, toyLikes, toyButton)
      toyBox.appendChild(card)
}

/*

<div id="toy-collection">
  <div class="card">
      <h2>Woody</h2>
      <img src=toy_image_url class="toy-avatar" />
      <p>4 Likes </p>
      <button class="like-btn">Like <3</button>
  </div> 
</div>

*/


const handleForm = () => {
  const toyForm = document.querySelector('form')
  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    debugger
    let newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    let reqPackage = {}
      reqPackage.headers = {"Content-Type": "application/json"}
      reqPackage.method = "POST"
      reqPackage.body = JSON.stringify(newToy)
    fetch(BASE_URL, reqPackage)
      .then(res => res.json())
      .then(renderToys)
      toyForm.reset()
  })
}

const updateLikes = (toy) => {
  
  let likes = parseInt(document.getElementById(`toyLikes-${toy.id}`).innerText.split(" ")[0])

  let newLikes = {
    likes: likes + 1
  }

  let reqPackage = {}
      reqPackage.headers = {"Content-Type" : "application/json"}
      reqPackage.method = "PATCH"
      reqPackage.body = JSON.stringify(newLikes)

  fetch(BASE_URL+`/${toy.id}`, reqPackage)
    .then(res => res.json())
    .then((toyObj) => {
      document.getElementById(`toyLikes-${toy.id}`).innerText = newLikes.likes + " Likes"
    })
}

//Uncaught (in promise) TypeError: Cannot set property 'innerText' of null at index.js:96
