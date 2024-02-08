async function getAllBlogs() {
  try {
    const response = await fetch("/blogs");
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const blogs = await response.json();

    const blogsContainer = document.getElementById("blogsContainer");
    blogsContainer.innerHTML = "";

    blogs.forEach((blog) => {
      const blogElement = document.createElement("div");
      blogElement.classList.add("blog");
      blogElement.innerHTML = `
        <h2>${blog.title}</h2>
        <p>${blog.body}</p>
        <p>Author: ${blog.author}</p>
        <button onclick="deleteBlog('${blog._id}')">Delete</button>
      `;
      blogsContainer.appendChild(blogElement);
    });
  } catch (error) {
    console.error(error);
    alert("Failed to fetch blogs");
  }
}

async function deleteBlog(blogId) {
  try {
    const response = await fetch(`/blogs/${blogId}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Failed to delete blog");
    }
    alert("Blog deleted successfully");
    getAllBlogs();
  } catch (error) {
    console.error(error);
    alert("Failed to delete blog");
  }
}

document
  .getElementById("createBlogForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const requestData = {};
    formData.forEach((value, key) => {
      requestData[key] = value;
    });

    try {
      const response = await fetch("/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Failed to create blog");
      }
      alert("Blog created successfully");
      getAllBlogs();
      this.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to create blog");
    }
  });

async function deleteAllBlogs() {
  try {
    const response = await fetch("/blogs", { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Failed to delete all blogs");
    }
    alert("All blogs deleted successfully");
    getAllBlogs();
  } catch (error) {
    console.error(error);
    alert("Failed to delete all blogs");
  }
}

getAllBlogs();
