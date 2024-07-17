// Export the cookies management function to persist data
export { get_cookie, set_cookie, reset_all_cookies };


// Function to retrieve data from the existing cookie
function get_cookie(name) {
    // Split every information stored in the cookie (key/value pairs)
    let cookie_array = document.cookie.split(";");
    for(let i=0; i<cookie_array.length; i++) {
        // Look for the desired cookie among the various pairs stored
        let cookie_pair = cookie_array[i].split("=");
        if(name == cookie_pair[0].trim()) {
            return decodeURIComponent(cookie_pair[1]);
        }
    }
    return null;
}

// Function to persist data into a cookie
function set_cookie(name, value, days) {
    // Create a new expiration date of the cookie
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    // Create a cookie to persist data and set its new expiration date
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=None";
}

// Function to reset and empty every cookie information stored
function reset_all_cookies() {
    // Empty all cookies information
    document.cookie = "products=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


