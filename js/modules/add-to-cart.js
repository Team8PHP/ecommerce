/****************************************************************************************************************** 

*                                       Add To Cart Module

****************************************************************************************************************** */
import { isLoggedIn } from './loggedIn.js';

export function addToCartBtn(product, btnID) {
    if (isLoggedIn()) {
        //    added this code of block to add product to localstorage
        let arrOfProducts = []
        let newProduct = product
        let addedBtn = document.getElementById(btnID);
        let cart_count = document.getElementById('cart_count')
        let addedFlag = false
        if (localStorage.products != null) {
            arrOfProducts = JSON.parse(localStorage.getItem('products'))
            arrOfProducts.forEach(product => {
                if (product.id == newProduct.id) {
                    console.log("here");
                    addedFlag = true
                }
            });
            if (addedFlag) {
                return;
            } else {
                arrOfProducts.push(newProduct);
                localStorage.setItem('products', JSON.stringify(arrOfProducts));
                let clicked = localStorage.getItem('countclick')
                clicked = parseInt(clicked) + 1
                localStorage.setItem('countclick', parseInt(clicked))
                cart_count.innerText = clicked
            }
        } else {
            let value = 1
            arrOfProducts.push(newProduct);
            localStorage.setItem('products', JSON.stringify(arrOfProducts));
            localStorage.setItem('countclick', parseInt(value))
            let clicked = localStorage.getItem('countclick')
            cart_count.innerText = clicked
        }
        addedBtn.innerText = "Added";

    } else {
        alert('you need to login to access your cart!');
        window.location.href = "./login.html";
    }
}