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
  document.getElementById('inputHidden').setAttribute('id', 'input');
}

function closeForm() {
  document.getElementById('input').setAttribute('id', 'inputHidden');

}

const inputPop = document.getElementById('add');
inputPop.addEventListener('click', openForm)

const inputHide = document.getElementById('cancel');
inputHide.addEventListener('click', closeForm)