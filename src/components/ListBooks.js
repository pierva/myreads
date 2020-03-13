import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'


function ListBooks (props) {
    const shelves = [
      {
        name: 'Currently Reading',
        value: 'currentlyReading'
      },
      {
        name: 'Want to Read',
        value: 'wantToRead'
      },
      {
        name: 'Read',
        value: 'read'
      }
    ]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
            shelves.map((shelf) => (
                <BookShelf 
                  key={shelf.value}
                  books={props.allBooks.filter((book) => book.shelf === shelf.value)}
                  shelfTitle= {shelf.name}
                  handleChange={props.handleChange}
                />
            ))
            }  
          </div>
        </div>
        <div>
          <Link className="open-search" to="/search">
            <button onClick={props.handleClick}>Search</button>
          </Link>
        </div>
      </div>
    )
  }

export default ListBooks