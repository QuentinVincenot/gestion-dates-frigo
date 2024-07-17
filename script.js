import { create_icon_based_on_dates } from './utils.js';
import { get_cookie, set_cookie, reset_all_cookies } from './cookies.js';
import { update_sidebar } from './sidebar.js';


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var addButton = document.getElementById("addButton");

// Sélectionner le bouton de fermeture du modal
const closeButton = document.querySelector('.close');

// Get the form and submit button
var form = document.getElementById("productForm");
var submitButton = document.getElementById("submitButton");

// Get the boxes container
var viandeRougeBox = document.getElementById("viandeRouge");
var viandeBlancheBox = document.getElementById("viandeBlanche");
var poissonBox = document.getElementById("poisson");
var boissonBox = document.getElementById("boisson");

// Gérer le clic sur le bouton Ajouter pour ouvrir le modal
addButton.addEventListener('click', function() {
    modal.style.display = "block"; // Afficher le modal lors du clic sur Ajouter
});

// Gérer le clic sur le bouton de fermeture pour fermer le modal
closeButton.addEventListener('click', function() {
    modal.style.display = "none"; // Fermer le modal lors du clic sur le bouton de fermeture
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
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



// Function to add product box to the DOM
function addProductBox(product) {
    // Create a font-awesome icon based on dates difference between today and product date
    let icon = create_icon_based_on_dates(product);

    // Ajouter la boîte au bon conteneur en fonction du type de produit
    let product_type_box;
    switch (product.type) {
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
        default:
            console.error(`Type d'aliment non reconnu: ${type}`);
            return;
    }

    var box = document.createElement("li");
    box.innerHTML = ` ${product.aliment} - ${product.date}`;
    box.insertBefore(icon, box.firstChild);
    console.log(box.innerHTML);

    // Trouver la position correcte pour insérer le nouvel aliment trié
    let inserted = false;
    const items = product_type_box.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
        const itemDate = new Date(items[i].textContent.split(' - ')[1]);
        if (productDate < itemDate) {
            product_type_box.insertBefore(box, items[i]);
            inserted = true;
            break;
        }
    }
    if (!inserted) {
        product_type_box.appendChild(box);
    }
}

// Fonction pour trier les produits par date la plus ancienne
function sortByDateAscending(products) {
    return products.sort((a, b) => new Date(a.date) - new Date(b.date));
}



// Handle form submission
form.onsubmit = function(event) {
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
    form.reset();
    checkFormValidity();

    // Close modal
    modal.style.display = "none";
}

// Fonction pour supprimer tous les produits
function deleteAllProducts() {
    // Vider les listes des boîtes centrales
    const boxContents = document.querySelectorAll('.box-content');
    boxContents.forEach(content => {
        content.innerHTML = '';
    });

    // Vider la barre latérale
    const alimentsList = document.getElementById('alimentsList');
    alimentsList.innerHTML = '';

    // Empty all cookies information
    reset_all_cookies();
}

// Sélectionner le bouton "Tout supprimer"
const deleteButton = document.getElementById('deleteButton');

// Écouter l'événement de clic sur le bouton "Tout supprimer"
deleteButton.addEventListener('click', function() {
    // Appeler la fonction pour supprimer tous les produits
    deleteAllProducts();
});

// Load products on page load
window.onload = function() {
    loadProducts();
}

// Load saved products from cookies
function loadProducts() {
    let products = get_cookie("products");
    if (products) {
        products = JSON.parse(products);
        // Ajouter chaque produit à la sidebar et aux boîtes correspondantes
        products.forEach(product => {
            addProductBox(product);
        });
    }
}


