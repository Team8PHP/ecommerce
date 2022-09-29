export function isLoggedIn() {
    if (sessionStorage.length > 0) {
        return JSON.parse(sessionStorage.getItem('logged-user'))
    } else {
        return false
    }
}