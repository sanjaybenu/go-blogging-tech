const logout = async () => {
    // Make a POST request to destroy the session on the back end
    const response = await fetch('/api/home/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // If successfully logged out, redirect to the login page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);

  //*************Modify *********************** */

const modify = async () => {
  const modifyForm = document.getElementById("modifyForm");
const blog_Id = modifyForm.getAttribute("data-blog-id");
const url = "/api/blog/"+blog_Id
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  const payload = {
    title: title,
    description: description
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log("Modified blog")
    //window.location.href='/api/users'
  } else {
    console.log("Failed to modify the blog");
  }
};

document.querySelector('#modifyFormBtn').addEventListener('click', modify)


//********************Delete ************************ */

const deleteForm = document.getElementById("delete");
const blogId = deleteForm.getAttribute('data-blog-id')
const delUrl = "/api/blog/del/"+blogId
console.log(delUrl)
const deleteBlog = async () => {
  console.log("CHECKING IN")
  // Make a POST request to destroy the session on the back end
  const response = await fetch(delUrl, {
    method: 'DELETE',
  });

   if (response.ok) {
  // //   // If successfully logged out, redirect to the login page
  // console.log("Blog Modified")
  
     document.location.replace('/api/users');
  } else {
    alert(response.statusText);
  }
};

// document.querySelector('#deleteBtn').addEventListener('click', deleteBlog)

// const deleteButton = document.getElementById("deleteBtn");
// deleteButton.addEventListener('click', async () => {
//   const blogId = deleteButton.getAttribute('data-blog-id');
//   const delUrl = "/api/blog/del/" + blogId;
//   console.log(delUrl);

//   try {
//     const response = await fetch(delUrl, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/api/users');
//     } else {
//       throw new Error(response.statusText);
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// });







