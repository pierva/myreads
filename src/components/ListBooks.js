import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {
    state = {
    }

    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
               <BookShelf
                // Need to pass array of books coming from API 
                  books = {this.props.books.filter((book) => book.shelf === 'currentlyReading')}
                  shelfTitle = 'Currently Reading'
               /> 
               <BookShelf
                // Need to pass array of books coming from API 
                books = {this.props.books.filter((book) => book.shelf === 'wantToRead')}

                  shelfTitle = 'Want to Read'
               /> 
               <BookShelf
                // Need to pass array of books coming from API 
                books = {this.props.books.filter((book) => book.shelf === 'read')}

                  shelfTitle = 'Read'
               /> 

              </div>
            </div>
            <div>
              <Link className="open-search" to="/search">
                  <button>Search</button>
              </Link>
            </div>
          </div>
        )
    }
}

export default ListBooks