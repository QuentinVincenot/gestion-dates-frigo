import { getCookie, setCookie } from './cookies.js';


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



/*// Function to get cookies
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

// Function to set cookies
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}*/



// Function to add product box to the DOM
function addProductBox(product) {
    // Création de l'icône Font Awesome en fonction de la date
    const icon = document.createElement('i');
    icon.classList.add('fas');

    // Calcul de la différence en jours entre aujourd'hui et la date du produit
    const today = new Date();
    const productDate = new Date(product.date);
    const differenceInDays = Math.floor((productDate - today) / (1000 * 60 * 60 * 24));

    if (differenceInDays < 0) {
        // Date dépassée
        icon.classList.add('fa-times-circle');
        icon.style.color = 'red';
    } else if (differenceInDays <= 7) {
        // Date dans moins de 7 jours
        icon.classList.add('fa-exclamation-triangle');
        icon.style.color = 'orange';
    } else {
        // Date plus loin dans le futur
        icon.classList.add('fa-check-circle');
        icon.style.color = 'green';
    }

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

    // Mettre à jour la sidebar avec la nouvelle liste d'aliments
    updateSidebar(product);
}

// Fonction pour trier les produits par date la plus ancienne
function sortByDateAscending(products) {
    return products.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Fonction pour mettre à jour la sidebar avec la liste des aliments
function updateSidebar(product) {
    // Création de l'icône Font Awesome en fonction de la date
    const icon = document.createElement('i');
    icon.classList.add('fas');

    // Calcul de la différence en jours entre aujourd'hui et la date du produit
    const today = new Date();
    const productDate = new Date(product.date);
    const differenceInDays = Math.floor((productDate - today) / (1000 * 60 * 60 * 24));

    if (differenceInDays < 0) {
        // Date dépassée
        icon.classList.add('fa-times-circle');
        icon.style.color = 'red';
    } else if (differenceInDays <= 7) {
        // Date dans moins de 7 jours
        icon.classList.add('fa-exclamation-triangle');
        icon.style.color = 'orange';
    } else {
        // Date plus loin dans le futur
        icon.classList.add('fa-check-circle');
        icon.style.color = 'green';
    }
    
    // Récupérer la liste des aliments
    let alimentsList = document.getElementById("alimentsList");

    // Ajouter le nouveau produit à la liste
    let listItem = document.createElement("li");
    listItem.textContent = ` ${product.aliment} - ${product.type} - ${product.date}`;
    listItem.insertBefore(icon, listItem.firstChild);
    alimentsList.appendChild(listItem);

    // Trier les aliments par date la plus ancienne
    let items = Array.from(alimentsList.getElementsByTagName("li"));
    items.sort((a, b) => {
        let dateA = new Date(a.textContent.split(" - ")[2]);
        let dateB = new Date(b.textContent.split(" - ")[2]);
        return dateA - dateB;
    });

    // Réorganiser les éléments dans la liste
    items.forEach(item => alimentsList.appendChild(item));
}

// Handle form submission
form.onsubmit = function(event) {
    event.preventDefault();
    let aliment = document.getElementById("aliment").value;
    let type = document.getElementById("type").value;
    let date = document.getElementById("date").value;

    let product = { aliment, type, date };

    // Get current products from cookies
    let products = getCookie("products");
    if (products) {
        products = JSON.parse(products);
    } else {
        products = [];
    }

    // Add new product to the list
    products.push(product);

    // Save updated products to cookies
    setCookie("products", JSON.stringify(products), 7);

    // Add product to the DOM
    addProductBox(product);

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

    // Vider les cookies
    document.cookie = "products=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
    let products = getCookie("products");
    if (products) {
        products = JSON.parse(products);
        // Ajouter chaque produit à la sidebar et aux boîtes correspondantes
        products.forEach(product => {
            addProductBox(product);
        });
    }
}


