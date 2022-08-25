// GLOBAL VARIABLES
let body = document.querySelector('body');
let libraryContainer = document.getElementById('libraryContainer');
let addBook = document.getElementById('addBook');
let bookData = document.getElementById('bookData');
let closeForm = document.getElementById('closeButton');
let bookTitle = document.getElementById('bookTitle');
let bookAuthor = document.getElementById('bookAuthor');
let pagesRead = document.getElementById('pagesRead');
let totalPages = document.getElementById('totalPages');
let readStatus = document.getElementById('readStatus');
let submit = document.getElementById('submit');

let index = 0;

let myLibrary = [];

// EVENT LISTENERS

addBook.addEventListener('click', function() {
    bookData.style.visibility = 'visible';
})

closeForm.addEventListener('click', function() {
    bookData.style.visibility = 'hidden';
    bookTitle.value = '';
    bookAuthor.value = '';
    pagesRead.value = '';
    totalPages.value = '';
})

submit.addEventListener('click', function(e) {
    let submitReady;
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = pagesRead.value;
    let total = totalPages.value;
    let id = index;
    let progress;
    if (readStatus.checked) {
        progress = true;
    } else {
        progress = false;
    }

    if (title == '' ||
        author == '' ||
        pages == '' ||
        total == '') {
            submitReady = false;
        } else {
            submitReady = true;
        }

    if (submitReady) {
        bookInfo = new Book(title, author, pages, total, progress, id);
        myLibrary.push(bookInfo);
        createEntry();
        bookData.style.visibility = 'hidden';
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
    
function createEntry() {

    let newBook = document.createElement('div');
    let newDiv = document.createElement('h3');
    let newDivTwo = document.createElement('h3');
    let newDivThree = document.createElement('h3');
    let readButton = document.createElement('button');
    let newDelete = document.createElement('button');
    let idNumber = index;
    let markedRead;
    
    newBook.classList.add('library-entry');
    
    // Adds newly created tags to created container
    newBook.appendChild(newDiv);
    newBook.appendChild(newDivTwo);
    newBook.appendChild(newDivThree);
    newBook.appendChild(readButton);
    newBook.appendChild(newDelete);

    // Assigns classes to new divs
    newDiv.classList.add('new-div-one');
    newDivTwo.classList.add('new-div-two');
    newDivThree.classList.add('new-div-three');
    readButton.classList.add('read-button');
    readButton.setAttribute("id", 'readButton' + index);
    newDelete.classList.add('new-delete');
    
    // Adds text to newly created h3 tags
     newDiv.textContent = myLibrary[index].title;
     newDivTwo.textContent = `By: ${myLibrary[index].author}`;
     checkProgress();
     newDivThree.textContent = `Completed ${pagesRead.value} of ${totalPages.value} pages`;
     newDelete.textContent = 'Delete';

     if (pagesRead.value == totalPages.value || readStatus.checked) {
        markedRead = true;
        newBook.classList.add('book-read');
        readButton.classList.add('unread-button');
        readButton.textContent = "Mark Unread";
       
    } else {
        readButton.textContent = "Mark Read";
        newBook.classList.remove('book-read');
        readButton.classList.remove('unread-button');
        markedRead = false;
    }

     libraryContainer.appendChild(newBook);
     index++
     
     readButton.addEventListener('click', function() {
        // Local event listener for 'mark read/unread' button
        
        if (markedRead == false) {
            newBook.classList.add('book-read');
            readButton.classList.add('unread-button');
            readButton.textContent = "Mark Unread";
            markedRead = true;
    
            
        } else {
            newBook.classList.remove('book-read');
            readButton.classList.remove('unread-button');
            readButton.textContent = "Mark Read";
            markedRead = false;
        }

     })
     
     newDelete.addEventListener('click', function() {
        // Local event listener for 'delete' button
        newBook.remove();
        // Removes entry from myLibrary equal to the books idNumber
        myLibrary = myLibrary.filter(book => book.id != idNumber);
        index--
     })
 }

function checkProgress() {
    // Checks readStatus checkbox and changes pagesRead value accordingly
    if (readStatus.checked) {
        pagesRead.value = totalPages.value;
    }
}


// ISSUES TO FIX

// Make mobile-friendly