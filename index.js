/* eslint-disable max-classes-per-file */
const form = document.querySelector('form');
const navList = document.querySelector('.nav-list');
const navAdd = document.querySelector('.nav-add');
const navContact = document.querySelector('.nav-contact');
const addBook = document.querySelector('.add');
const list = document.querySelector('.list');
const contact = document.querySelector('.contact');
const empty = document.querySelector('.empty');

// to display the time
document.querySelector('time').innerHTML = new Date().toLocaleString();

// listing books link
navList.addEventListener('click', () => {
  list.classList.remove('hide');
  addBook.classList.add('hide');
  contact.classList.add('hide');
});

// adding books link
navAdd.addEventListener('click', () => {
  list.classList.add('hide');
  addBook.classList.remove('hide');
  contact.classList.add('hide');
});

// contact link
navContact.addEventListener('click', () => {
  list.classList.add('hide');
  addBook.classList.add('hide');
  contact.classList.remove('hide');
});

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Storage {
  static BooksFromStorage() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static BooksToStorage(book) {
    const books = Storage.BooksFromStorage();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeFromStorage(author) {
    const books = Storage.BooksFromStorage();

    books.forEach((book, i) => {
      if (book.author === author) {
        books.splice(i, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

  static checkEmptyList() {
    const books = Storage.BooksFromStorage();
    if (books.length === 0) {
      empty.classList.remove('hide');
    } else {
      empty.classList.add('hide');
    }
  }
}

class BooksToDom {
  static displayBooksInDom() {
    Storage.checkEmptyList();
    const books = Storage.BooksFromStorage();

    books.forEach((book) => BooksToDom.BooksList(book));
  }

  static BooksList(book) {
    const tbody = document.querySelector('#tbody');
    const tableRow = document.createElement('tr');

    tableRow.innerHTML = `
    <td>${`"${book.title}"`}</td>
    <td>by</td>
    <td>${book.author}</td>
    <td><a href="#" class='rm-button'>Remove</a></td>
    `;
    tbody.appendChild(tableRow);
  }

  static deleteBook(el) {
    if (el.classList.contains('rm-button')) {
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

  BooksToDom.BooksList(book);

  Storage.BooksToStorage(book);

  Storage.checkEmptyList();

  BooksToDom.clearField();
});

document.querySelector('#tbody').addEventListener('click', (e) => {
  BooksToDom.deleteBook(e.target);

  Storage.removeFromStorage(
    e.target.parentElement.previousElementSibling.textContent,
  );
  Storage.checkEmptyList();
});
