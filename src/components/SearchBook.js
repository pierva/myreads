import React from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import BookShelf from './BookShelf'



function SearchBook(props) {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = document.querySelector('#searchBookForm')
        const { query } = serializeForm(form, { hash: true })
        props.onSearchBook(query)
    }
    return (
        <div>
            <div className="search-books-bar">
                <Link className='close-search' to="/">close</Link>
                <div className="search-books-input-wrapper">
                    <form id="searchBookForm" onSubmit={handleSubmit}>
                        <input type="text" name="query" required
                            placeholder="Search by title or author" />
                        <button className='submit-search'
                            type='submit'
                            form="searchBookForm"
                            onClick={handleSubmit}
                        >Submit</button>
                    </form>
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