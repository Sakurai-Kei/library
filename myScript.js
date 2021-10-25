let myLibrary = [];

function Book(bookValueArray) {
  this.title = bookValueArray[0];
  this.author = bookValueArray[1];
  this.page = bookValueArray[2];
  this.readStatus = bookValueArray[3];
}

function addBookToLibrary() {
  const book = new Book(getBookValue());
  myLibrary.push(book);
  resetForm();
  closeForm();
  displayBook();
  changeReadStatus();
}

function getBookValue(){
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const page = document.getElementById('page').value;
  const readStatus = document.getElementById('readStatus').value;
  return [title,author,page,readStatus];
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

function appendBookValue(container,title,author,pageNumber) {
  container.appendChild(title);
  container.appendChild(author);
  container.appendChild(pageNumber);
}

function createBookCard (i){
  const screen = document.getElementById('bookList');
  const div = document.createElement('div');
  div.classList.add('book');
  const bookContainer = screen.appendChild(div);
  const h1 = document.createElement('h1');
  const h3 = document.createElement('h3');
  const divPage = document.createElement('div');
  h1.textContent = myLibrary[i].title;
  h3.textContent = myLibrary[i].author;
  divPage.textContent = `${myLibrary[i].page} pages`;
  switch(myLibrary[i].readStatus){
    case "Yes":
      div.classList.add('read');
      break;
    case "No":
      div.classList.add('notRead');
      break;  
  }
  appendBookValue(bookContainer,h1,h3,divPage);
}

function startFrom() {
  const bookNumber = Array.from(document.querySelectorAll('.book'));
  let i = bookNumber.length - 1;
  if(i < 0){
    i = 0;
  }
  else if(i => 0){
    i++;
  }
  return i;
}

function initialiseBookListArea(){
  const bookListParent = document.getElementById('bookList');
  bookListParent.textContent = "";
}

function displayBook() {
  initialiseBookListArea();
  let i = startFrom();
  for(; i < myLibrary.length; i++){
    createBookCard(i);
  }
}

function showConfirmButton() {
  const confirm = document.getElementById('confirm');
  confirm.style.display = "block";
}

function disableButtons() {
  inputPop.disabled = true;
  remove.disabled = true;
}

function selectBook() {
  const bookList = Array.from(document.querySelectorAll('.book'));
  bookList.forEach(div => {
    div.addEventListener('click', () => {
      div.classList.toggle('highlighted');
    })
  })
}

function removeStart() {
  initialiseBookListArea();
  displayBook();
  showConfirmButton();
  disableButtons();
  selectBook();
}

function hideConfirmButton() {
  const confirm = document.getElementById('confirm');
  confirm.style.display = "none";
}

function enableButtons() {
  remove.disabled = false;
  inputPop.disabled =false;
}

function updateLibraryObject() {
  const toBeRemoved = Array.from(document.querySelectorAll('.highlighted'));
  const toBeRemovedParent = document.getElementById('bookList');
  toBeRemoved.forEach(highlighted => {
    toBeRemovedParent.removeChild(highlighted);
    const removeTitle = highlighted.querySelector('h1').textContent;
    const removeTitleFromObject = myLibrary.filter(book => book.title !== removeTitle);
    myLibrary = removeTitleFromObject;
  })
}

function preventHighlight() {
  // Because somehow, I cannot make removeEventLister work.
  // Attempting to use named function instead result in weird behaviour during removeStart()
  // I'll fix this later if I have new ideas for this.
  const oldBookCards = document.getElementById('bookList');
  const newBookCards = oldBookCards.cloneNode(true);
  oldBookCards.parentNode.replaceChild(newBookCards, oldBookCards);
}

function removeEnd() {
  hideConfirmButton();
  enableButtons();
  updateLibraryObject();
  preventHighlight();
  changeReadStatus();
}

function changeReadStatus() {
  const bookList = Array.from(document.querySelectorAll('.book'));
  bookList.forEach(div => {
    div.addEventListener('click', () => {
      const divTitle = div.querySelector('h1').textContent;
      myLibrary.forEach(book => {
        if(divTitle === book.title){
          switch(book.readStatus){
            case "Yes":
              book.readStatus = "No";
              break;
            case "No":
              book.readStatus = "Yes"
          } // End of Switch
        } // End of if
      }) // End of myLibrary.forEach
      displayBook();
      changeReadStatus();
      console.table(myLibrary);
    }) // End of addEventListener
  }) // End of bookList.forEach
}

const inputPop = document.getElementById('add');
inputPop.addEventListener('click', openForm)

const inputHide = document.getElementById('cancel');
inputHide.addEventListener('click', closeForm)

const submit = document.getElementById('submit');
submit.addEventListener('click', addBookToLibrary);

const remove = document.getElementById('remove');
remove.addEventListener('click', removeStart);

const deleteBooks = document.getElementById('confirm');
deleteBooks.addEventListener('click', removeEnd);