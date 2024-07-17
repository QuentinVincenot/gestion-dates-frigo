import { get_cookie } from "./cookies.js";

// Export the cookies management function to persist data
export { update_sidebar };


// Function to update the sidebar of the application with the newly created product
function update_sidebar(product) {

    let tmp_products = get_cookie("products");
    console.log(tmp_products);

    // Create a font-awesome icon based on dates difference between today and product date
    let icon = create_icon_based_on_dates(product);
    
    // Retrieve the products list in the sidebar
    let alimentsList = document.getElementById("alimentsList");

    // Add the new product to the list
    let listItem = document.createElement("li");
    listItem.textContent = ` ${product.aliment} - ${product.type} - ${product.date}`;
    listItem.insertBefore(icon, listItem.firstChild);
    alimentsList.appendChild(listItem);

    // Sort products by their date (oldest dates in first)
    let items = Array.from(alimentsList.getElementsByTagName("li"));
    items.sort((a, b) => {
        let dateA = new Date(a.textContent.split(" - ")[2]);
        let dateB = new Date(b.textContent.split(" - ")[2]);
        return dateA - dateB;
    });

    // Reorganize products in the list
    items.forEach(item => alimentsList.appendChild(item));
}


