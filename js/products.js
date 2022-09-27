/****************************************************************************************************************** 

*                                       Fetch data from Products API

****************************************************************************************************************** */
async function getNumOfTotalProducts() {
    let url = 'https://dummyjson.com/products?limit=0&select=total';
    const res = await fetch(url);
    try {
        const product = await res.json();
        return product.total
    } catch (error) {
        console.log("error", error);
    }
}