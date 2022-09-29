/****************************************************************************************************************** 

*                                       Fetch data from Products API

****************************************************************************************************************** */
export async function getNumofTotalProducts() {
    let url = 'https://dummyjson.com/products?limit=0&select=total';
    const res = await fetch(url);
    try {
        const product = await res.json();
        return product.total
    } catch (error) {
        console.log("error", error);
    }
}

export async function getAllProducts() {
    const num = await getNumofTotalProducts()
    let url = 'https://dummyjson.com/products?limit='+num;
    const res = await fetch(url);
    try {
        const products = await res.json();
        return products
    } catch (error) {
        console.log("error", error);
    }
}

export async function getCategoryProducts(category) {
        let url = 'https://dummyjson.com/products/category/' + category;
        const res = await fetch(url);
        try {
            const products = await res.json();
            return products
        } catch (error) {
            console.log("error", error);
        }
}


export async function getCategories() {
    let url = 'https://dummyjson.com/products/categories/';
    const res = await fetch(url);
    try {
        const categories = await res.json();

        return categories;
    } catch (error) {
        console.log("error", error);
    }
}