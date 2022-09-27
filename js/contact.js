var contactSubmit = document.getElementById("contact-submit")

function validateContactName() {
    var contactName = document.getElementById("contact-name").value;
    var pattern = /^[a-z ,.'-]+$/i;
    if (!pattern.test(contactName)) {
        return alert("invalid name!");
    }
    else {
        return true
    }
}

function validateContactEmail() {
    var contactEmail = document.getElementById("contact-email").value;
    var pattern = /.+\@.+\..+/;
    if (!pattern.test(contactEmail)) {
        return alert("invalid Email!");
    }
    else {
        return true
    }
}

function validateContactPhone() {
    var contactPhone = document.getElementById("contact-phone").value;
    var pattern = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
    if (!pattern.test(contactPhone)) {
        return alert("Phone must contain numbers only and at least 10 digits!");
    }
    else {
        return true
    }
}

function validateContactMsg() {
    var contactMsg = document.getElementById("contact-message").value;
    var pattern = /^[^#%^&*\][}{=+\\|><\`~]*$/;
    if (!pattern.test(contactMsg)) {
        return alert("invalid message!");
    }
    else {
        return true
    }
}

contactSubmit.addEventListener('click', function(e){
    e.preventDefault();
    if (validateContactName() && validateContactEmail() && validateContactPhone() && validateContactMsg()) {
        alert("message sent sucessfully!");
    }
});