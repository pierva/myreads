import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {search} from '../BooksAPI'
import serializeForm from 'form-serialize'
import BookShelf from './BookShelf'

class SearchBook extends Component {

    state = {
        books: this.props.books
    }
    searchBook = (query) => {
        search(query)
            .then((result) => {
                this.setState((prevState) => ({
                    books: result
                }))
            })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { query } = serializeForm(e.target, { hash: true })
        this.searchBook(query)
    }

    render() {
        return (
            <div>
                <div className="search-books-bar">
                    <Link className='close-search' to="/">close</Link>
                    <div className="search-books-input-wrapper">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="query"
                                placeholder="Search by title or author" />
                        <button className='submit-search'
                            type='submit'
                            onClick={this.handleSubmit}
                        >GO</button>
                        </form>
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">

                    </ol>
                </div>
                <BookShelf
                    // Need to pass array of books coming from API 
                    books={this.state.books}
                    shelfTitle=''
                />
            </div>
        )
    }
}

export default SearchBook