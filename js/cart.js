var cart_container = document.getElementsByClassName("cart_container")[0]
var cart_items = document.getElementsByClassName('cart-items')[0]

//  determine which remove button is pressed  and decrease cart count if item is available only
var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for (var i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}

// determine which item quantity is being changed and call quantity changed function
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}


// event listner for purchase button
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

// alert purchase complete and clear cart 
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    localStorage.clear()
}
//  remove the parent div containing product 
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
    decrease()
    localStorage.clear()
//  
//   console.log(buttonClicked.parentElement.parentElement.children[0].children[1].innerText)
//   console.log(buttonClicked.parentElement.parentElement.children[0].children[0].src)  
//   console.log(buttonClicked.parentElement.parentElement.children[1].innerText) 
 
var newproducts = [ ]
// console.log(cart_items.children)
let arr =cart_items.children
for(let i=0; i< arr.length;i++){
    // console.log(arr[i].children[0].children[1].innerText)
    // console.log(arr[i].children[0].children[0].src)
    // console.log(arr[i].children[1].innerText)
    var newobj =
        {title: arr[i].children[0].children[1].innerText,
            price:arr[i].children[1].innerText,
            thumbnail:arr[i].children[0].children[0].src
            }
            newproducts.push(newobj)
  }
localStorage.setItem('products',JSON.stringify(newproducts))
// console.log(newproducts)

 var itemget =JSON.parse(localStorage.getItem('products'))
//  console.log(itemget)

    for(let i=0 ;i<itemget.length;i++)
     {
       var title = itemget[i].title
       var price =  itemget[i].price 
       var imageSrc =itemget[i].thumbnail
       console.log(title,price,imageSrc)
       
    }

 }
    
// number of item in cart  can be only number and  >0
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

// get title , price and image of product and send to 3 functions 
function addToCartClicked(event) {
    var item =JSON.parse(localStorage.getItem('products'))
    console.log(item)
    for(let i=0 ;i<item.length;i++)
     {
       var title = item[i].title
       var price =  item[i].price 
       var imageSrc =item[i].thumbnail
    //    console.log(title,price,imageSrc)
       addItemToCart(title, price, imageSrc)
       updateCartTotal()
       increase()
      
    }
    // console.log(title,price,imageSrc)
    
}

// add new div containing product details and check if item is already added alert the user
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.classList.add('p-2')
    cartRow.classList.add('d-flex')
    cartRow.classList.add('flex-row')
    cartRow.classList.add('align-items-center')
    cartRow.classList.add('justify-content-around')
    cartRow.classList.add('col-12')
    cartRow.classList.add('border')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="300" height="150">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <span class="cart-sub-price cart-column"></span>
        <input class="cart-quantity-input" type="number" value="1">
        <div class="cart-quantity cart-column">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// update total price based on quantity of 1 item and sum of all items 
// the total is rounded to 2 decimal points only
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Total = '+'$' + total 
}


// increase count in local storage when adding item in cart 
function increase(){
    var cart_count =cart_items.childElementCount
localStorage.setItem('count', cart_count);
// console.log(cart_count)
    
}

// decrease count in local storage when removing item in cart 
function decrease (){
   var cart_dec = localStorage.getItem('count')
  
   var new_value = parseFloat(cart_dec) -1
//    console.log(new_value)
    localStorage.setItem('count', new_value);
}

    // function pagesAddToCart(){
    //     var arrOfProducts = []
    // var newProduct= products[i]

    //             if (localStorage.products != null) {
    //                 console.log('if ')
    //                 arrOfProducts = JSON.parse(localStorage.getItem('products'))
    //                 console.log(arrOfProducts);
    //                 arrOfProducts.push(newProduct);
    //                 console.log(arrOfProducts);
    //                 localStorage.setItem('products',JSON.stringify(arrOfProducts) )
    //                 // let watch = JSON.parse(localStorage.getItem('products'))
    //                 // console.log(watch)
    //             } else {
    //                 console.log('else ')
    //                 arrOfProducts.push(newProduct);
    //                 localStorage.setItem('products',JSON.stringify(arrOfProducts) )
    //             }
    //             console.log(arrOfProducts)
    //             return ;
    //         }


addToCartClicked()