# Blog API

This is a simple RESTful API for managing blog posts.

## Installation

1. Clone the repository:
```
git clone https://github.com/a169n/blogs.git
```

2. Install dependencies:

```
cd blogs
npm install
```

3. Set up environment variables:

**Create a `.env` file in the root directory and add the following variables:**
```
PORT = 3000
MONGO_URI = your_mongo_uri_here
```

## Usage

Start the server:

```
npm run dev
```


The server will start on `http://localhost:3000` by default.

### Endpoints

- `GET /blogs`: Get all blogs
- `GET /blogs/:blogId`: Get a single blog by ID
- `POST /blogs`: Create a new blog
- `PUT /blogs/:id`: Update a blog by ID
- `DELETE /blogs/:id`: Delete a blog by ID
- `DELETE /blogs`: Delete all blogs

## Dependencies

- Express: Web framework for Node.js
- Mongoose: MongoDB object modeling tool
- dotenv: Load environment variables from a .env file
- body-parser: Parse incoming request bodies

## Contributing

Contributions are welcome! Please create an issue or submit a pull request.


