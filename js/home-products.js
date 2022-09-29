import {getAllProducts} from "./modules/products-api.js";
import {showProducts} from "./modules/show-products.js";

async function getProductsByRating() {
    const products = await getAllProducts()
    let sorted = products.products.sort(function (a, b) {
        return b.rating - a.rating;
    }).slice(0,12);
    let productObject = {
        'products' : sorted
    }
    showProducts(productObject,"home-products-container");
};
getProductsByRating();


async function getProductsBySale() {
    const products = await getAllProducts()
    let sorted = products.products.sort(function (a, b) {
        return b.discountPercentage - a.discountPercentage;
    }).slice(0,12);
    let productObject = {
        'products' : sorted
    }
    showProducts(productObject,"home-products-sale-container");
};
getProductsBySale();



