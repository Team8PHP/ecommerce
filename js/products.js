import {searchBar} from "./modules/search-products.js";
import {showALLProducts,showCategoryProducts} from "./modules/show-products.js";
import {createCategoryFilter} from './modules/category-fillter.js';
let searchProduct = {};
function getQueryString() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let category = urlParams.get('category')
    return category
}


function os (){
    let category = getQueryString();
    searchBar('searchBar','search-items','#products-section',searchProduct);
    if(category){
        showCategoryProducts(category,"products-section")
    }else{
        showALLProducts();  
    }

    createCategoryFilter();
}

os();