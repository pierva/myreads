import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import { throttle } from 'lodash'
import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component {
    state = {
        searched: []
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
                    const booksOnShelves = this.props.books
                    const filtered = result.map((book) => {
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

    handleSubmit = (e) => {
        /**
         * BUG: event is not accessible when the function is called
         *      by the throttle method
         */
        const query = document.querySelector('[name="query"]').value
        this.searchBook(query)
    } 
    render() {
        return (
            <div>
                <div className="search-books-bar">
                    <Link className='close-search' to="/">close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" name="query" required
                            onChange={throttle(this.handleSubmit, 300)}
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">

                    </ol>
                </div>
                <BookShelf
                    books={this.state.searched}
                    shelfTitle=''
                    handleChange={this.props.handleChange}
                />
            </div>
        )
    }
}

export default SearchBook