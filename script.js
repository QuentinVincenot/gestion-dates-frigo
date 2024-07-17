import { load_products_from_cookies, delete_all_products } from './products.js';


// Load products on page load
window.onload = function() {
    // Load registered products from cookies, and update the sidebar/boxes
    load_products_from_cookies();
}

// Get the submit button
var submitButton = document.getElementById("submitButton");

// Retrieve the button that permits to delete all products at the same time
const delete_all_products_button = document.getElementById('delete_all_products_button');

// Add an event listener on the delete all products button to call the delete all products function
delete_all_products_button.addEventListener('click', function() {
    // Delete all registered products at the same time
    delete_all_products();
});


