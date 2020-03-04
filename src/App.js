import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.scss'
import './components/SearchBook'
import './components/ListBooks'
import { Route } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBook from './components/SearchBook'


class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  state = { 
      searched: [],
      wantToRead: [],
      read: [],
      allBooks: [],
      none: []
   }

   searchBook = (query) => {
    BooksAPI.search(query)
      .then((result) => {
        this.setState((prevState) => ({
          searched: result
        }))
      })
   }

   filterBooks(allBooks) {
    return {
      currentlyReading: allBooks.filter((book) => book.shelf === 'currentlyReading'),
      wantToRead: allBooks.filter((book) => book.shelf === 'wantToRead'),
      read: allBooks.filter((book) => book.shelf === 'read')
    }
  } 

  componentDidMount() {
    BooksAPI.getAll()
      .then((allBooks) => {
        this.setState(() => ({
          allBooks,
          ...this.filterBooks(allBooks)
        }))
      })
  }

  async handleChange(event) {
    const shelf = event.target.value
    const bookId = event.target.dataset.bookid
    const prevShelf = event.target.dataset.shelf
    const book = await BooksAPI.get(bookId)
    // Update shelf property here otherwise the selected option will
    // be the previous option
    book.shelf = shelf
    if(book) {
      BooksAPI.update(bookId, shelf)
        .then((res) => {
          if (!res.error) {
            this.setState((prevState) => ({
              [prevShelf]: prevState[prevShelf].filter((book) => book.id !== bookId),
              [shelf]: prevState[shelf].concat([book])
            }))
          }
        })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          // Pass the state object to the component
          <ListBooks {...this.state}
            handleChange = {this.handleChange}
          />
          // <ListBooks />
        )}/>
        <Route path='/search' render={() => (
          <SearchBook 
            onSearchBook={(query) => {
              this.searchBook(query)
            }}
            books = {this.state.searched}
            handleChange = {this.handleChange}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
