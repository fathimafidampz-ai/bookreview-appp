const axios = require("axios");

const BASE_URL = "http://localhost:3000";

async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    console.log("All Books:", response.data);
  } catch (error) {
    console.error("Error fetching books:", error.message);
  }
}
function getBookByISBN(isbn) {
  axios.get(`${BASE_URL}/books/${isbn}`)
    .then(response => console.log("Book by ISBN:", response.data))
    .catch(error => console.error("Error:", error.message));
}



function getBooksByAuthor(author) {
  axios.get(`${BASE_URL}/books/author/${author}`)
    .then(response => console.log("Books by Author:", response.data))
    .catch(error => console.error("Error:", error.message));
}
function getBooksByTitle(title) {
  axios.get(`${BASE_URL}/books/title/${title}`)
    .then(response => console.log("Books by Title:", response.data))
    .catch(error => console.error("Error:", error.message));
}



// Call the function
getAllBooks();
getBookByISBN("12345");
getBooksByAuthor("John Smith");
getBooksByTitle("Node.js Basics");
