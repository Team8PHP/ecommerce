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
            return this.errors.fname = "*Name must be at least 3 letters without special characters"
        }

    }
    validateLastName() {
        let nameRegex = /^[ \s]{0}[a-zA-Z]{3}/
        if (this.lname == '') {
            return this.errors.lname = this.required
        } else if (!nameRegex.test(this.lname)) {
            return this.errors.lname = "*Name must be at least 3 letters without special characters"
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
        if (this.password == '') {
            return this.errors.confirmPassword = this.required
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

    if (Object.keys(u1.errors).length === 0) {
        // best case
    } else {
        fnameError.innerText = u1.errors.fname
        lnameError.innerText = u1.errors.lname
        emailError.innerText = u1.errors.email
        passwordError.innerText = u1.errors.password
        confirmPasswordError.innerText = u1.errors.confirmPassword
    }

})