const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  users.push({
    'name': req.query.name,
    'password':req.query.password,
  })

  res.send(req.query.name + "est inscrit")
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;
  const book = books.find(book=>book.isbn === isbn)
  if(!book){
    return res.send('Livre non trouver')
  }else{
    res.json(book);
  }
  
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const isbn = req.params.author;
  const book = books.find(book=>book.author === title)
  if(!book){
    return res.send('Livre non trouver')
  }else{
    res.json(book);
  };
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const isbn = req.params.title;
  const book = books.find(book=>book.title === title)
  if(!book){
    return res.send('Livre non trouver')
  }else{
    res.json(book);
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books.find(book=>book.isbn === isbn)
  if(!book){
    return res.send('Livre non trouver')
  }else{
    res.json(book.reviews);
  }
});

module.exports.general = public_users;
