let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary(title,author,page,status) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.status = status;
}

function openForm() {
  document.getElementById('modal').style.display = 'flex';
}

function closeForm() {
  document.getElementById('modal').style.display = 'none';
}

const inputPop = document.getElementById('add');
inputPop.addEventListener('click', openForm)

const inputHide = document.getElementById('cancel');
inputHide.addEventListener('click', closeForm)