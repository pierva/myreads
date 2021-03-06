import React, { Component } from 'react'


class BookShelf extends Component {

  render() {
    const { books } = this.props
    const { shelfTitle } = this.props
    const { emptySearch } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          {emptySearch ? <p></p> : !books || books.error || books.length===0 ? 
            <p>No books found</p> 
          :
          <ol className="books-grid">
            {books && books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover"
                      style={{
                        width: 128, height: 193,
                        backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ""})`
                      }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={this.props.handleChange} data-bookid={book.id}
                        data-shelf={book.shelf || 'none'}
                        value={book.shelf ? book.shelf : 'none'}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors && book.authors.join(', ')}
                  </div>
                </div>
              </li>
            ))}
          </ol>
          }
        </div>
      </div>
    )
  }
}


export default BookShelf