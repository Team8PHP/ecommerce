var cart_items = document.getElementsByClassName('cart-items')[0];

export function pagesAddToCart(newProduct) {
    var arrOfProducts = []

    if (localStorage.products != null) {
        console.log('if ')
        arrOfProducts = JSON.parse(localStorage.getItem('products'))
        console.log(arrOfProducts);
        arrOfProducts.push(newProduct);
        console.log(arrOfProducts);
        localStorage.setItem('products', JSON.stringify(arrOfProducts))
        // let watch = JSON.parse(localStorage.getItem('products'))
        // console.log(watch)
    } else {
        console.log('else ')
        arrOfProducts.push(newProduct);
        localStorage.setItem('products', JSON.stringify(arrOfProducts))
    }
    console.log(arrOfProducts)
    increase();
    return;

}

export function increase() {
    var cart_count = cart_items.childElementCount
    localStorage.setItem('count', cart_count);
    // console.log(cart_count)
    let badge = localStorage.getItem('count')
    var carticon = document.getElementById('cart')
    carticon.innerText = badge

}