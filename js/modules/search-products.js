/****************************************************************************************************************** 

*                                       Search Bar Module

****************************************************************************************************************** */

import { getAllProducts } from "./products-api.js"

function filterItems(arr, query) {
    return arr.filter((element) => element.title.toLowerCase().includes(query.toLowerCase()));
}

export function searchBar(bar_id, items_id, ref_section_id, search_buffer) {
    const searchBar = document.getElementById(bar_id)
    searchBar.addEventListener("focus", async function () {
        if (Object.keys(search_buffer).length === 0) {
            search_buffer = await getAllProducts();
        } else {
            return
        }
    })
    searchBar.addEventListener("keyup", async function () {
        let query = searchBar.value;
        let filteredProducts = filterItems(search_buffer.products, query);
        let itemsDiv = document.getElementById(items_id)
        itemsDiv.replaceChildren();
        for (let i = 0; i < filteredProducts.length; i++) {
            let newItem = document.createElement("h6");
            let newItemLink = document.createElement("a");
            newItemLink.innerHTML = filteredProducts[i].title;
            newItemLink.href = ref_section_id
            newItem.append(newItemLink)
            itemsDiv.append(newItem)
            newItemLink.addEventListener("click", (event) => {
                event.stopPropagation();
                console.log("hi");
                window.location.href = `./test.html?product-id=${filteredProducts[i].id}&category=${filteredProducts[i].category}`;
            })
            if (i === 3) { break; }
        }
    })
    document.addEventListener("click", async function () {
        let itemsDiv = document.getElementById(items_id)
        itemsDiv.replaceChildren();
    })
}