let booksArr = [];
const form = document.querySelector('.addBookForm');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');

function fetchBooks() {
  const books = JSON.parse(localStorage.getItem('books'));
  if (books !== null) {
    booksArr = books;
  }
}

function showBooks() {
  const bookDiv = document.querySelector('.books');
  let booksContent = '';
  if (booksArr.length !== 0) {
    booksArr.forEach((book) => {
      booksContent += `<p>${book.title}</p> <p>${book.author}</p><button data-title=${book.title} class="deleteBook">Remove</button> <hr>`;
    });
    bookDiv.innerHTML = booksContent;
    const deleteBook = document.querySelectorAll('.deleteBook');
    deleteBook.forEach((element) => {
      element.addEventListener('click', function deleteBook() {
        const { title } = this.dataset;
        const remove = booksArr.filter((b) => b.title !== title);
        localStorage.setItem('books', JSON.stringify(remove));
        fetchBooks();
        showBooks();
      });
    });
  } else {
    bookDiv.innerHTML = '';
  }
}

fetchBooks();
showBooks();