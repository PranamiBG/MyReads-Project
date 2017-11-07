import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import  sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:'',
      books:[]
    }
  }

  updateSearch = (searchString) => {
    this.setState({search: searchString.trim()})
    let searchResults = BooksAPI.search(this.state.search,1).then((book_search) => {
      if (book_search != undefined) {
        console.log(book_search);
          book_search.map((book) => book.shelf = 'none');
          this.setState({ books : book_search }, this.check()); // callback function to this.setState
          console.log(this.state.books)
        }
    })
    }


  check() {
    let parent_books = this.props.books;
    console.log(this.state.books)
    const book_result = this.state.books.map((book) => {
      const parent = parent_books.find(parent => parent.title === book.title );
       if(parent) {
        console.log(parent);
        book.shelf = parent.shelf;
        let selfChange = this.props.handleShelfChange(book,book.shelf)
        //return selfChange
        }
        return book;
    })
    this.setState({books: book_result})
    console.log(this.state.books)


  }

  render() {
    return(

      <div className="search-books">

        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
             type="text"
             placeholder="Search by title or author"
             value={this.state.search}
             onChange={(event) => this.updateSearch(event.target.value)}/>
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            <BookList
              books={this.state.books}
              handleShelfChange={this.props.handleShelfChange}/>
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
