import { load_products_from_cookies, delete_all_products } from './products.js';


// Load products on page load
window.onload = function() {
    // Load registered products from cookies, and update the sidebar/boxes
    load_products_from_cookies();
}


// Retrieve the button that permits to delete all products at the same time
const delete_all_products_button = document.getElementById('delete_all_products_button');

// Retrieve the modal dialog that permits the user to confirm before deleting all products
var delete_all_products_modal = document.getElementById("delete_all_products_modal");

// Add an event listener on the delete all products button to call the delete all products function
delete_all_products_button.addEventListener('click', function() {
    // Display the confirmation dialog modal before deleting all products
    delete_all_products_modal.style.display = "block";
});


// Retrieve the various buttons of the delete all products modal dialog
var close_delete_all_modal_button = document.getElementById("close_delete_all_products_modal");
var confirm_delete_all_button = document.getElementById("confirm_delete_all_button");
var cancel_delete_all_button = document.getElementById("cancel_delete_all_button");

// When the user clicks the close button of the modal dialog, close and hide it
close_delete_all_modal_button.addEventListener('click', function() {
    delete_all_products_modal.style.display = "none";
});

// When the user agrees and click 'Oui' option, delete all products and close the modal dialog
confirm_delete_all_button.addEventListener('click', function() {
    // Delete all registered products at the same time
    delete_all_products();

    // Hide the confirmation modal dialog after confirmation and products deletion
    delete_all_products_modal.style.display = "none";
});

// When the user clicks the "Non" button or the close button, close the modal dialog
cancel_delete_all_button.addEventListener('click', function() {
    delete_all_products_modal.style.display = "none";
});


