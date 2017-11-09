import React, { Component } from 'react';
import Book from './Book'

class BookList extends Component {
constructor(props) {
  super(props);
  this.state = {
    showSearchPage : false
  }
}


  render() {
    return(
      <div className="app">
          <div>
           <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                      {this.props.books.map(book =>
                        <li key={book.title}>
                          <Book
                          book={book}
                          handleShelfChange={this.props.handleShelfChange}/>
                        </li>)
                      }
                    </ol>
                  </div>

                </div>
              </div>
            </div>
          </div>
    </div>
    )
  }
}


export default BookList;
