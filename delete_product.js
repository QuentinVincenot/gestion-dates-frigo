


// Retrieve the modal dialog that is hidden by default
var delete_product_modal = document.getElementById("delete_product_modal");

// Add an event listener to close the modal dialog when the user clicks anywhere on the outside
window.onclick = function(event) {
    if(event.target == delete_product_modal) {
        delete_product_modal.style.display = "none";
    }
}


// Empty the boxes containing the products organized by categories
const box_products_lines = document.querySelectorAll('.box-product-line');
box_products_lines.forEach(box_product_line => {
    box_product_line.addEventListener('click', function(event) {
        console.log(event);
        delete_product_modal.style.display = "block";
    });
});





// Retrieve the buttons that closes the modal dialog to add a new product
var close_button = document.getElementById('close_delete_product_modal');

// Add an event listener on the close button to close the modal dialog
close_button.addEventListener('click', function() {
    delete_product_modal.style.display = "none";
});


