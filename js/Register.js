// Form validation
class Register {
    //inputs
    fname = '';
    lname = '';
    email = '';
    password = '';
    confirmPassword = '';
    // object carrying errors
    errors = {};
    // common errors
    required = "*This field is required"


    // Validation methods

    validateFirstName() {
        let nameRegex = /^[ \s]{0}[a-zA-Z]{3}/
        if (this.fname == '') {
            return this.errors.fname = this.required
        } else if (!nameRegex.test(this.fname)) {
            return this.errors.fname = "*Name must be at least 3 letters without special characters or numbers"
        }
    }
    validateLastName() {
        let nameRegex = /^[ \s]{0}[a-zA-Z]{3}/
        if (this.lname == '') {
            return this.errors.lname = this.required
        } else if (!nameRegex.test(this.lname)) {
            return this.errors.lname = "*Name must be at least 3 letters without special characters or numbers"
        }
    }
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
    validateConfirmPassword() {
        if (this.confirmPassword == '') {
            return this.errors.confirmPassword = this.required
        } else if (this.confirmPassword != this.password) {
            return this.errors.confirmPassword = "*Confirm password doesn't match with the password"
        }

    }
}




var signUpBtn = document.getElementById("register-btn")

var fname = document.getElementById("fname")
var fnameError = document.getElementById("fname-error")

var lname = document.getElementById("lname")
var lnameError = document.getElementById("lname-error")

var email = document.getElementById("email")
var emailError = document.getElementById("email-error")

var password = document.getElementById("password")
var passwordError = document.getElementById("password-error")

var confirmPassword = document.getElementById("confirm-password")
var confirmPasswordError = document.getElementById("confirm-password-error")


signUpBtn.addEventListener('click', function (e) {
    // prevent submit
    e.preventDefault()
    // creating new onject 
    let u1 = new Register()
    u1.fname = fname.value
    u1.lname = lname.value
    u1.email = email.value
    u1.password = password.value
    u1.confirmPassword = confirmPassword.value

    u1.validateFirstName()
    u1.validateLastName()
    u1.validateEmail()
    u1.validatePassword()
    u1.validateConfirmPassword()

    const storedJson = localStorage.getItem('users');
    const users = storedJson ? JSON.parse(storedJson) : [];

    if (Object.keys(u1.errors).length === 0) {

        // scroll to top
        window.scrollTo(0, 0)

        //Remove validation errors
        let errors = document.getElementsByClassName("error")
        for (const error of errors) {
            error.innerHTML = ""
        }


        let exist = users.length &&
            JSON.parse(localStorage.getItem('users')).some(data =>
                data.fname.toLowerCase() == u1.fname.toLowerCase() &&
                data.email.toLowerCase() == u1.email.toLowerCase()
            );

        if (!exist) {
            user = {
                fname: u1.fname,
                lname: u1.lname,
                email: u1.email,
                password: u1.password
            }

            users.push(user)
            localStorage.setItem('users', JSON.stringify(users))
            document.querySelector('form').reset();

            document.getElementById('duplicate').classList.add("d-none")
            document.getElementById('success').classList.remove("d-none")
            document.getElementById('success').innerHTML = `<p>Account successfully created!</p>`

        }
        else {
            document.querySelector('form').reset();
            document.getElementById('duplicate').classList.remove("d-none")
            document.getElementById('duplicate').innerHTML = `<p>You have already signed up!</p>`
        }
    } else {
        typeof u1.errors.fname === 'undefined' ? fnameError.innerHTML = '' : fnameError.innerHTML = `<p>${u1.errors.fname}</p>`
        typeof u1.errors.lname === 'undefined' ? lnameError.innerHTML = '' : lnameError.innerHTML = `<p>${u1.errors.lname}</p>`
        typeof u1.errors.email === 'undefined' ? emailError.innerHTML = '' : emailError.innerHTML = `<p>${u1.errors.email}</p>`
        typeof u1.errors.password === 'undefined' ? passwordError.innerHTML = '' : passwordError.innerHTML = `<p>${u1.errors.password}</p>`
        typeof u1.errors.confirmPassword === 'undefined' ? confirmPasswordError.innerHTML = '' : confirmPasswordError.innerHTML = `<p>${u1.errors.confirmPassword}</p>`
    }

})
