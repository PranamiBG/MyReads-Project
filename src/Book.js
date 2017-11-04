import React, { Component } from 'react'

class Book extends Component {

  render() {
    return(
      <div className="book">
        <div key={this.props.book.title}>
          <div className="book-top">
            <div className="book-cover" style={{width:128, height:193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}>
                  <div className="book-shelf-changer">
                    <select
                      onChange={(event) => this.props.handleShelfChange(this.props.book, event.target.value)}>
                      <option selected="selected" value="moveTo" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>

  </div>
      )
  }
}

export default Book
