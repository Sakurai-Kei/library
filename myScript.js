let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary(title,author,page,readStatus) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.readStatus = readStatus;
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
  
}

function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const page = document.getElementById('page').value;
  const readStatus = document.getElementById('readStatus').value;
  const book = new addBookToLibrary(title,author,page,readStatus);
  myLibrary.push(book);
  console.table(book);
  console.log(myLibrary);
  // console.log(title);
  // console.log(author);
  // console.log(page);
  // console.log(readStatus);
  resetForm();
  closeForm();
}

const inputPop = document.getElementById('add');
inputPop.addEventListener('click', openForm)

const inputHide = document.getElementById('cancel');
inputHide.addEventListener('click', closeForm)

const submit = document.getElementById('submit');
submit.addEventListener('click', addBook);