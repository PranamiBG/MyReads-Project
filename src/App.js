import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch'


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showSearchPage : false
    };
    //this.updateState = this.updateState.bind(this)
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
    console.log(this.state.books);
  }

  filterByShelf = (bookName,shelfName) =>
   bookName.filter(book => book.shelf===shelfName)


  isTheBookNew = (book, newShelf) => {
    let is = false;
    if (book.shelf === "none")
     {
       book.shelf = newShelf;
       this.setState(state =>
       {
         books: state.books.push(book)});
          is = true;
          console.log(this.state.books);
       }
       return is;
      };

      handleShelfChange = (bookOnChange, newSehlf) => {
         !this.isTheBookNew(bookOnChange, newSehlf) && this.setState(state => {
         let newBooks = state.books.map(book =>
           { if (bookOnChange.id === book.id)
             { book.shelf = newSehlf; }
             return book;
           });
             return {
                books: newBooks
               };
              }
            );
            BooksAPI.update(bookOnChange, newSehlf);
            };

        updateState = (booksList) => {
          const books = [...this.state.books, booksList]
          this.setState({ books });
        }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <BookList
              books={this.filterByShelf(this.state.books,'currentlyReading')}
              shelfName='Currently Reading'
              handleShelfChange={this.handleShelfChange}/>

              <BookList
              books={this.filterByShelf(this.state.books,'wantToRead')}
              shelfName='Want to Read'
              handleShelfChange={this.handleShelfChange}/>

              <BookList
              books={this.filterByShelf(this.state.books,'read')}
              shelfName='Read'
              handleShelfChange={this.handleShelfChange}/>

              <div className="open-search">
                <Link
                to="./search" />
              </div>
          </div>
        )
      } />

            <Route path="/search" render={() =>
                <BookSearch
                 books={this.state.books}
                 handleShelfChange={this.handleShelfChange}
                 updateState={this.updateState}/>
              } />

      </div>
    )
  }
}

export default BooksApp
