// =================
// Constants
// =================
const HAS_READ = "already been read";
const NOT_READ = "not read yet";

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
function createElement(tag, classNames = [], textContent = "") {
    const el = document.createElement(tag);
    classNames.forEach(cls => el.classList.add(cls));
    el.textContent = textContent;
    return el;
}

function createButton(classNames = [], textContent = "", onClick) {
    const btn = createElement("button", classNames, textContent)
    btn.addEventListener("click", onClick);
    return btn;
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
    this.read = readValue === "not-read" ? NOT_READ : HAS_READ;
}

Book.prototype.toggleRead = function () {
    this.read === NOT_READ ? this.read = HAS_READ : this.read = NOT_READ;
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

function removeBookFromLibrary(id) {
    for (let i in myLibrary) {
        if (myLibrary[i].id === id) {
            myLibrary.splice(i, 1);
            removeTableRow(id);
        }
    }
}

// =================
// DOM Manipulation Functions
// =================

function populateTableColGroup(obj, colgroup) {

    // Populate the table colgroup with a number of columns corresponding to the number of book properties
    Object.keys(obj).forEach((key) => colgroup.appendChild(createElement("col", [`${key}-column`])));

    // Append extra column for the action buttons
    colgroup.appendChild(createElement("col", ["action-column"]));
}

function addTableHeader(obj, thead) {
    const newRow = createElement("tr", ["library-head-row"]);

    // Fill out the table header with headings
    let newCell = undefined;

    for (let key of Object.keys(obj)) {
        newCell = createElement("th", ["library-head-cell"], capitalizeFirstLetter(key));
        newCell.setAttribute("scope", "col");
        newRow.appendChild(newCell);
    }

    // Append extra cell for the action buttons
    newCell = createElement("th");
    newCell.setAttribute("scope", "col");
    newRow.appendChild(newCell);

    thead.appendChild(newRow);
}

function addTableRow(obj, tbody) {
    const newRow = createElement("tr", ["library-record"]);
    newRow.setAttribute("data-id", obj.id);
    let newCell = undefined;

    for (let [key, value] of Object.entries(obj)) {
        newCell = createElement("td", [`${key}-cell`, "library-cell"], value);
        newRow.appendChild(newCell);
    }

    // Append extra cell for the action buttons and set up event listeners
    newCell = createElement("td", ["action-cell"]);

    const toggleReadButton = createButton(
        ["toggle-read-btn"],
        "Toggle Read",
        () => {
            obj.toggleRead();
            updateTableCell(obj, "read");
        }
    );

    const deleteBookButton = createButton(
        ["delete-book-btn"],
        "Delete Book",
        () => removeBookFromLibrary(obj.id)
    );

    newCell.appendChild(toggleReadButton);
    newCell.appendChild(deleteBookButton);
    newRow.appendChild(newCell);

    tbody.appendChild(newRow);
}

function updateTableCell(obj, colName) {
    const rowToUpdate = document.querySelector(`[data-id="${obj.id}"]`);
    rowToUpdate.querySelector(`.${colName}-cell`).textContent = obj[`${colName}`];
}

function removeTableRow(id) {
    const recordToRemove = document.querySelector(`[data-id="${id}"]`);
    recordToRemove.remove();
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

