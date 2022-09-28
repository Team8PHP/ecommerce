/****************************************************************************************************************** 

*                                       Show Products Module

****************************************************************************************************************** */
import {getAllProducts} from './products-api.js';

export function showProducts(showedProducts) {
    const allProductsDiv = document.getElementById("products-section");
    allProductsDiv.replaceChildren();
    let viewMoreButton = null;
    showedProducts.products.forEach((product, index) => {
        createProductCard(allProductsDiv, product);
    })
    for (let i = 0; i < showedProducts.products.length; i++) {
        viewMoreButton = document.getElementById('more-details-btn-' + showedProducts.products[i].id)
        viewMoreButton.addEventListener("click", () => {
            window.location.href = `./test.html?product-id=${showedProducts.products[i].id}&category=${showedProducts.products[i].category}`;
        })
    }

}

export async function showALLProducts() {
    const products = await getAllProducts()
    showProducts(products);
}

function createProductCard(parentDiv, product) {
    parentDiv.innerHTML += `
    <div class="col-md-6 col-lg-3 my-4 mb-md-0  wow fadeInUp"> 
        <div class="card" id='product-${product.id}'>
            <div class="overflow-hidden">
                <img src= ${product.thumbnail}
                class="card-img-top" style="height:20rem" alt="Gaming Laptop" id="product-img-${product.id}"/>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <p class="small"><a href="#!" class="text-muted">${product.category}</a></p>
                </div>

                <div class="d-flex justify-content-between mb-3">
                    <h5 class="mb-0">${product.title}</h5>
                    <h5 class="text-dark mb-0">$ ${product.price}</h5>
                </div>

                <div class="d-flex justify-content-between mb-2">
                    <p class="text-muted mb-0">Available: <span class="fw-bold">${product.stock}</span></p>
                </div>
                <div class="d-flex justify-content-around p-3">
                    <button class="btn btn-primary px-3" id="more-details-btn-${product.id}">more details</button>
                    <button class="btn px-3" id="cart-btn-${product.id}">add to cart</button>
                </div>
            </div>
        </div>
    </div>
   `
}