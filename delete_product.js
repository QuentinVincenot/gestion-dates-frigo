import { get_cookie, set_cookie } from "./cookies.js";
import { display_products_in_sidebar } from "./sidebar.js";
import { display_products_in_boxes } from "./boxes.js";

export { initialize_deletion_form };


// Retrieve the modal dialog that is hidden by default
var delete_product_modal = document.getElementById("delete_product_modal");

// Add an event listener to close the modal dialog when the user clicks anywhere on the outside
window.onclick = function(event) {
    if(event.target == delete_product_modal.children[0]) {
        delete_product_modal.style.display = "none";
    }
}


function initialize_deletion_form(event) {
    console.log('Target', event.target);
    console.log('Parent', event.target.parentNode);
    console.log('Parent 2', event.target.parentNode.parentNode);
    console.log('Parent 2 ID', event.target.parentNode.parentNode.id);

    let box_product_line = event.target.innerHTML.split('</i> ')[1];
    let product_info = box_product_line.split(' - ');
    console.log('Content', product_info[0], product_info[1]);

    let product_to_delete_type = event.target.parentNode.parentNode.children[0].innerText;
    console.log('Type', product_to_delete_type);

    document.getElementById('aliment_to_delete').value = product_info[0];
    document.getElementById('type_aliment_to_delete').value = product_to_delete_type;
    document.getElementById('date_aliment_to_delete').value = product_info[1];
}


// Retrieve the buttons that closes the modal dialog to add a new product
var close_button = document.getElementById('close_delete_product_modal');

// Add an event listener on the close button to close the modal dialog
close_button.addEventListener('click', function() {
    delete_product_modal.style.display = "none";
});




// Retrieve the submission form of the product addition dialog
var delete_product_form = document.getElementById("delete_product_form");

// Add an event listener on the submission event of the add product form in the dialog
delete_product_form.onsubmit = function(event) {
    event.preventDefault();

    let product_name = document.getElementById('aliment_to_delete').value;
    let product_type = document.getElementById('type_aliment_to_delete').value;
    let product_date = document.getElementById('date_aliment_to_delete').value;
    let product_date_cast = new Date(product_date).toISOString().split('T')[0];
    let deleted_product = { 'aliment': product_name, 'type': product_type, 'date': product_date_cast };

    // Get current products from cookies
    let products = get_cookie("products");
    if (products) {
        products = JSON.parse(products);
    } else {
        products = [];
    }



    // Find the product to delete and delete it from the list of registered products
    console.log('Products before deletion', products);
    console.log('Find');
    let found_object = products.find((p) => {
        return (p.aliment === deleted_product.aliment) && (p.type === deleted_product.type) && (p.date === deleted_product.date);
    });
    console.log('Found object', found_object);
    products = products.filter((p) => {
        return (p.aliment != deleted_product.aliment) || (p.type != deleted_product.type) || (p.date != deleted_product.date);
    });
    console.log('Products after deletion', products);

    // Save updated products to cookies
    set_cookie("products", JSON.stringify(products), 30);

    // Update the products list on the left in the sidebar 
    display_products_in_sidebar(products);

    //  Update the products list in the categories boxes at the center
    display_products_in_boxes(products);


    /*let index_of_deleted_product = products.indexOf(deleted_product);
    console.log('IndexOf', index_of_deleted_product);


    if(index_of_deleted_product != -1) {
        delete products[index_of_deleted_product];

        // Save updated products to cookies
        set_cookie("products", JSON.stringify(products), 30);

        // Update the products list on the left in the sidebar 
        display_products_in_sidebar(products);

        //  Update the products list in the categories boxes at the center
        display_products_in_boxes(products);
    }*/

    // Close the modal dialog at the end of the product deletion submission
    delete_product_modal.style.display = "none";
}


