const myLibrary = new Array();

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

const bookContainer = document.querySelector('#book-container');
bookContainer.addEventListener('click', (e) => {
  const bookCard = e.target.closest('.book');
  if (!bookCard) return;

  const index = bookCard.getAttribute('data-index');

  if (e.target.closest('.remove-btn')) {
    myLibrary.splice(index, 1);
    displayBooks();
    return;
  }

  if (e.target.closest('.status-btn')) {
    myLibrary[index].isRead = !myLibrary[index].isRead;
    displayBooks();
  }
});

const openBtn = document.querySelector('#openDialogBtn');
const dialog = document.querySelector('#bookDialog');
openBtn.addEventListener('click', () => {
  dialog.showModal();

  const modalWidth = dialog.offsetWidth;
  const modalHeight = dialog.offsetHeight;

  const btnRect = openBtn.getBoundingClientRect();

  const topPos = btnRect.top - modalHeight - 10;
  const leftPos = btnRect.left - modalWidth + 20;

  dialog.style.top = `${topPos}px`;
  dialog.style.left = `${leftPos}px`;
});

const bookForm = document.querySelector('#bookForm');
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleEl = document.querySelector('#title');
  const authorEl = document.querySelector('#author');
  const pagesEl = document.querySelector('#pages');
  const isReadEl = document.querySelector('#isRead');

  const titleValue = titleEl.value.trim();
  const authorValue = authorEl.value.trim();
  const pagesValue = pagesEl.value;
  const isReadValue = isReadEl.checked;

  if (!titleValue || !authorValue || !pagesValue) {
    alert('Please fill out all fields!');
    return;
  }

  if (pagesValue <= 0) {
    alert('Books must have at least 1 page.');
    return;
  }

  const newBook = new Book(titleValue, authorValue, pagesValue, isReadValue);

  myLibrary.push(newBook);
  displayBooks();

  bookForm.reset();
  dialog.close();
});

function displayBooks() {
  bookContainer.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.setAttribute('data-index', index);

    bookDiv.innerHTML = `
            <div class="book-info">
                <div class="title">${book.title}</div>
                <div class="author">by ${book.author}</div>
            </div>
            <div class="book-meta">
                <div class="pages">${book.pages} pages</div>
                <button class="status-btn ${book.isRead ? 'read' : 'not-read'}">
                    ${book.isRead ? 'Read' : 'Not Read'}
                </button>
                <button class="remove-btn">
                    <span class="material-icons">delete_outline</span>
                </button>
            </div>
        `;
    bookContainer.appendChild(bookDiv);
  });
}

function addBookToLibrary(title, author, pages, isRead) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');

  bookDiv.innerHTML = `
    <div class="book-info">
        <div class="title">${title}</div>
        <div class="author">by ${author}</div>
    </div>
    <div class="book-meta">
        <div class="pages">${pages} pages</div>
        <button class="status-btn ${isRead ? 'read' : 'not-read'}">
            ${isRead ? 'Read' : 'Not Read'}
        </button>
        <button class="remove-btn">
            <span class="material-icons">delete_outline</span>
        </button>
    </div>
    `;

  bookContainer.appendChild(bookDiv);

  bookForm.reset();
  dialog.close();
}

const closeBtn = document.querySelector('#cancelBtn');
closeBtn.addEventListener('click', () => {
  bookForm.reset();
  dialog.close();
});

// Testing
const orwellBook = new Book('1984', 'George Orwell', '268', 'Read');
myLibrary.push(orwellBook);
displayBooks();
