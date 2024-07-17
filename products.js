import { /*update_sidebar,*/ display_products_in_sidebar, empty_sidebar } from "./sidebar.js";
import { get_cookie, reset_all_cookies } from "./cookies.js";

// Export the delete all products method to delete all registered products at once
export { load_products_from_cookies, delete_all_products };


// Function to load all existing products that were registered in cookies
function load_products_from_cookies() {
    // Retrieve products information from the registered cookies
    let products = get_cookie("products");
    if (products) {
        // Parse the retrieved JSON information about the registered products
        products = JSON.parse(products);
        
        // Display the retrieved products in the various boxes of categories
        // display_products_in_boxes(products);

        // Display the retrieved products in the sidebar
        display_products_in_sidebar(products);
    }
}

// Function to delete all products that were registered (in boxes, sidebar and cookies)
function delete_all_products() {
    // Empty the boxes containing the products organized by categories
    const box_contents = document.querySelectorAll('.box-content');
    box_contents.forEach(content => { content.innerHTML = ''; });

    // Empty the sidebar containing the list of products
    empty_sidebar();

    // Empty all cookies information
    reset_all_cookies();
}


