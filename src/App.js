import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.scss'
import './components/SearchBook'
import './components/ListBooks'
import { Route } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBook from './components/SearchBook'


class BooksApp extends React.Component {
  state = { 
      searched: [],
      reading: [],
      wantToRead: [],
      read: []
   }

   searchBook = (query) => {
    BooksAPI.search(query)
      .then((result) => {
        this.setState((prevState) => ({
          searched: result
        }))
      })
   }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          // expected to pass a list of books here
          <ListBooks />
        )}/>
        <Route path='/search' render={() => (
          <SearchBook 
            onSearchBook={(query) => {
              this.searchBook(query)
            }}
            books = {this.state.searched}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
