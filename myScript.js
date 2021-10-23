let myLibrary = [];

function Book(title,author,page,readStatus) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.readStatus = readStatus;
}

function addBookToLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const page = document.getElementById('page').value;
  const readStatus = document.getElementById('readStatus').value;
  const book = new Book(title,author,page,readStatus);
  myLibrary.push(book);
  resetForm();
  closeForm();
  displayBook();
}

function openForm() {
  document.getElementById('modal').style.display = 'flex';
}

function closeForm() {
  document.getElementById('modal').style.display = 'none';
}

function resetForm() {
  const inputForm = Array.from(document.querySelectorAll('input'));
  inputForm.forEach(input => {
    input.value = "";
  })
}

function displayBook() {
  const screen = document.getElementById('bookList');
  myLibrary.forEach(book => {
    const div = document.createElement('div');
    div.classList.add('book');
    const bookContainer = screen.appendChild(div);
    const h1 = document.createElement('h1');
    const h3 = document.createElement('h3');
    const divPage = document.createElement('div');
    h1.textContent = book.title;
    h3.textContent = book.author;
    divPage.textContent = `${book.page} pages`;
    switch(book.readStatus){
      case "Yes":
        div.classList.add('read');
        break;
      case "No":
        div.classList.add('notRead');
        break;  
    }
    bookContainer.appendChild(h1);
    bookContainer.appendChild(h3);
    bookContainer.appendChild(divPage);
  })
}

const inputPop = document.getElementById('add');
inputPop.addEventListener('click', openForm)

const inputHide = document.getElementById('cancel');
inputHide.addEventListener('click', closeForm)

const submit = document.getElementById('submit');
submit.addEventListener('click', addBookToLibrary);