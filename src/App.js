import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import './components/SearchBook'
import './components/ListBooks'
import { Route } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBook from './components/SearchBook'


class BooksApp extends React.Component {
  state = {  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          // expected to pass a list of books here
          <ListBooks />
        )}/>
        <Route path='/search' component={SearchBook}/>
      </div>
    )
  }
}

export default BooksApp
