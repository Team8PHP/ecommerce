window.onload=function(){
    var logoutBtn = document.getElementById('logout-btn')
        logoutBtn.addEventListener('click', function () {
            if (sessionStorage.length > 0) {
                sessionStorage.clear();
                // localStorage.clear();
                localStorage.removeItem('countclick');
                localStorage.removeItem('products');
                location.reload();
            }
            window.location.href = `./index.html`
        })
}

