/* eslint-disable max-classes-per-file */
const form = document.querySelector('form');
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Storage {
  static BooksFromStorage() {
    let booksArr;
    if (localStorage.getItem('books') === null) {
      booksArr = [];
    } else {
      booksArr = JSON.parse(localStorage.getItem('books'));
    }
    return booksArr;
  }

  static addBooksToStorage(book) {
    const books = Storage.BooksFromStorage();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBooksFromStorage(title) {
    const books = Storage.BooksFromStorage();

    books.forEach((book, i) => {
      if (book.title === title) {
        books.splice(i, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class BooksToDom {
  static displayBooksInDom() {
    const books = Storage.BooksFromStorage();

    books.forEach((book) => BooksToDom.domBooksList(book));
  }

  static domBooksList(book) {
    const tbody = document.querySelector('#tbody');
    const tableRow = document.createElement('tr');

    tableRow.innerHTML = `
    <td>${`"${book.title}"`}</td>
    <td>by</td>
    <td>${book.author}</td>
    <td><a href="#" class='RemoveBtn'>Remove</a></td>
    `;
    tbody.appendChild(tableRow);
  }

  static deleteBook(el) {
    if (el.classList.contains('RemoveBtn')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearField() {
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', BooksToDom.displayBooksInDom);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;

  const book = new Book(title, author);

  BooksToDom.domBooksList(book);

  Storage.addBooksToStorage(book);

  BooksToDom.clearField();
});

document.querySelector('#tbody').addEventListener('click', (e) => {
  BooksToDom.deleteBook(e.target);

  Storage.removeBooksFromStorage(
    e.target.parentElement.previousElementSibling.textContent,
  );
});