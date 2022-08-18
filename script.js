// GLOBAL VARIABLES
let body = document.querySelector('body')
let libraryContainer = document.getElementById('libraryContainer')

let addBook = document.getElementById('addBook')
let bookData = document.getElementById('bookData')
let closeForm = document.getElementById('closeButton')
let bookTitle = document.getElementById('bookTitle')
let bookAuthor = document.getElementById('bookAuthor')
let pagesRead = document.getElementById('pagesRead')
let totalPages = document.getElementById('totalPages')
let readStatus = document.getElementById('readStatus')
let submit = document.getElementById('submit')

let index = 0
let pauseSubmit = true

let myLibrary = []

// EVENT LISTENERS

addBook.addEventListener('click', function() {
    bookData.style.visibility = 'visible'
})

closeForm.addEventListener('click', function() {
    bookData.style.visibility = 'hidden'
    bookTitle.value = '';
    bookAuthor.value = '';
    pagesRead.value = '';
    totalPages.value = '';
})

submit.addEventListener('click', function(e) {
    let submitReady
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = pagesRead.value;
    let total = totalPages.value;
    if (readStatus.checked) {
        progress = true;
    } else {
        progress = false
    }

    if (title == '' ||
        author == '' ||
        pages == '' ||
        total == '') {
            submitReady = false
        } else {
            submitReady = true
        }

    if (submitReady) {
        bookInfo = new Book(title, author, pages, total, progress);
        myLibrary.push(bookInfo);
        console.log(myLibrary);
        addBookToLibrary();
        
    }
})

// CONSTRUCTOR

function Book(title, author, pages, total, progress) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.total = total;
    this.progress = progress;
}

// FUNCTIONS

function addBookToLibrary() {
    
    let newBook = document.createElement('div');
    let newDiv = document.createElement('h3')
    let newDivTwo = document.createElement('h3')
    let newDivThree = document.createElement('h3')
    // let newDivFour = document.createElement('h3')

    newBook.classList.add('library-entry');
    
    // Adds newly created tags to created container
    newBook.appendChild(newDiv)
    newBook.appendChild(newDivTwo)
    newBook.appendChild(newDivThree)
    // newBook.appendChild(newDivFour)

    // Assigns classes to new divs
    newDiv.classList.add('new-div-one')
    newDivTwo.classList.add('new-div-two')
    newDivThree.classList.add('new-div-three')
    // newDivFour.classList.add('new-div-four')

    // Adds text to newly created h3 tags
    newDiv.textContent = myLibrary[index].title;
    newDivTwo.textContent = `Illustrated By: ${myLibrary[index].author}`;
    newDivThree.textContent = `Completed ${myLibrary[index].pages} of ${myLibrary[index].total} pages`;
    // newDivFour.textContent = myLibrary[index].total;

    libraryContainer.appendChild(newBook)
    index += 1
}



