import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import { throttle } from 'lodash'

function SearchBook (props) {

    const handleSubmit = (e) => {
        /**
         * BUG: event is not accessible when the function is called
         *      by the throttle method
         */
        const query = document.querySelector('[name="query"]').value
        props.searchBook(query)
    } 
        return (
            <div>
                <div className="search-books-bar">
                    <Link className='close-search' to="/">close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" name="query" required
                            onChange={throttle(handleSubmit, 300)}
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">

                    </ol>
                </div>
                <BookShelf
                    books={props.books}
                    shelfTitle=''
                    handleChange={props.handleChange}
                />
            </div>
        )
}

export default SearchBook