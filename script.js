//import { create_icon_based_on_dates } from './utils.js';
import { get_cookie } from './cookies.js';
import { display_products_in_sidebar } from './sidebar.js';
import { display_products_in_boxes } from './boxes.js';
import { load_products_from_cookies, delete_all_products } from './products.js';
//import { checkFormValidity } from './add_product.js';


// Load products on page load
window.onload = function() {
    // Load registered products from cookies, and update the sidebar/boxes
    load_products_from_cookies();
}


// Get the modal
//var add_product_modal = document.getElementById("add_product_modal");

// Get the button that opens the modal
//var addButton = document.getElementById("addButton");

// Sélectionner le bouton de fermeture du modal
//const closeButton = document.querySelector('.close');

// Get the form and submit button
//var add_product_form = document.getElementById("add_product_form");
var submitButton = document.getElementById("submitButton");

// Get the boxes container
/*var viandeRougeBox = document.getElementById("viandeRouge");
var viandeBlancheBox = document.getElementById("viandeBlanche");
var poissonBox = document.getElementById("poisson");
var boissonBox = document.getElementById("boisson");*/

// Gérer le clic sur le bouton Ajouter pour ouvrir le modal
/*addButton.addEventListener('click', function() {
    add_product_modal.style.display = "block"; // Afficher le modal lors du clic sur Ajouter
});*/

// Gérer le clic sur le bouton de fermeture pour fermer le modal
/*closeButton.addEventListener('click', function() {
    add_product_modal.style.display = "none"; // Fermer le modal lors du clic sur le bouton de fermeture
});*/

// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
    if (event.target == add_product_modal) {
        add_product_modal.style.display = "none";
    }
}*/

/*// Function to check if form is valid
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
document.getElementById("date").addEventListener("input", checkFormValidity);*/



// Handle form submission
/*add_product_form.onsubmit = function(event) {
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
    update_sidebar(product);

    // Clear form
    add_product_form.reset();
    checkFormValidity();

    // Close modal
    add_product_modal.style.display = "none";
}*/



// Retrieve the button that permits to delete all products at the same time
const delete_all_products_button = document.getElementById('delete_all_products_button');

// Add an event listener on the delete all products button to call the delete all products function
delete_all_products_button.addEventListener('click', function() {
    // Delete all registered products at the same time
    delete_all_products();
});


