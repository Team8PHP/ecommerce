/****************************************************************************************************************** 

*                                       Show Products Module

****************************************************************************************************************** */
function showProducts(showedProducts) {
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