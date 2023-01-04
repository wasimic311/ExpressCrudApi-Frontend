const postsList = document.querySelector('.posts-list');
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









// fetch('http://127.0.0.1:3000/posts')
// .then(result => {
//   return result.json();
// })
// .then(data => {
//   console.log(data)
// })