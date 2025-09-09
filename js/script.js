// =================
// Data / State
// =================
const myLibrary = [];

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

function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    read === false ? this.read = "not read yet" : this.read = "already been read"
}

Book.prototype.info = function () {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + read;
}

// =================
// Domain-Specific Functions
// =================
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(generateUUID(), title, author, pages, read));
}

function displayAllBooks() {
    for (let book of myLibrary) {
        addTableRow(book, libraryRecords)
    }
}

// =================
// DOM Manipulation Functions
// =================


function addTableHeader(obj, thead, table) {
    const newRow = createElement("tr", ["library-head-row"]);
    const newColGroup = createElement("colgroup");

    // Append a sufficient length colgroup to the table
    Object.keys(obj).forEach(() => newColGroup.appendChild(createElement("col")));
    table.insertBefore(newColGroup, table.firstChild);

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
const libraryHead = document.querySelector(".library-head")
const libraryRecords = document.querySelector(".library-records");

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 320, true);
addBookToLibrary("Of Mice and Men", "John Steinbeck", 107, true);

if (myLibrary.length > 0) {
    addTableHeader(myLibrary[0], libraryHead, libraryTable)
    displayAllBooks();
}
