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

function displayBook() {
  const screen = document.getElementById('bookList');
  const bookNumber = Array.from(document.querySelectorAll('.book'));
  let i = bookNumber.length - 1;
  if(i < 0){
    i = 0;
  }
  else if(i => 0){
    i++;
  }
  for(; i < myLibrary.length; i++){
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
    bookContainer.appendChild(h1);
    bookContainer.appendChild(h3);
    bookContainer.appendChild(divPage);
  }
}

function removeStart() {
  const confirm = document.getElementById('confirm');
  confirm.style.display = "block";
  inputPop.disabled = true;
  remove.disabled = true;
  const bookList = Array.from(document.querySelectorAll('.book'));
  bookList.forEach(div => {
    div.addEventListener('click', ()=> {
      div.classList.toggle('highlighted');
    })
  })
}

function removeEnd() {
  const confirm = document.getElementById('confirm');
  confirm.style.display = "none";
  remove.disabled = false;
  inputPop.disabled =false;

  const toBeRemoved = Array.from(document.querySelectorAll('.highlighted'));
  const toBeRemovedParent = document.getElementById('bookList');
  console.log(toBeRemoved);
  toBeRemoved.forEach(highlighted => {
    toBeRemovedParent.removeChild(highlighted);
    const removeTitle = highlighted.querySelector('h1').textContent;
    const removeTitleFromObject = myLibrary.filter(book => book.title !== removeTitle);
    myLibrary = removeTitleFromObject;
  })
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