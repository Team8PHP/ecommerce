export var logoutBtn = document.getElementById('logout-btn')

export function logOut() {
    if (sessionStorage.length > 0) {
        sessionStorage.clear()
    }
}