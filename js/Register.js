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

    // function to validate first name
    validateFirstName() {

        // Regular expression for first name
        let nameRegex = /^[ \s]{0}[a-zA-Z]{3}/

        // Checks if the field is empty
        if (this.fname == '') {
            return this.errors.fname = this.required
        }

        // Checks if the first name doesn't match with the regular expression
        else if (!nameRegex.test(this.fname)) {
            return this.errors.fname = "*Name must be at least 3 letters without special characters or numbers"
        }
    }

    // function to validate last name
    validateLastName() {

        // Regular expression for last name
        let nameRegex = /^[ \s]{0}[a-zA-Z]{3}/

        // Checks if the field is empty
        if (this.lname == '') {
            return this.errors.lname = this.required
        }
        // Checks if the last name doesn't match with the regular expression
        else if (!nameRegex.test(this.lname)) {
            return this.errors.lname = "*Name must be at least 3 letters without special characters or numbers"
        }
    }

    // function to validate email
    validateEmail() {

        // Regular expression for the email
        let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

        // Checks if the field is empty
        if (this.email == '') {
            return this.errors.email = this.required
        }
        // Checks if the email doesn't match with the regular expression
        else if (!emailRegex.test(this.email)) {
            return this.errors.email = "*Please enter a valid email"
        }
    }

    // function to validate password
    validatePassword() {

        // Checks if the field is empty
        if (this.password == '') {
            return this.errors.password = this.required
        }

    }
    // function to validate confirm password
    validateConfirmPassword() {

        // Checks if the field is empty
        if (this.confirmPassword == '') {
            return this.errors.confirmPassword = this.required
        }

        // Checks if the entered value match with the password value
        else if (this.confirmPassword != this.password) {
            return this.errors.confirmPassword = "*Confirm password doesn't match with the password"
        }

    }
}

// Holding DOM elements of the signup form

//Sign-up button
var signUpBtn = document.getElementById("register-btn")

//First name Input & Span for its validation error
var fname = document.getElementById("fname")
var fnameError = document.getElementById("fname-error")

//Last name Input & Span for its validation error
var lname = document.getElementById("lname")
var lnameError = document.getElementById("lname-error")

//Email Input & Span for its validation error
var email = document.getElementById("email")
var emailError = document.getElementById("email-error")


//Password Input & Span for its validation error
var password = document.getElementById("password")
var passwordError = document.getElementById("password-error")

//Confirm password Input & Span for its validation error
var confirmPassword = document.getElementById("confirm-password")
var confirmPasswordError = document.getElementById("confirm-password-error")


// Making event listener for the sign up button
signUpBtn.addEventListener('click', function (e) {

    // Prevent submit
    e.preventDefault()

    // Creating new object 
    let u1 = new Register()

    // Assigning values from registration form
    u1.fname = fname.value
    u1.lname = lname.value
    u1.email = email.value
    u1.password = password.value
    u1.confirmPassword = confirmPassword.value

    // Making validations
    u1.validateFirstName()
    u1.validateLastName()
    u1.validateEmail()
    u1.validatePassword()
    u1.validateConfirmPassword()

    // Checks if there're already users in the local storage
    const storedJson = localStorage.getItem('users');
    // If there isn't an array of objects to hold users, then we create a new one
    const users = storedJson ? JSON.parse(storedJson) : [];

    // If the array of errors is empty
    if (Object.keys(u1.errors).length === 0) {

        // Scroll to top
        window.scrollTo(0, 0)

        // Remove validation errors
        let errors = document.getElementsByClassName("error")
        for (const error of errors) {
            error.innerHTML = ""
        }

        // Checks if the input already exists in local storage
        let exist = users.length &&
            JSON.parse(localStorage.getItem('users')).some(data =>
                data.fname.toLowerCase() == u1.fname.toLowerCase() &&
                data.email.toLowerCase() == u1.email.toLowerCase()
            );
        // If the entered user is new to the local storage
        if (!exist) {
            // make an object for the new user
            user = {
                fname: u1.fname,
                lname: u1.lname,
                email: u1.email,
                password: u1.password
            }
            // Push the new user object in the array of objects users
            users.push(user)
            // Set an item for the users array in the local storage called users
            localStorage.setItem('users', JSON.stringify(users))
            // Reset the form
            document.querySelector('form').reset();
            // Hide the duplication warning if it has previously showed up
            document.getElementById('duplicate').classList.add("d-none")
            // Show the success note
            document.getElementById('success').classList.remove("d-none")
            document.getElementById('success').innerHTML = `<p>Account successfully created!</p>`

        }
        // If the entered user exists in the local storage
        else {
            // Reset the form
            document.querySelector('form').reset();
            // Show the duplication warning
            document.getElementById('duplicate').classList.remove("d-none")
            document.getElementById('duplicate').innerHTML = `<p>You have already signed up!</p>`
        }
    }
    // If there are validation errors
    else {
        typeof u1.errors.fname === 'undefined' ? fnameError.innerHTML = '' : fnameError.innerHTML = `<p>${u1.errors.fname}</p>`
        typeof u1.errors.lname === 'undefined' ? lnameError.innerHTML = '' : lnameError.innerHTML = `<p>${u1.errors.lname}</p>`
        typeof u1.errors.email === 'undefined' ? emailError.innerHTML = '' : emailError.innerHTML = `<p>${u1.errors.email}</p>`
        typeof u1.errors.password === 'undefined' ? passwordError.innerHTML = '' : passwordError.innerHTML = `<p>${u1.errors.password}</p>`
        typeof u1.errors.confirmPassword === 'undefined' ? confirmPasswordError.innerHTML = '' : confirmPasswordError.innerHTML = `<p>${u1.errors.confirmPassword}</p>`
    }

})
