/****************************************************************************************************************** 

*                                       Search Bar Module

****************************************************************************************************************** */

import { getAllProducts} from "./prdoucts-api.js"

function filterItems(arr, query) {
    return arr.filter((element) => element.title.toLowerCase().includes(query.toLowerCase()));
}

export function searchBar (bar_id ,items_id,ref_section_id,search_buffer){
    const searchBar = document.getElementById(bar_id)
    searchBar.addEventListener("focus", async function () {
        if (Object.keys(searchProduct).length === 0) {
            search_buffer = await getAllProducts();
        } else {
            return
        }
    })
}