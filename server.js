const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

require("dotenv").config();

const Blogs = require("./models/blogsSchema");
const { connectDB } = require("./config/db");

connectDB();

app.get("/blogs", async (req, res) => {
  const blogs = await Blogs.find({});
  res.status(200).json(blogs);
});

app.get("/blogs/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const blog = await Blogs.findById(blogId);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog)
});

app.post("/blogs", async (req, res) => {
  const blogData = req.body;
  const newBlog = await Blogs.create(blogData);
  res.status(201).json(newBlog);
});

app.put("/blogs/:id", async (req, res) => {
  const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(updatedBlog);
});

app.delete("/blogs/:id", async (req, res) => {
  const deletedBlog = await Blogs.findByIdAndDelete(req.params.id);
  if (!deletedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json({ message: "Blog deleted successfully" });
});

app.delete("/blogs", async (req, res) => {
  await Blogs.deleteMany({});
  res.status(200).json({ message: "All data cleared successfully" });
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);
