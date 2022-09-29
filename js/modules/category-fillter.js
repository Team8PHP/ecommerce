/****************************************************************************************************************** 

*                                       Category Fillter Module

****************************************************************************************************************** */

import { getCategories , getCategoryProducts } from "./products-api.js"
import { showProducts ,showALLProducts ,showProductsWithSlider} from "./show-products.js"

export async function createCategoryFilter() {
    const categories = await getCategories();
    const categoriesDiv = document.getElementById("categories");
    const categoriesList = document.createElement("ul");

    const allProducts = document.createElement("li");
    
    allProducts.setAttribute('id', 'category-all');
    const allProductsLink = document.createElement("a");
    allProductsLink.innerHTML = "All Products";
    allProductsLink.href = "products.html#products-section";
    categoriesList.classList.add("nav-link","active");
    allProductsLink.addEventListener("click", showALLProducts)
    allProducts.append(allProductsLink)
    categoriesList.append(allProducts);


    createCategoryListItems(categories, categoriesList);
    categoriesDiv.append(categoriesList);
}

function createCategoryListItems(categories, categoriesList) {
    categories.forEach((category, index) => {
        let categoryItem = document.createElement("li");
        categoryItem.setAttribute('id', 'category-' + Number(index + 1));
        let categoryItemLink = document.createElement("a");
        categoryItemLink.innerHTML = category;
        categoryItemLink.href = "/products.html#products-section"
        categoryItemLink.addEventListener("click", async function () {
            let products = await getCategoryProducts(category)
            showProductsWithSlider(products, "products-section");
        })
        categoryItem.append(categoryItemLink)
        categoriesList.append(categoryItem)
    })
}