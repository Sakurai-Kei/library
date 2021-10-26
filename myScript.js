let myLibrary = [];

function Book(bookValueArray) {
  this.title = bookValueArray[0];
  this.author = bookValueArray[1];
  this.page = bookValueArray[2];
  this.readStatus = bookValueArray[3];
}

function addBookToLibrary() {
  const bookValueArray = getBookValue();
  if(bookValueArray == false){
    resetForm();
    closeForm();
    return alert(`One or more input is wrong/empty. Please made sure that all field are entered and page number field is actually an integer number`);
  }
  const book = new Book(bookValueArray);
  myLibrary.push(book);
  resetForm();
  closeForm();
  initialiseBookListArea();
  displayBook();
  changeReadStatus();
  storeData();
}

function getBookValue(){
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const page = Number(document.getElementById('page').value);
  const readStatus = document.getElementById('readStatus').value;
  console.log(page);
  console.log(typeof page);
  if(title == "" | author == "" | page <= 0 | typeof page != "number" | readStatus == ""){
    return false;
  }
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

function removeEnd() {
  hideConfirmButton();
  enableButtons();
  updateLibraryObject();
  initialiseBookListArea();
  displayBook();
  changeReadStatus();
  storeData();
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
          } 
        } 
      }) 
      initialiseBookListArea();
      displayBook();
      changeReadStatus();
      storeData();
    }) 
  }) 
}

function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  console.log("localStorage is Supported")
}
else {
  // Too bad, no localStorage for us
  console.log("localStorage is Not Supported")
}

function storeData() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function isDataAvailable() {
  if(myLibrary === null){
    myLibrary = [];
    console.log(`No Stored Data from previos sessions`);
  }
  else if(myLibrary.length === 0){
    console.log(`Leftover Empty Object Detected. Clearing localStorage`);
    removeData();
  }
  else{
    console.log(`Stored Data Found. Restoring Data`);
    initialiseBookListArea();
    displayBook();
    changeReadStatus();
  }

}

function retriveData() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
  isDataAvailable();
}

function removeData() {
  localStorage.removeItem("myLibrary");
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

retriveData();