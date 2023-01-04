fetch('http://127.0.0.1:3000/posts')
.then(result => {
  return result.json();
})
.then(data => {
  console.log(data)
})