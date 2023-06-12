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