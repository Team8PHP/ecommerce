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

async function getAllProducts() {
    const num = await getNumOfTotalProducts()
    let url = 'https://dummyjson.com/products?limit=' + num;
    const res = await fetch(url);
    try {
        const products = await res.json();
        return products
    } catch (error) {
        console.log("error", error);
    }
}

async function getProductsByRating() {
    const products = await getAllProducts()
    let sorted = products.products.sort(function (a, b) {
        return b.rating - a.rating;
    }).slice(0,12);
        sorted.forEach(item => {
            document.getElementById("home-products-container").innerHTML += `
        <div class="col-md-6 col-lg-3 my-4 mb-md-0  wow fadeInUp">
                        <div class="card">
                            <div class="overflow-hidden">
                            <img src=${item.thumbnail}
                                class="card-img-top" style="height:20rem;" alt="Gaming Laptop" id="product-img"/>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <p class="small"><a href="#!" class="text-muted">${item.category}</a></p>
                                    <p class="small text-danger">${parseInt(item.discountPercentage)}% off</p>
                                </div>

                                <div class="d-flex justify-content-between mb-3">
                                    <h4 class="mb-0">${item.title.substring(0, 35)}</h4>
                                    <h5 class="text-dark mb-0">$${item.price}</h5>
                                </div>

                                <div class="d-flex justify-content-between mb-2">
                                    <p class="text-muted mb-0">Available: <span class="fw-bold">${item.stock}</span></p>
                                    <div class="ms-auto text-warning">
                                        <i class="fa fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-around p-3">
                                    <button class="btn btn-primary px-3" id="more-details-btn">more details</button>
                                    <button class="btn px-3" id="add-to-cart-btn">add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        });
};
getProductsByRating();


async function getProductsBySale() {
    const products = await getAllProducts()
    let sorted = products.products.sort(function (a, b) {
        return b.discountPercentage - a.discountPercentage;
    }).slice(0,12);
        sorted.forEach(item => {
            document.getElementById("home-products-sale-container").innerHTML += `
        <div class="col-md-6 col-lg-3 my-4 mb-md-0">
                        <div class="card">
                            <div class="overflow-hidden">
                            <img src=${item.thumbnail}
                                class="card-img-top" style="height:20rem;" alt="Gaming Laptop" id="product-img"/>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <p class="small"><a href="#!" class="text-muted">${item.category}</a></p>
                                    <p class="small text-danger">${parseInt(item.discountPercentage)}% off</p>
                                </div>

                                <div class="d-flex justify-content-between mb-3">
                                    <h3 class="mb-0">${item.title.substring(0, 15)}</h3>
                                    <h5 class="text-dark mb-0">$${item.price}</h5>
                                </div>

                                <div class="d-flex justify-content-between mb-2">
                                    <p class="text-muted mb-0">Available: <span class="fw-bold">${item.stock}</span></p>
                                    <div class="ms-auto text-warning">
                                        <i class="fa fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-around p-3">
                                    <button class="btn btn-primary px-3" id="more-details-btn">more details</button>
                                    <button class="btn px-3" id="add-to-cart-btn">add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        });
};
getProductsBySale();



