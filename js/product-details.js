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
.then(productDetails =>{         //Create Function to get product details
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

////////////////////
//////////////////
////////////////

function updateList(){   // Function updateList to handle Comment List
    listElem.innerHTML = '';
  
    for (const key in toDoArray) {
      const li = document.createElement('li');
  
      const span = document.createElement('span');
      span.innerText = toDoArray[key];
  
      const button = document.createElement('button');
      button.innerText = 'Delete';
      button.setAttribute('key',key); 
      button.classList.add('delete');
  
      li.appendChild(span);
      li.appendChild(button);
      listElem.appendChild(li);
    }
  
    localStorage.setItem('commentList',JSON.stringify(toDoArray)); // Add CommentList to localStorage
  }

  function addToList(value){ //Function Add comment to List 
    if (value === '') return;
  
    toDoArray.push(value);
  
    updateList();
    inputElem.value = '';
    inputElem.focus();
  }

  function deleteFromList(key){  //Function Delete Comment From List

    toDoArray.splice(Number(key),1);
  
    updateList();
    inputElem.value = '';
    inputElem.focus();
  }

  form.addEventListener('submit', e => { //AddEventListener to add list in HTML
    e.preventDefault();
    addToList(inputElem.value);
  });
  document.addEventListener('click', e => {//AddEventListener to delete list from HTML
    const el = e.target;
    if (el.classList.contains('delete')){ 
      deleteFromList(el.getAttribute('key'));
    }
  });

  updateList(); //Call Function

  ////////////////////////
  //////////////////////
  ////////////////////

  var product = fetch(`https://dummyjson.com/products/category/${category}`) //Fetch API to get Similar product
.then((data) =>{return data.json();})
.then(similarProduct =>{  // Create Function to Add Similar Products
    //console.log(similarProduct.products[2].title)
    similarProduct.products.forEach(productData => {
       const similarProducts = `<div>
       <h2>${productData.title}</h2>
       <img src="${productData.thumbnail}" alt="">
       <p>${productData.price}$</p>
         </div>`;
        document.getElementById("categorie").insertAdjacentHTML('beforeend',similarProducts); 
    });
})