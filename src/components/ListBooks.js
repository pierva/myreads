import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {

  render() {
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              books={this.props.reading}
              shelfTitle='Currently Reading'
              handleChange={console.log('changin')}
            />
            <BookShelf
              books={this.props.wantToRead}
              shelfTitle='Want to Read'
              handleChange={console.log('changin')}

            />
            <BookShelf
              books={this.props.read}
              handleChange={console.log('changin')}
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
}

export default ListBooks