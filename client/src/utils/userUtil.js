export function getUsernameFromCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if the cookie starts with 'username='
        if (cookie.startsWith('username=')) {
            // Extract the value after '='
            return cookie.substring('username='.length, cookie.length);
        }
    }
    // Return null if 'username' cookie is not found
    return null;
}  