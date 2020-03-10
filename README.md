# MyReads Project

This is the first project of the Udacity React Nanodegree.
This simple application shows how to manage state with different components and pass information from one component to another.

The application makes use of the data provided by the Udacity `books-api`(https://reactnd-books-api.udacity.com)

The API provides the below endpoints:
- GET /books/:bookId
- GET /all (limited to 20 books)
- POST /update/:bookId
- POST /search (query string required)

The single-page application has two views, the first one contains the list of the books divided into shelves and the second one is where the user can search for a book (by title or author) and add the book to the desired shelf.


## Getting started
The application was created by using the `create-react-app` module.
First install the dependencies with:
```sh
$ npm install
```
Then run the application with:
```sh
$ npm start
```


