const mongoose = require("mongoose");

const blogsSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    author: String,
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);

module.exports = mongoose.model("Blogs", blogsSchema);
