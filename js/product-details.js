/*
Create Variable 
*/ 
var id = 1;
var category = "smartphones";
const inputElem = document.querySelector('#input-name');
const form = document.querySelector('#form');
const listElem = document.querySelector('#commentList');
const buttonElem = document.querySelector('#commentList button');
const toDoArray = JSON.parse(localStorage.getItem('to-do-list')) || [];

////////////
//////////
////////
var detils = fetch(`https://dummyjson.com/products/${id}`) //Fetch API To git Product by ID 
.then((data) =>{return data.json();})
.then(productDetails =>{         //Create Function to git product details
    //console.log(productDetails.title);
        let makeup = `<div>
        <h2>${productDetails.title}</h2>
        <img src="${productDetails.thumbnail}" alt="">
        <p>${productDetails.price}$</p>
        <p>${productDetails.description}</p>
        <div>
        <img src="${productDetails.images[0]}" alt="">
        <img src="${productDetails.images[1]}" alt="">
        <img src="${productDetails.images[2]}" alt="">
        </div>
        </div>`
        document.getElementById("product").insertAdjacentHTML('afterbegin',makeup);
});