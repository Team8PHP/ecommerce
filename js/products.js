import {getAllProducts,getCategoryProducts,getCategories} from "./modules/products-api.js"
import {searchBar} from "./modules/search-products.js"

let searchProduct = {}


function os (){
    searchBar('searchBar','search-items','#products-section',searchProduct)
}

os();