# Odin Library

A small JavaScript library management project created as part of [The Odin Project](https://www.theodinproject.com/) curriculum. This project demonstrates DOM manipulation, event handling, and dynamic table creation with JavaScript.

## Project Description

This project involves building a library interface where users can add, remove, and manage books. The main goal is to practice JavaScript concepts such as objects, classes, DOM manipulation, event handling, and data-driven UI updates.

## Features

### Book Management

-   Add books with properties like title, author, number of pages, and read status.
-   Toggle the read status of each book.
-   Remove books from the library.

### Dynamic Table Display

-   Books are displayed in a dynamic table with headers generated from object properties.
-   Cells can update individually when a book’s data changes (e.g. read status).

### Form Interaction

-   Uses `<dialog>` for entering new book information.
-   Extracts user form data to build table rows.

### Buttons and Controls

-   Buttons with event listeners for actions like adding books, toggling properties, or deleting books.
-   Supports modular creation of buttons and table elements for maintainable code.

## Learning Objectives

This project demonstrates:

-   **JavaScript Objects & Classes**: Managing book data using constructor functions and methods.
-   **DOM Manipulation**: Dynamically creating table rows, headers, and interactive controls.
-   **Event Handling**: Handling button clicks, form submission, and dialog interactions.
-   **Data-Driven UI**: Updating the interface efficiently when underlying data changes.
-   **Code Organization**: Structuring helper functions, utility functions, and main execution code for readability and maintainability.

## Live Demo

[Odin Library Live Demo](https://jameslafontaine.github.io/odin-library/)

## Future Improvements

-   Make the library fully responsive using CSS Grid or Flexbox.
-   Add persistent storage using `localStorage` so the library persists across sessions.
-   Implement search and filter functionality for easier navigation.
-   Enhance accessibility with ARIA attributes and keyboard navigation support.
-   Further refactor UI creation into more modular, reusable components.
-   Improve UI aesthetics and interactivity for better usability.

## License

This project is for educational purposes and follows The Odin Project curriculum guidelines.
