export { initialize_deletion_form };


// Retrieve the modal dialog that is hidden by default
var delete_product_modal = document.getElementById("delete_product_modal");

// Add an event listener to close the modal dialog when the user clicks anywhere on the outside
window.onclick = function(event) {
    if(event.target == delete_product_modal) {
        delete_product_modal.style.display = "none";
    }
}


function initialize_deletion_form(event) {
    console.log('Target', event.target);
    console.log('Parent', event.target.parentNode);
    console.log('Parent 2', event.target.parentNode.parentNode);
    console.log('Parent 2 ID', event.target.parentNode.parentNode.id);
}


// Retrieve the buttons that closes the modal dialog to add a new product
var close_button = document.getElementById('close_delete_product_modal');

// Add an event listener on the close button to close the modal dialog
close_button.addEventListener('click', function() {
    delete_product_modal.style.display = "none";
});


