import { create_icon_based_on_dates } from "./utils.js";
import { initialize_deletion_form } from './delete_product.js';

// Export the products categories boxes display and data management functions
export { empty_all_boxes, display_products_in_boxes };


// Retrieve the various boxes that represent categories of products
var viandeRougeBox = document.getElementById("viandeRouge");
var viandeBlancheBox = document.getElementById("viandeBlanche");
var poissonBox = document.getElementById("poisson");
var boissonBox = document.getElementById("boisson");
var fromageBox = document.getElementById("fromage");
var laitageBox = document.getElementById("laitage");
var biscuitsBox = document.getElementById("biscuits");
var aperitifBox = document.getElementById("aperitif");

// Function to completely empty and clean the different categories boxes containing all products
function empty_all_boxes() {
    // Empty the boxes containing the products organized by categories
    const box_contents = document.querySelectorAll('.box-content');
    box_contents.forEach(content => { content.innerHTML = ''; });
}

// Function to display all the registered products in the different categories boxes, ordered by date
function display_products_in_boxes(products) {
    // Empty the sidebar of previously written information/products
    empty_all_boxes();

    products.forEach(product => {

        // Create a font-awesome icon based on dates difference between today and product date
        let icon = create_icon_based_on_dates(product);

        // Determine which category box is the right based on the product type
        let product_type_box;
        switch(product.type) {
            case "Viande rouge":
                product_type_box = viandeRougeBox.getElementsByTagName('ul')[0];
                break;
            case "Viande blanche":
                product_type_box = viandeBlancheBox.getElementsByTagName('ul')[0];
                break;
            case "Poisson":
                product_type_box = poissonBox.getElementsByTagName('ul')[0];
                break;
            case "Boisson":
                product_type_box = boissonBox.getElementsByTagName('ul')[0];
                break;
            case "Fromage":
                product_type_box = fromageBox.getElementsByTagName('ul')[0];
                break;
            case "Laitage":
                product_type_box = laitageBox.getElementsByTagName('ul')[0];
                break;
            case "Biscuits":
                product_type_box = biscuitsBox.getElementsByTagName('ul')[0];
                break;
            case "Apéritif":
                product_type_box = aperitifBox.getElementsByTagName('ul')[0];
                break;
            default:
                console.error(`Type d'aliment non reconnu: ${type}`);
                return;
        }
        
        // Create a new element for the current product and prefix it with the corresponding icon
        var product_element = document.createElement("li");
        product_element.classList.add('box-product-line');
        product_element.innerHTML = ` ${product.aliment} - ${product.date}`;
        product_element.insertBefore(icon, product_element.firstChild);

        // Find the correct position of the current product based on its date and insert it in the category box
        let inserted = false;
        const items = product_type_box.getElementsByTagName('li');
        for(let i=0; i<items.length; i++) {
            const product_date = new Date(product.date);
            const item_date = new Date(items[i].textContent.split(' - ')[1]);
            if(product_date < item_date) {
                product_type_box.insertBefore(product_element, items[i]);
                inserted = true;
                break;
            }
        }
        if (!inserted) { product_type_box.appendChild(product_element); }

        // Retrieve the modal dialog that is hidden by default
        var delete_product_modal = document.getElementById("delete_product_modal");
        product_element.addEventListener('click', function(event) {
            console.log(event);
            initialize_deletion_form(event);
            delete_product_modal.style.display = "block";
        });
    });
}


