// Export the utils functions
export { create_icon_based_on_dates };


// Function to create a dedicated font-awesome icon based on today/product dates difference
function create_icon_based_on_dates(product) {
    // Create a font-awesome icon
    const icon = document.createElement('i');
    icon.classList.add('fas');

    // Compute the difference between today's date and product date
    const today = new Date();
    const product_date = new Date(product.date);
    const differenceInDays = Math.floor((product_date - today) / (1000 * 60 * 60 * 24));

    // Add the color and style to the icon based on the dates difference
    if(differenceInDays < 0) {
        // Product date is in the past : red icon
        icon.classList.add('fa-times-circle');
        icon.style.color = 'red';
    } else if(differenceInDays <= 7) {
        // Product date is less than 7 days after today : orange icon
        icon.classList.add('fa-exclamation-triangle');
        icon.style.color = 'orange';
    } else {
        // Product date is later in the future : green icon
        icon.classList.add('fa-check-circle');
        icon.style.color = 'green';
    }

    // Return the created font-awesome icon corresponding to the product date status
    return icon;
}


