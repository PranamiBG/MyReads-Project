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
      books:[],
      oldBooks :[]
    }
  }

  updateSearch = (searchString) => {
    let parent = this.props.books;
    this.setState({search: searchString.trim()})
    let searchResults = BooksAPI.search(this.state.search,1).then((book_search) => {
      if (book_search != undefined) {
        book_search.map((book) => {
            book.shelf = 'none'
          } );
          this.setState({ oldBooks : book_search }, this.check); // callback function to this.setState
        //  console.log(this.state.books)
        }
    })
}


  check = () => {
      let parent_books = this.props.books;
      const book_result = this.state.oldBooks.map((book) => {
      const parent = parent_books.find(parent => parent.title === book.title );
       if(parent) {
         book.shelf = parent.shelf;
          }
        return book;
      })
        let getBook = this.state.books.filter(filteredBook => filteredBook.shelf !== "none")
        this.setState({books: book_result})
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
