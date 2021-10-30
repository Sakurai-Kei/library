class Book {
  constructor(bookValueArray){
    this.title = bookValueArray[0];
    this.author = bookValueArray[1];
    this.page = bookValueArray[2];
    this.readStatus = bookValueArray[3];
  }
  set title(title) {
    this._title = title;
  }
  set author(author) {
    this._author = author;
  }
  set page(page) {
    this._page = page;
  }
  set readStatus(readStatus) {
    this._readStatus = readStatus;
  }

  get title() {
    return this._title;
  }
  get author() {
    return this._author;
  }
  get page() {
    return this._page;
  }
  get readStatus() {
    return this._readStatus;
  }
}

const storageModule = (() => {
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
    localStorage.setItem("myLibrary", JSON.stringify(addBookToLibrary.getMyLibrary()));
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
      // bookDisplay.initialiseBookListArea();
      // bookDisplay.displayBook();
      // bookDisplay.changeReadStatus();
    }
  }
  function retriveData() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
    isDataAvailable();
    return myLibrary;
  }
  
  function removeData() {
    localStorage.removeItem("myLibrary");
  }
  return {storeData, retriveData};
})();

const addBookToLibrary = (() => {
  let myLibrary = storageModule.retriveData();
  function getMyLibrary() {
    return myLibrary;
  }
  function getBookValue() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const page = Number(document.getElementById('page').value);
  const readStatus = document.getElementById('readStatus').value;
  if(title == "" | author == "" | page <= 0 | typeof page != "number" | readStatus == ""){
    return false;
  }
  return [title,author,page,readStatus];
  }
  function makeBook() {
  const bookValueArray = getBookValue();
  if(bookValueArray == false){
    buttons.resetForm();
    buttons.closeForm();
    return alert(`One or more input is wrong/empty. Please made sure that all field are entered and page number field is actually an integer number`);
  }
  const book = new Book(bookValueArray);
  myLibrary.push(book);
  buttons.resetForm();
  buttons.closeForm();
  bookDisplay.initialiseBookListArea();
  bookDisplay.displayBook();
  bookDisplay.changeReadStatus();
  storageModule.storeData();
  }
  function updateLibraryObject() {
    const toBeRemoved = Array.from(document.querySelectorAll('.highlighted'));
    const toBeRemovedParent = document.getElementById('bookList');
    toBeRemoved.forEach(highlighted => {
      toBeRemovedParent.removeChild(highlighted);
      const removeTitle = highlighted.querySelector('h1').textContent;
      const removeTitleFromObject = addBookToLibrary.getMyLibrary().filter(book => book._title !== removeTitle);
      return myLibrary = removeTitleFromObject;
    })
  }
  return {getMyLibrary, makeBook, updateLibraryObject};
})();

const bookDisplay = (() => {
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
    h1.textContent = addBookToLibrary.getMyLibrary()[i]._title;
    h3.textContent = addBookToLibrary.getMyLibrary()[i]._author;
    divPage.textContent = `${addBookToLibrary.getMyLibrary()[i]._page} pages`;
    switch(addBookToLibrary.getMyLibrary()[i]._readStatus){
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
    for(; i < addBookToLibrary.getMyLibrary().length; i++){
      createBookCard(i);
    }
  }
  function changeReadStatus() {
    const bookList = Array.from(document.querySelectorAll('.book'));
    bookList.forEach(div => {
      div.addEventListener('click', () => {
        const divTitle = div.querySelector('h1').textContent;
        addBookToLibrary.getMyLibrary().forEach(book => {
          if(divTitle === book._title){
            switch(book._readStatus){
              case "Yes":
                book._readStatus = "No";
                break;
              case "No":
                book._readStatus = "Yes";
                break;
            } 
          } 
        }) 
        initialiseBookListArea();
        displayBook();
        changeReadStatus();
        storageModule.storeData();
      }) 
    }) 
  }
  if(addBookToLibrary.getMyLibrary() !== null){
    initialiseBookListArea();
    displayBook();
    changeReadStatus();
  }

  return {initialiseBookListArea, displayBook, changeReadStatus};
})();

const removeBooksFromLibrary = (() => {
  function selectBook() {
    const bookList = Array.from(document.querySelectorAll('.book'));
    bookList.forEach(div => {
      div.addEventListener('click', () => {
        div.classList.toggle('highlighted');
      })
    })
  }
  function removeStart() {
    bookDisplay.initialiseBookListArea();
    bookDisplay.displayBook();
    buttons.showConfirmButton();
    buttons.disableButtons();
    selectBook();
  }
  function removeEnd() {
    buttons.hideConfirmButton();
    buttons.enableButtons();
    addBookToLibrary.updateLibraryObject();
    bookDisplay.initialiseBookListArea();
    bookDisplay.displayBook();
    bookDisplay.changeReadStatus();
    storageModule.storeData();
  }
  return {removeStart, removeEnd};
})();


const buttons = (() => {
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
  function disableButtons() {
    inputPop.disabled = true;
    remove.disabled = true;
  }
  function hideConfirmButton() {
    const confirm = document.getElementById('confirm');
    confirm.style.display = "none";
  }
  function enableButtons() {
    remove.disabled = false;
    inputPop.disabled =false;
  }
  function showConfirmButton() {
    const confirm = document.getElementById('confirm');
    confirm.style.display = "block";
  }
  function tutorialStart() {
    document.getElementById('modalTutorial').style.display = 'flex';
  }
  function tutorialEnd() {
    document.getElementById('modalTutorial').style.display = 'none';
  
  }

  const inputPop = document.getElementById('add');
  inputPop.addEventListener('click', openForm)
  
  const inputHide = document.getElementById('cancel');
  inputHide.addEventListener('click', closeForm)
  
  const submit = document.getElementById('submit');
  submit.addEventListener('click', addBookToLibrary.makeBook);
  
  const remove = document.getElementById('remove');
  remove.addEventListener('click', removeBooksFromLibrary.removeStart);
  
  const deleteBooks = document.getElementById('confirm');
  deleteBooks.addEventListener('click', removeBooksFromLibrary.removeEnd);
  
  const tutorial = document.getElementById('tutorial');
  tutorial.addEventListener('click', tutorialStart);
  
  const exitTutorial = document.getElementById('exit');
  exitTutorial.addEventListener('click', tutorialEnd);

  return {showConfirmButton, resetForm, closeForm, disableButtons, enableButtons, hideConfirmButton};
})();