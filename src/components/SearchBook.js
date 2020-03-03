import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {search} from '../BooksAPI'
import serializeForm from 'form-serialize'
import BookShelf from './BookShelf'

class SearchBook extends Component {

    state = {
        books: this.props.books
    }
    searchBook = async (query) => {
        if (query && query.trim() !== "") {
            return search(query)
                .then((result) => {
                    this.setState((prevState) => ({
                        books: result
                    }))
                })
        }
        return this.setState(() => ({
            books: []
        }))
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const form = document.querySelector('#searchBookForm')
        const { query } = serializeForm(form, { hash: true })
        this.searchBook(query)
    }

    render() {
        return (
            <div>
                <div className="search-books-bar">
                    <Link className='close-search' to="/">close</Link>
                    <div className="search-books-input-wrapper">
                        <form id="searchBookForm" onSubmit={this.handleSubmit}>
                            <input type="text" name="query" required
                                placeholder="Search by title or author" />
                        <button className='submit-search'
                            type='submit'
                            form="searchBookForm"
                            onClick={this.handleSubmit}
                        >Submit</button>
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