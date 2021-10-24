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
  const removeState = document.getElementById('remove');
  removeState.setAttribute('id', 'removeOn');
  const bookList = Array.from(document.querySelectorAll('.book'));
  bookList.forEach(div => {
    div.addEventListener('click', ()=> {
      div.classList.toggle('highlighted');
    })
  })
  removeState.addEventListener('click', () => {
    const toBeRemoved = Array.from(document.querySelectorAll('.highlighted'));
    removeState.addEventListener('click', () => {
      toBeRemoved.forEach(highlighted => {
        document.getElementById('bookList').removeChild(highlighted)
      })
      removeState.setAttribute('id', 'remove');
    })
  })
  console.log('ends')
}

const inputPop = document.getElementById('add');
inputPop.addEventListener('click', openForm)

const inputHide = document.getElementById('cancel');
inputHide.addEventListener('click', closeForm)

const submit = document.getElementById('submit');
submit.addEventListener('click', addBookToLibrary);

const remove = document.getElementById('remove');
remove.addEventListener('click', removeStart);