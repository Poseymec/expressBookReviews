const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
// Activer express.json() pour le parsing des JSON


// Route pour l'inscription
public_users.post("/register", (req, res) => {
  // Extraction des données `username` et `password` du corps de la requête
  const { username, password } = req.body;

  // Vérification de la présence des données `username` et `password`
  if (!username || !password) {
    return res.status(400).send("Veuillez fournir un nom d'utilisateur et un mot de passe.");
  }

  // Vérifier si l'utilisateur existe déjà
  if (users.find(user => user.username === username)) {
    return res.status(400).send("Le nom d'utilisateur existe déjà dans la base.");
  }

  // Ajouter le nouvel utilisateur
  users.push({ 
    username: username,
    password: password
  });

  res.send(`${username} est inscrit avec succès.`);
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
  const book =books[isbn]
  if(!book){
    return res.send('Livre non trouver')
  }else{
    res.send(book);
  }
  
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author= req.params.author;
  const book = Object.values(books).find(book=>book.author === author)
  if(!book){
    return res.send('Livre non trouver')
  }else{
    res.json(book);
  };
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const book =Object.values(books).find(book=>book.title === title)
  if(!book){
    return res.send('Livre non trouver')
  }else{
    res.send(book);
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn]
  if(!book){
    return res.send('Livre non trouver')
  }else{
    res.json(book.reviews);
  }
});

module.exports.general = public_users;
