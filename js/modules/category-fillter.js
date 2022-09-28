/****************************************************************************************************************** 

*                                       Category Fillter Module

****************************************************************************************************************** */

import { getCategories , getCategoryProducts } from "./products-api.js"
import { showProducts} from "./show-products"

export async function createCategoryFilter() {
    const categories = await getCategories();
    const categoriesDiv = document.getElementById("categories");
    const categoriesList = document.createElement("ul");

    const allProducts = document.createElement("li");
    allProducts.setAttribute('id', 'category-all');
    const allProductsLink = document.createElement("a");
    allProductsLink.innerHTML = "All Products";
    allProductsLink.href = "#products-section"
    allProductsLink.addEventListener("click", showALLProducts)
    allProducts.append(allProductsLink)
    categoriesList.append(allProducts);


    createCategoryListItems(categories, categoriesList);
    categoriesDiv.append(categoriesList);
}