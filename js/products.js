import {searchBar} from "./modules/search-products.js";
import {showALLProducts} from "./modules/show-products.js";
import {createCategoryFilter} from './modules/category-fillter.js';
let searchProduct = {};


function os (){
    searchBar('searchBar','search-items','#products-section',searchProduct);
    showALLProducts();  
    createCategoryFilter();
}

os();