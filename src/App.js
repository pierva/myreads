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

  /**
   * 
   * @param {array} allBooks 
   */
  filterBooks(allBooks) {
    return {
      currentlyReading: allBooks.filter((book) => book.shelf === 'currentlyReading'),
      wantToRead: allBooks.filter((book) => book.shelf === 'wantToRead'),
      read: allBooks.filter((book) => book.shelf === 'read')
    }
  }

  async componentDidMount() {
    await BooksAPI.getAll()
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
     
    if (book) {
      const allBooks = this.state.allBooks.map((elem) => {
        if(elem.id === book.id) return book
        return elem
      })

      // Update the searched books array
      const idx = this.state.searched.findIndex(x => x.id === book.id)
      if(idx !== -1) {
        const books = this.state.searched
        books[idx].shelf = shelf
        this.setState((prevState) => ({
          searched: books
        }))
      }

      await BooksAPI.update(bookId, shelf)
        .then((res) => {
          if (!res.error) {
            this.setState((prevState) => ({
              [prevShelf]: prevState[prevShelf].filter((book) => book.id !== bookId),
              [shelf]: prevState[shelf].concat([book]),
              allBooks
            }))
          }
        })
    }
  }

  clearSearch = () => {
    this.setState(() => ({
      searched: []
    }))
  }

  /**
     * @param {string} query
     * @returns {promise || undefined} If no query parameter is provided
     *                                 the function assing an empty array
     *                                 to the state "searched" key
     */
    
    searchBook = async (query) => {          
      if (query && query.trim() !== "") {
          return BooksAPI.search(query)
              .then((result) => {
                  const booksOnShelves = this.state.allBooks
                  const filtered = result.error ? [] : result.map((book) => {
                      const bookOnShelf = booksOnShelves.find(
                          (elem) => elem.id === book.id )
                      if (bookOnShelf) return bookOnShelf
                      return book
                  })                   
                  this.setState((prevState) => ({
                      searched: filtered
                  }))
              })
      }
      return this.setState(() => ({
          searched: []
      }))
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          // Pass the state object to the component
          <ListBooks {...this.state}
            handleChange={this.handleChange}
            handleClick = {this.clearSearch}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBook
            books={this.state.searched}
            handleChange={this.handleChange}
            searchBook={this.searchBook}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
