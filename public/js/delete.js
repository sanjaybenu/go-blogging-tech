
const deleteForm = document.getElementById("deleteForm");
const blogId = deleteForm.getAttribute('data-blog-id')
const delUrl = "/api/blog/del/"+blogId
console.log(delUrl)
const deleteBlog = async () => {
  console.log("CHECKING IN")
  // Make a POST request to destroy the session on the back end
  const response = await fetch(delUrl, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' }
  });

   if (response.ok) {
     document.location.replace('/api/users');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#deleteBtn').addEventListener('click', deleteBlog)