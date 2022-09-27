/****************************************************************************************************************** 

*                                       Search Bar Module

****************************************************************************************************************** */

import { getAllProducts} from "./prdoucts-api.js"

function filterItems(arr, query) {
    return arr.filter((element) => element.title.toLowerCase().includes(query.toLowerCase()));
}