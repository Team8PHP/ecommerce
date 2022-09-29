function isLoggedIn() {
    if (sessionStorage.length > 0) {
        return JSON.parse(sessionStorage.getItem('logged-user'))
    } else {
        return false
    }
}

function loggedInUser() {
    if (isLoggedIn()) {
        let userEmail = isLoggedIn()[0].email;
        document.getElementById('auth-container').innerHTML = `
                <li class="nav-item">
                    <a class="nav-link">${userEmail}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="logout-btn" href="#">Logout</a>
                </li>
        `
    } else {
        document.getElementById('auth-container').innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="login.html">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="register.html">Sign up</a>
                </li>
        `
    }


}
loggedInUser();

document.getElementById("cart").addEventListener('click',function(){
    if (isLoggedIn()) {
        window.location.href = "cart.html";
    } else {
        alert('you need to login to access your cart!');
        window.location.href = "login.html";
    }
});