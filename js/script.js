// =================
// Utility Functions
// =================

// -----------
// Random Helpers
// -----------
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function generateUUID() {
    // Placeholder for UUID generation
    return crypto.randomUUID();
}

// -----------
// DOM Helpers
// -----------
function createElement(tag, classNames = []) {
    const el = document.createElement(tag);
    classNames.forEach(cls => el.classList.add(cls));
    return el;
}

// =================
// Objects / Constructors / Classes
// =================

function Book(id, title, author, pages, readValue) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    // map the string to a more user-friendly representation
    this.read = readValue === "not-read" ? "not read yet" : "already been read";
}

Book.prototype.info = function () {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read;
}

// =================
// Data / State
// =================
const myLibrary = [];


// =================
// Domain-Specific Functions
// =================
function addBookToLibrary(title, author, pages, readValue) {
    let newBook = new Book(generateUUID(), title, author, pages, readValue)
    myLibrary.push(newBook);
    return newBook;
}

function displayAllBooks() {
    for (let book of myLibrary) {
        addTableRow(book, libraryRecords)
    }
}

// =================
// DOM Manipulation Functions
// =================

function populateTableColGroup(obj, colgroup) {

    // Populate the table colgroup with a number of columns corresponding to the number of book properties
    Object.keys(obj).forEach(() => colgroup.appendChild(createElement("col")));
}

function addTableHeader(obj, thead) {
    const newRow = createElement("tr", ["library-head-row"]);

    // Fill out the table header with headings
    let newCell = undefined;

    for (let key of Object.keys(obj)) {
        newCell = createElement("th", ["library-head-cell"]);
        newCell.setAttribute("scope", "col");
        newCell.textContent = capitalizeFirstLetter(key);
        newRow.appendChild(newCell);
    }

    thead.appendChild(newRow);
}

function addTableRow(obj, tbody) {
    const newRow = createElement("tr", ["library-record"]);
    let newCell = undefined;

    for (let value of Object.values(obj)) {
        newCell = createElement("td", ["library-cell"]);
        newCell.textContent = value;
        newRow.appendChild(newCell);
    }

    tbody.appendChild(newRow);
}

// =================
// Main Execution Block / Script Body
// =================
const libraryTable = document.querySelector(".library-table");
const libraryColGroup = document.querySelector(".library-table colgroup")
const libraryHead = document.querySelector(".library-head")
const libraryRecords = document.querySelector(".library-records");

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, "not-read");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 320, "has-read");
addBookToLibrary("Of Mice and Men", "John Steinbeck", 107, "has-read");

if (myLibrary.length > 0) {
    populateTableColGroup(myLibrary[0], libraryColGroup);
    addTableHeader(myLibrary[0], libraryHead);
    displayAllBooks();
}

const newBookDialog = document.querySelector(".new-book-dialog");
const newBookButton = document.querySelector(".new-book-btn");
const closeButton = document.querySelector(".close-btn");

newBookButton.addEventListener("click", () => {
    newBookDialog.showModal()
})

closeButton.addEventListener("click", () => {
    newBookDialog.close();
})

const form = document.querySelector(".new-book-form");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop default page reload

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // { title: "...", author: "..." }

    // Call your domain-specific function
    addTableRow(addBookToLibrary(data.title, data.author, data.pages, data.read), libraryRecords);

    form.reset();
    newBookDialog.close();

}); 
