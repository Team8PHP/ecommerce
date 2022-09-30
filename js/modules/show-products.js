/****************************************************************************************************************** 

*                                       Show Products Module

****************************************************************************************************************** */
import { getAllProducts, getCategoryProducts } from './products-api.js';
import {isLoggedIn} from './loggedIn.js';

export function showProducts(showedProducts, productsSectionID) {

    const allProductsDiv = document.getElementById(productsSectionID);
    allProductsDiv.replaceChildren();
    showSelectedProducts(showedProducts.products, productsSectionID)
}

export function showProductsWithSlider(showedProducts, productsSectionID) {
    const allProductsDiv = document.getElementById(productsSectionID);
    allProductsDiv.replaceChildren();
    createPageSlider(showedProducts, productsSectionID)
}

export async function showALLProducts() {
    const products = await getAllProducts()
    showProductsWithSlider(products, "products-section");
}

function createProductCard(parentDiv, product) {
    parentDiv.innerHTML += `
    <div class="col-md-6 col-lg-3 my-4 mb-md-0  wow fadeInUp"> 
        <div class="card" id='product-${product.id}'>
            <div class="overflow-hidden">
                <img src= ${product.thumbnail}
                class="card-img-top product-img" style="height:20rem" alt="Gaming Laptop" id="product-img-${product.id}"/>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <p class="small"><a href="/products.html?category=${product.category}#products-section" class="text-muted" id ="product-category-${product.id}" >${product.category}</a></p>
                    <p class="small text-danger">${parseInt(product.discountPercentage)}% off</p>
                    </div>

                <div class="d-flex justify-content-between mb-3">
                    <h5 class="mb-0">${product.title.substring(0, 22)}</h5>
                    <h5 class="text-dark mb-0">$ ${product.price}</h5>
                </div>

                <div class="d-flex justify-content-between mb-2">
                    <p class="text-muted mb-0">Available: <span class="fw-bold">${product.stock}</span></p>
                </div>
                <div class="d-flex justify-content-around p-3">
                    <button class="btn btn-primary px-3" id="more-details-btn-${product.id}">more details</button>
                    <button class="btn px-3 add-to-cart-btn" id="cart-btn-${product.id}">add to cart</button>
                </div>
            </div>
        </div>
    </div>
    `
}

function showSelectedProducts(products, productsSectionID) {
    const allProductsDiv = document.getElementById(productsSectionID);
    allProductsDiv.replaceChildren();
    let viewMoreButton = null;
    let categoryLink = null;
    let cartButton = null;
    products.forEach((product) => {
        createProductCard(allProductsDiv, product);
    })
    for (let i = 0; i < products.length; i++) {
        viewMoreButton = document.getElementById('more-details-btn-' + products[i].id)
        categoryLink = document.getElementById('product-category-' + products[i].id)
        cartButton = document.getElementById('cart-btn-' + products[i].id)
        viewMoreButton.addEventListener("click", () => {
            window.location.href = `./product-details.html?product-id=${products[i].id}&category=${products[i].category}`;
        })
        categoryLink.addEventListener("click", async () => {
            let choosedProducts = await getCategoryProducts(products[i].category)
            showProductsWithSlider(choosedProducts, "products-section");
        })
        cartButton.addEventListener("click", () => {
            if (isLoggedIn()) {
                //    added this code of block to add product to localstorage
                var arrOfProducts = []
                var newProduct = products[i]
                var addedBtn = document.getElementById(`cart-btn-${products[i].id}`);

                if (localStorage.products != null) {
                    arrOfProducts = JSON.parse(localStorage.getItem('products'))
                    arrOfProducts.push(newProduct);
                    localStorage.setItem('products', JSON.stringify(arrOfProducts));
                    // let watch = JSON.parse(localStorage.getItem('products'))
                    // console.log(watch)
                } else {
                    console.log('else ')
                    arrOfProducts.push(newProduct);
                    localStorage.setItem('products', JSON.stringify(arrOfProducts));
                }
                addedBtn.innerText = "Added";
            } else {
                alert('you need to login to access your cart!');
                window.location.href = "./login.html";
            }
        })

    }
}

function createPageSlider(showedProducts, productsSectionID) {
    let numofProducts = 12.0
    let limit = showedProducts.products.length / numofProducts
    const bunttonSection = document.getElementById('button-section');
    bunttonSection.replaceChildren();
    for (let count = 0; count <= limit; count++) {
        let newButton = document.createElement("button");
        newButton.innerHTML = count + 1;
        newButton.classList.add('wow', 'fadeInUp')
        bunttonSection.append(newButton);
        newButton.addEventListener("click", () => {
            let input = showedProducts.products.slice(count * numofProducts, (count + 1) * numofProducts);
            showSelectedProducts(input, productsSectionID);
        })
    }
    showSelectedProducts(showedProducts.products.slice(0, numofProducts), productsSectionID);

}

export async function showCategoryProducts(category, productsSectionID) {
    let products = await getCategoryProducts(category);
    showProductsWithSlider(products, productsSectionID);
}