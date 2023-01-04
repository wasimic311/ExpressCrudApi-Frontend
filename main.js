const postsList = document.querySelector('.posts-list');
const addPostFrom = document.querySelector('.add-post-form');
const titleValue = document.getElementById('title-value');
const descriptionValue = document.getElementById('description-value');
const btnSubmit = document.querySelector('.btn');
let output = '';

const renderPosts = (posts) => {
  posts.forEach(post => {
    output += `
      <div class="card mt-4 col-md-6 bg-light">
        <div class="card-body" data-id=${post._id}>
          <h5 class="card-title">${post.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
          <p class="card-text">${post.description}</p>
          <a href="#" class="card-link" id="edit-post">Edit</a>
          <a href="#" class="card-link" id="delete-post">Delete</a>
        </div>
      </div>
    `;
  });
  postsList.innerHTML = output;
}


const api = 'http://127.0.0.1:3000/posts'

// Get - Read the posts - Method: GET
fetch(api)
.then(res => res.json())
.then(data => renderPosts(data))



// Create - Insert new post - Method: POST
addPostFrom.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: titleValue.value,
      description: descriptionValue.value

    })
  })
  .then(res => res.json())
  .then(data => {
    const dataArr = [];
    dataArr.push(data);
    renderPosts(dataArr);
  })

  //Reset input field
  titleValue.value = '';
  descriptionValue.value = '';



})



postsList.addEventListener('click', (e) => {
  e.preventDefault();
  let delButtonIsPressed = e.target.id == 'delete-post';
  let editButtonIsPressed = e.target.id == 'edit-post';

  let id = e.target.parentElement.dataset.id;
// Delete a post - Method: DELETE
  if(delButtonIsPressed){
    fetch(`${api}/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => location.reload())
  }

// Edit a post - Method: PATCH
  if(editButtonIsPressed){
    const parent = e.target.parentElement;
    let titleConetnt = parent.querySelector('.card-title').textContent;
    let descriptionConetnt = parent.querySelector('.card-text').textContent;

    //Bringing the values to the input
    titleValue.value = titleConetnt;
    descriptionValue.value = descriptionConetnt;
  }

  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(`${api}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: titleValue.value,
        description: descriptionValue.value
  
      })
    })
    .then(res => res.json())
    .then(() => location.reload())
  })


  

});



