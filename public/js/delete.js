// const deleteForm = document.getElementById("delete");
// const blogId = deleteForm.getAttribute('data-blog-id')
// const delUrl = "/api/blog/del/"+blogId
// console.log(delUrl)
// const deleteBlog = async () => {
//   console.log("CHECKING IN")
//   // Make a POST request to destroy the session on the back end
//   const response = await fetch(delUrl, {
//     method: 'DELETE',
//   });

//    if (response.ok) {
//   // //   // If successfully logged out, redirect to the login page
//   // console.log("Blog Modified")
  
//      document.location.replace('/api/users');
//   } else {
//     alert(response.statusText);
//   }
// };

// document.querySelector('#deleteBtn').addEventListener('click', deleteBlog)