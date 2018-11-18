const express = require('express');
const books = express.Router();

const BooksController = require('../controllers/books');

books.get('/', BooksController.getBooks);

module.exports = books;