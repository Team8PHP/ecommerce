import { showProducts, showProductsWithSlider } from './modules/show-products.js';
import { getCategoryProducts } from './modules/products-api.js';
import { isLoggedIn } from './modules/loggedIn.js';
/*
Create Variable 
*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('product-id');
const category = urlParams.get('category');
const inputElem = document.querySelector('#input-name');
const form = document.querySelector('#form');
const listElem = document.querySelector('#commentList');
const buttonElem = document.querySelector('#commentList button');
const toDoArray = JSON.parse(localStorage.getItem('to-do-list')) || [];

////////////
//////////
////////
const detils = fetch(`https://dummyjson.com/products/${productId}`) //Fetch API To git Product by ID 
  .then((data) => { return data.json(); })
  .then(productDetails => {         //Create Function to get product details
    //console.log(productDetails.title);
    let makeup = `
        <div class="container mt-5 mb-5">
        <div class="row d-flex justify-content-center">
          <div class="col-md-12">
            <div class="card">
              <div class="row">
                <div class="col-md-12 col-lg-6">
                  <div class="images p-3">
                    <div class="text-center p-4"> <img id="main-image" class="wow fadeInLeft" src="${productDetails.thumbnail}" width="400" height="400" />
                    </div>
                    <div class="thumbnail text-center">
                    <img onclick="change_image(this)" src="${productDetails.thumbnail}" width="70" height="70">
                    <img onclick="change_image(this)" src="${productDetails.images[0]}" width="70" height="70">
                    <img onclick="change_image(this)" src="${productDetails.images[1]}" width="70" height="70">
                    <img onclick="change_image(this)" src="${productDetails.images[2]}" width="70" height="70">
                        </div>
                  </div>
                </div>
                <div class="col-md-6 wow fadeInRight">
                  <div class="product p-4">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex align-items-center"> <i class="fa fa-long-arrow-left" onclick="history.back()"></i> <span
                      onclick="history.back()" class="ml-1">Back</span> </div> <i class="fa fa-shopping-cart text-muted"></i>
                    </div>
                    <div class="mt-4 mb-3"> <span class="text-uppercase text-muted brand">${productDetails.category}</span>
                      <h5 class="text-uppercase">${productDetails.title}</h5>
                      <div class="price d-flex flex-row align-items-center"> <span class="act-price" style="font-size:3rem;">$${productDetails.price}</span>
                        <div class="ml-5"> <span class="text-danger">${parseInt(productDetails.discountPercentage)}% OFF</span> </div>
                      </div>
                    </div>
                    <p class="about">${productDetails.description}</p>
                    <div class="sizes mt-3">
                    <h5 class="">In stock : ${productDetails.stock}</h5>
                    <h5 class="mt-2">Rating : ${productDetails.rating}/5</h5>
                    </div>
                    <div class="cart mt-4 align-items-center"> <button id="details-add-cart" class="btn bg-main text-uppercase mr-2 px-4">Add
                        to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    document.getElementById("product").insertAdjacentHTML('afterbegin', makeup);
    let cartButton = document.getElementById("details-add-cart");
    cartButton.addEventListener("click", () => {
      if (isLoggedIn()) {
        //    added this code of block to add product to localstorage
        var arrOfProducts = []
        var newProduct = productDetails
        if (localStorage.products != null) {
          arrOfProducts = JSON.parse(localStorage.getItem('products'))
          arrOfProducts.push(newProduct);
          localStorage.setItem('products', JSON.stringify(arrOfProducts))
          // let watch = JSON.parse(localStorage.getItem('products'))
          // console.log(watch)
          cartButton.innerText = "Added";
        } else {
          arrOfProducts.push(newProduct);
          localStorage.setItem('products', JSON.stringify(arrOfProducts))
        }
      } else {
        alert('you need to login to access your cart!');
        window.location.href = "./login.html";
      }
    })
  });
///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


  
  
////////////////////
//////////////////
////////////////

function updateList() {   // Function updateList to handle Comment List
  listElem.innerHTML = '';

  for (const key in toDoArray) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'w-50', 'd-flex', 'justify-content-between', 'align-items-center');
    const span = document.createElement('span');
    span.innerText = toDoArray[key];

    const button = document.createElement('button');
    button.innerText = 'Delete';
    button.classList.add('btn', 'btn-danger');
    button.setAttribute('key', key);
    button.classList.add('delete');

    li.appendChild(span);
    li.appendChild(button);
    listElem.appendChild(li);
  }

  localStorage.setItem('commentList', JSON.stringify(toDoArray)); // Add CommentList to localStorage
}

function addToList(value) { //Function Add comment to List 
  if (value === '') return;

  toDoArray.push(value);

  updateList();
  inputElem.value = '';
  inputElem.focus();
}

function deleteFromList(key) {  //Function Delete Comment From List

  toDoArray.splice(Number(key), 1);

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
  if (el.classList.contains('delete')) {
    deleteFromList(el.getAttribute('key'));
  }
});

updateList(); //Call Function

////////////////////////
//////////////////////
////////////////////


async function os() {
  const productCatigory = await getCategoryProducts(category)
  showProducts(productCatigory, "products-section")
  const remove = document.getElementById("product-" + productId);
  remove.parentElement.remove();
  remove.remove();
  
}
os();



  

