import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'


function ListBooks (props) {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              books={props.currentlyReading}
              shelfTitle='Currently Reading'
              handleChange={props.handleChange}
            />
            <BookShelf
              books={props.wantToRead}
              shelfTitle='Want to Read'
              handleChange={props.handleChange}

            />
            <BookShelf
              books={props.read}
              handleChange={props.handleChange}
              shelfTitle='Read'
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

export default ListBooks