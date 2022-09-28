import {getAllProducts,getCategoryProducts,getCategories} from "./modules/products-api.js"
import {searchBar} from "./modules/search-products.js"
import {showALLProducts} from "./modules/show-products.js"
let searchProduct = {}


function os (){
    searchBar('searchBar','search-items','#products-section',searchProduct);
    showALLProducts();  
}

os();