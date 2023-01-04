const postsList = document.querySelector('.posts-list');
const addPostFrom = document.querySelector('.add-post-form');
const titleValue = document.getElementById('title-value');
const descriptionValue = document.getElementById('description-value');
let output = '';

const renderPosts = (posts) => {
  posts.forEach(post => {
    output += `
      <div class="card mt-4 col-md-6 bg-light">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
          <p class="card-text">${post.description}</p>
          <a href="#" class="card-link">Edit</a>
          <a href="#" class="card-link">Delete</a>
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
})



