import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import { throttle } from 'lodash'

class SearchBook extends Component {

    state = {
        emptySearch: true
    }

    handleSubmit = (e) => {
        /**
         * BUG: event is not accessible when the function is called
         *      by the throttle method
         */
        const query = document.querySelector('[name="query"]').value
        this.props.searchBook(query)
        const emptySearch = query.trim() !== '' ? false : true
            this.setState(() => ({
                emptySearch
            }))
    } 
    render(){
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
                    books={this.props.books}
                    shelfTitle=''
                    handleChange={this.props.handleChange}
                    emptySearch = {this.state.emptySearch}
                />
            </div>
        )
    }
}

export default SearchBook