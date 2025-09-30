const axios = require("axios");

const BASE_URL = "http://localhost:3000";

async function getAllBooks(callback) {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
     callback(null, response.data);
  } catch (error) {
   callback(error, null); 
  }
}
getAllBooks((err, books) => {
  if (err) {
    console.error("Error fetching books:", err.message);
  } else {
    console.log("All Books (via async callback):", books);
  }
});

function getBookByISBN(isbn) {
  axios.get(`${BASE_URL}/books/${isbn}`)
    .then(response => console.log("Book by ISBN:", response.data))
    .catch(error => console.error("Error:", error.message));
}
getBookByISBN("12345");


function getBooksByAuthor(author) {
  axios.get(`${BASE_URL}/books/author/${author}`)
    .then(response => console.log("Books by Author:", response.data))
    .catch(error => console.error("Error:", error.message));
}
getBooksByAuthor("John Smith");


function getBooksByTitle(title) {
  axios.get(`${BASE_URL}/books/title/${title}`)
    .then(response => console.log("Books by Title:", response.data))
    .catch(error => console.error("Error:", error.message));
}

getBooksByTitle("Node.js Basics");

// Call the function




