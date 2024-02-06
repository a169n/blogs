const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

require("dotenv").config();

const Blogs = require("./models/blogsSchema");
const { connectDB } = require("./config/db");

connectDB();

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blogs.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/blogs/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blogs.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/blogs", async (req, res) => {
  try {
    const blogData = req.body;
    const newBlog = await Blogs.create(blogData);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/blogs/:id", async (req, res) => {
  try {
    const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/blogs/:id", async (req, res) => {
  try {
    const deletedBlog = await Blogs.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/blogs", async (req, res) => {
  try {
    await Blogs.deleteMany({});
    res.status(200).json({ message: "All data cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);
