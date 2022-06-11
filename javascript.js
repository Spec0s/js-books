//-----------------------------------------Page Start-----------------------------------------//
// window.onload = function() {
//   };


//-----------------------------------------variales-----------------------------------------//
var titleInput = document.getElementById("title")
var authorInput = document.getElementById("author")
var pagesInput = document.getElementById("pages")
var bookShelf = document.getElementById("book-shelf")
var bookStatus = document.getElementById("status-id")
var body = document.getElementById("body")
var myForm = document.getElementById("myForm")
var openButton = document.getElementById("open-button")
var closeButton = document.getElementById("close-button")
open = false
//-----------------------------------------ADD book code-----------------------------------------//
let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = function () {
        if (status === true) {
            return `style="filter:invert(89%) sepia(36%) saturate(910%) hue-rotate(25deg) brightness(96%) contrast(87%)"`
        } else if (status === false) {
            return `style="filter: invert(30%) sepia(42%) saturate(3516%) hue-rotate(341deg) brightness(85%) contrast(103%)"`
        }
    }
    this.info = function () {
        return `${this.title} is a book by ${this.author}, ${this.pages} pages.`
    };
}

function createBookCard(myLib, bookView) {
    bookView.innerHTML = "";
    myLib.forEach((book, i) => {
        const card = `<div class="book-card" data-index=${i}>
    
         <h2>${book.title}</h2>
         <h3>${book.author}</h3>
          <h4>${book.pages} Pages</h4>
          <p>${book.info()}</p>
          <div class="book-card-end">
          <div class="tooltip">
            <img class="book-icon" ${book.status()} src="./pictues/read.svg" alt="book read icon">
            <span class="tooltiptext">Toggle read</span>
            </div>
              <img class="delete-book" src="./pictues/trash.svg" alt="trash">
              </div>
    
</div>`
        const element = document.createElement('div');
        element.innerHTML = card;
        bookView.appendChild(element.firstChild);
    })
    titleInput.value = ""
    authorInput.value = ""
    pagesInput.value = ""


}

function addBookToLibrary(e) {
    if (titleInput.value == "" || authorInput.value== "" || pagesInput.value=="" ) {
        return
    } else {
        newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, bookStatus.checked)
        myLibrary.push(newBook)
        createBookCard(myLibrary, bookShelf)
        console.table(myLibrary)
        closeForm()
        bookStatus.checked = false
    }
}
//-----------------------------------------Form open/close-----------------------------------------//
function openForm(){
    body.classList.add("body-blur")
    myForm.style.display = "block";
    open = true
}

function closeForm(){
    body.classList.remove("body-blur")
    myForm.style.display = "none";
    open=false
}

document.addEventListener("click", function (e) {
    var closeIfOutside = myForm.contains(e.target)
    console.log(closeIfOutside)
    var ifClosed = openButton.contains(e.target)
    var ifOpen = closeButton.contains(e.target)
    console.log(ifOpen)
    if (ifClosed && open === false) {
        openForm()
    } else if (!closeIfOutside && open === true|| ifOpen) {
        closeForm()
    }
})
//-----------------------------------------Button actions-----------------------------------------//


var bookDelete = document.querySelector("#book-shelf")
bookDelete.addEventListener("click", function (e) {
    if (e.target.closest(".book-icon")) { //-----------------------------------------book read toggle
        if (e.target.style.filter == "invert(30%) sepia(42%) saturate(3516%) hue-rotate(341deg) brightness(85%) contrast(103%)") {
            e.target.style.filter = 'invert(89%) sepia(36%) saturate(910%) hue-rotate(25deg) brightness(96%) contrast(87%)';
        } else if (e.target.style.filter == "invert(89%) sepia(36%) saturate(910%) hue-rotate(25deg) brightness(96%) contrast(87%)") {
            e.target.style.filter = "invert(30%) sepia(42%) saturate(3516%) hue-rotate(341deg) brightness(85%) contrast(103%)"
        }
    }
    if (e.target.classList.contains('delete-book')) {
        let answer = confirm("You want to delete you book?")
        if (answer === true) {
            removeBook = Number(e.target.parentElement.parentElement.attributes[1].value)
            removeBookDiv = e.target.parentElement.parentElement
            myLibrary.splice(removeBook, 1);
            removeBookDiv.parentElement.removeChild(removeBookDiv)
            createBookCard(myLibrary, bookShelf)
        } else {
            return
        }

    }
})



