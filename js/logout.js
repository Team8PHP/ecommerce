var logoutBtn = document.getElementById('logout-btn')

logoutBtn.addEventListener('click', function () {
    if (sessionStorage.length > 0) {
        sessionStorage.clear()
    }
})