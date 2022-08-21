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
let markedRead

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
    let id = index
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
        bookInfo = new Book(title, author, pages, total, progress, id);
        myLibrary.push(bookInfo);
        console.log(myLibrary); // Remember to remove
        createEntry()
        bookData.style.visibility = 'hidden'
    }
})

// CONSTRUCTOR

function Book(title, author, pages, total, progress, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.total = total;
    this.progress = progress;
    this.id = id;
}

// FUNCTIONS

function addBookToLibrary() {}
    
function createEntry() {

    let newBook = document.createElement('div');
    let newDiv = document.createElement('h3')
    let newDivTwo = document.createElement('h3')
    let newDivThree = document.createElement('h3')
    let readButton = document.createElement('button')

    newBook.classList.add('library-entry');
    
    // Adds newly created tags to created container
    newBook.appendChild(newDiv)
    newBook.appendChild(newDivTwo)
    newBook.appendChild(newDivThree)
    newBook.appendChild(readButton)

    // Assigns classes to new divs
    newDiv.classList.add('new-div-one')
    newDivTwo.classList.add('new-div-two')
    newDivThree.classList.add('new-div-three')
    readButton.classList.add('read-button')
    readButton.setAttribute("id", 'readButton' + index)
    
    // Adds text to newly created h3 tags
     
     newDiv.textContent = myLibrary[index].title;
     newDivTwo.textContent = `Illustrated By: ${myLibrary[index].author}`;
     checkProgress()
     newDivThree.textContent = `Completed ${pagesRead.value} of ${totalPages.value} pages`;
     isRead(newBook, readButton)
     
     libraryContainer.appendChild(newBook)
     index ++
     
     readButton.addEventListener('click', function() {
        //  Local event listener for read/unread button
        newBook.classList.toggle('book-read')
        readButton.classList.toggle('unread-button')

        if (markedRead) {
            readButton.textContent = "Mark Unread"
            markedRead = false
        } else {
            readButton.textContent = "Mark Read"
            pagesRead.value = 0
            markedRead = true
        }
     })  
 }

 function isRead(book, button) {
    // Checks whether or not book has been completed; changes styling of book entry accordingly
    if (pagesRead.value == totalPages.value || readStatus.checked) {
        markedRead = false
        book.classList.add('book-read')
        button.classList.add('unread-button')
        button.textContent = "Mark Unread"
    } else {
        button.textContent = "Mark Read"
        markedRead = true
    }
}

function checkProgress() {
    // Checks readStatus checkbox and changes pagesRead value accordingly
    if (readStatus.checked) {
        pagesRead = totalPages
    }
}

// Find a way to update the value or pagesRead when readStatus is checked