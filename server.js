

// New CommonJS require
const express = require("express");
const jwt = require("jsonwebtoken");

let users = [];

// Mock data for books
let books = {
  "12345": {
    title: "Node.js Basics",
    author: "John Smith",
    reviews: {}
  },
  "67890": {
    title: "Express in Action",
    author: "Jane Doe",
    reviews: {}
  }
};


const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey"; // in real apps, keep in .env

app.get("/", (req, res) => {
  res.send("Welcome to the Book Review API!");
});
// Login Route
// Login existing user
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});


// Middleware to check token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; 
    next();
  });
}
// Add review
app.post("/books/:isbn/review", authenticateToken, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;

  res.json({
    message: `Review added for book ${isbn}`,
    user: req.user.username,
    review
  });
});

// Modify review
app.put("/books/:isbn/review", authenticateToken, (req, res) => {
  res.json({ message: "Review updated", user: req.user.username });
});

// Delete review
app.delete("/books/:isbn/review", authenticateToken, (req, res) => {
  res.json({ message: "Review deleted", user: req.user.username });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
app.get("/books/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  let result = [];

  for (let isbn in books) {
    if (books[isbn].author.toLowerCase() === author) {
      result.push(books[isbn]);
    }
  }

  res.json(result.length ? result : { message: "No books by this author" });
});
app.get("/books/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  let result = [];

  for (let isbn in books) {
    if (books[isbn].title.toLowerCase() === title) {
      result.push(books[isbn]);
    }
  }

  res.json(result.length ? result : { message: "No books with this title" });
});
app.get("/books/:isbn/review", (req, res) => {
  const book = books[req.params.isbn];
  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
// Register new user
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  res.json({ message: "Registration successful" });
});




