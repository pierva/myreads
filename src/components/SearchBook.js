import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchBook extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target);
        // call searchBook function that should come with props
    }

    render() {
        return (
            <div>
                <div className="search-books-bar">
                    <Link className='close-search' to="/">close</Link>
                    <div className="search-books-input-wrapper">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Search by title or author" />
                        </form>
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                </div>
            </div>
        )
    }
}

export default SearchBook