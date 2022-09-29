// Login validation and process
class Login {
    // Inputs
    email = ''
    password = ''
    // Object carrying errors
    errors = {}
    // Common errors
    required = "*This field is required"

    // Function to validate email
    validateEmail() {

        // A regular expression for email
        let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

        // Checks if the field is empty
        if (this.email == '') {
            return this.errors.email = this.required
        } 
        // Checks if the entered value doesn't match the regular expression
        else if (!emailRegex.test(this.email)) {
            return this.errors.email = "*Please enter a valid email"
        }
    }

    // Function to validate password
    validatePassword() {

        // Checks if the field is empty
        if (this.password == '') {
            return this.errors.password = this.required
        }
    }
}

// Holding DOM elements of the Login form
//Login button
var loginBtn = document.getElementById("login-btn")

//Email Input & Span for its validation error
var email = document.getElementById("email")
var emailError = document.getElementById("email-error")

//Password Input & Span for its validation error
var password = document.getElementById("password")
var passwordError = document.getElementById("password-error")

// Making event listener for the Login button
loginBtn.addEventListener('click', function (e) {

    // prevent submit
    e.preventDefault()

    // creating new onject 
    let log = new Login()

    // Assigning values from Login form
    log.email = email.value
    log.password = password.value

    // Making validations
    log.validateEmail()
    log.validatePassword()

    // Checks if there're already a user in the session storage
    const storedLogin = sessionStorage.getItem('logged-user');
    // If there isn't an array of to hold the logged user, then we create a new one
    const loggedUser = storedLogin ? JSON.parse(storedJson) : [];

    // If the array of errors is empty
    if (Object.keys(log.errors).length === 0) {

        // Hold the `users` array of objects from local storage if it exists to authenticate the credentials
        let userData = JSON.parse(localStorage.getItem('users')) || [];

        // Compare the Credentials provided by the user with the data inside `users` array in local storage
        let exist = userData.length &&
            JSON.parse(localStorage.getItem('users')).some(data => data.email.toLowerCase() == log.email && data.password.toLowerCase() == log.password);

        // If the entered credentials don't exist in the local storage
        if (!exist) {

            // Scroll to the top
            window.scrollTo(0, 0)

            // Reset the login form
            document.querySelector('form').reset();

            // Show the wrong credentials error
            document.getElementById("wrong-credentials").classList.remove("d-none")
            document.getElementById("wrong-credentials").innerHTML = `Invalid email or password`
        }

        // If the entered credentials exist in the local storage
        else {

            // Make a new object to hold email & password in order to push it in the session storage
            loggedUserInfo = {
                email: log.email,
                password: log.password
            }

            // Push the object loggedUserInfo in the array loggedUser
            loggedUser.push(loggedUserInfo)

            // Set a new item named logged-user for the array of objects loggedUser in the session storage 
            sessionStorage.setItem('logged-user', JSON.stringify(loggedUser))

            // The login process is successfully done and page is redirected to index.html
            location.href = "index.html";
        }

    }
    // If there are validation errors 
    else {

        // Scroll to the top
        window.scrollTo(0, 0)

        // Reset the form
        document.querySelector('form').reset();

        // Show the Invalid email or password error
        document.getElementById("wrong-credentials").classList.remove("d-none")
        document.getElementById("wrong-credentials").innerHTML = `Invalid email or password`
    }

})
