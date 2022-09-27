class Login {
    email = ''
    password = ''

    errors = {}
    required = "*This field is required"

    validateEmail() {
        let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        if (this.email == '') {
            return this.errors.email = this.required
        } else if (!emailRegex.test(this.email)) {
            return this.errors.email = "*Please enter a valid email"
        }
    }
    validatePassword() {
        if (this.password == '') {
            return this.errors.password = this.required
        }
    }
}

var loginBtn = document.getElementById("login-btn")

var email = document.getElementById("email")
var emailError = document.getElementById("email-error")

var password = document.getElementById("password")
var passwordError = document.getElementById("password-error")


loginBtn.addEventListener('click', function (e) {
    // prevent submit
    e.preventDefault()
    // creating new onject 
    let log = new Login()

    log.email = email.value
    log.password = password.value

    log.validateEmail()
    log.validatePassword()

    const storedLogin = sessionStorage.getItem('logged-user');
    const loggedUser = storedLogin ? JSON.parse(storedJson) : [];

    if (Object.keys(log.errors).length === 0) {
        let userData = JSON.parse(localStorage.getItem('users')) || [];
        let exist = userData.length &&
            JSON.parse(localStorage.getItem('users')).some(data => data.email.toLowerCase() == log.email && data.password.toLowerCase() == log.password);
        if (!exist) {
            window.scrollTo(0, 0)
            document.querySelector('form').reset();
            document.getElementById("wrong-credentials").classList.remove("d-none")
            document.getElementById("wrong-credentials").innerHTML = `Invalid email or password`
        } else {
            loggedUserInfo = {
                email: log.email,
                password: log.password
            }
            loggedUser.push(loggedUserInfo)
            sessionStorage.setItem('logged-user', JSON.stringify(loggedUser))
            location.href = "index.html";
        }

    } else {
        window.scrollTo(0, 0)
        document.querySelector('form').reset();
        document.getElementById("wrong-credentials").classList.remove("d-none")
        document.getElementById("wrong-credentials").innerHTML = `Invalid email or password`
    }

})
