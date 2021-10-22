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

const inputPop = document.getElementById('add');
inputPop.addEventListener('click', () => {
  document.getElementById('inputHidden').setAttribute('id', 'input');
})

const inputHide = document.getElementById('cancel');
inputHide.addEventListener('click', () => {
  document.getElementById('input').setAttribute('id', 'inputHidden');
})