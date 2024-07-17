import { get_cookie, set_cookie } from "./cookies.js";
import { display_products_in_sidebar } from './sidebar.js';

export { checkFormValidity };


// Retrieve the modal dialog that is hidden by default
var add_product_modal = document.getElementById("add_product_modal");

// Add an event listener to close the modal dialog when the user clicks anywhere on the outside
window.onclick = function(event) {
    if(event.target == add_product_modal) {
        add_product_modal.style.display = "none";
    }
}


// Retrieve the buttons that opens/closes the modal dialog to add a new product
var add_product_button = document.getElementById("add_product_button");
var close_button = document.getElementById('close_add_product_modal');

// Add an event listener on the add product button to open the modal dialog
add_product_button.addEventListener('click', function() {
    add_product_modal.style.display = "block";
});

// Add an event listener on the close button to close the modal dialog
close_button.addEventListener('click', function() {
    add_product_modal.style.display = "none";
});


// Retrieve the submission form of the product addition dialog
var add_product_form = document.getElementById("add_product_form");

// Add an event listener on the submission event of the add product form in the dialog
add_product_form.onsubmit = function(event) {
    event.preventDefault();
    let aliment = document.getElementById("aliment").value;
    let type = document.getElementById("type").value;
    let date = document.getElementById("date").value;

    let product = { aliment, type, date };

    // Get current products from cookies
    let products = get_cookie("products");
    if (products) {
        products = JSON.parse(products);
    } else {
        products = [];
    }

    // Add new product to the list
    products.push(product);

    // Save updated products to cookies
    set_cookie("products", JSON.stringify(products), 30);

    // Add the created product to the appropriate category box
    addProductBox(product);
    // Update the products list on the left in the sidebar 
    display_products_in_sidebar(products);

    // Clear form
    add_product_form.reset();
    checkFormValidity();

    // Close the modal dialog at the end of the product addition submission
    add_product_modal.style.display = "none";
}

// Function to check if form is valid
function checkFormValidity() {
    var aliment = document.getElementById("aliment").value;
    var date = document.getElementById("date").value;
    if (aliment && date) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// Attach event listeners to form inputs
document.getElementById("aliment").addEventListener("input", checkFormValidity);
document.getElementById("date").addEventListener("input", checkFormValidity);


