import { create_icon_based_on_dates } from "./utils.js";

// Export the sidebar display and data management functions
export { empty_sidebar, display_products_in_sidebar };


// Retrieve the products list in the sidebar
let productsList = document.getElementById("productsList");

// Function to completely empty and clean the sidebar containing the list of all products
function empty_sidebar() {
    // Empty the sidebar of products
    productsList.innerHTML = '';
}

// Function to display all the registered products in the sidebar, ordered by date
function display_products_in_sidebar(products) {
    // Empty the sidebar of previously written information/products
    empty_sidebar();

    products.forEach(product => {
        // Create a font-awesome icon based on dates difference between today and current product date
        let icon = create_icon_based_on_dates(product);
        
        // Add the new product to the list of products in the sidebar
        let listItem = document.createElement("li");
        listItem.textContent = ` ${product.aliment} - ${product.type} - ${product.date}`;
        listItem.insertBefore(icon, listItem.firstChild);
        productsList.appendChild(listItem);
    });

    // Sort products by their date (oldest dates in first)
    let items = Array.from(productsList.getElementsByTagName("li"));
    items.sort((a, b) => {
        let dateA = new Date(a.textContent.split(" - ")[2]);
        let dateB = new Date(b.textContent.split(" - ")[2]);
        return dateA - dateB;
    });
    // Reorganize products in the list
    items.forEach(item => productsList.appendChild(item));
}


