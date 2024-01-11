let products = [];

function addOrUpdateProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productModel = document.getElementById('productModel').value;
    const productBrand = document.getElementById('productBrand').value;
    const productOrigin = document.getElementById('productOrigin').value;
    const productLogo = document.getElementById('productLogo').value;

    // Validate input
    if (!productName || isNaN(productPrice) || !productModel || !productBrand || !productOrigin) {
        alert("Please enter all product details.");
        return;
    }

    const product = {
        name: productName,
        price: productPrice,
        model: productModel,
        brand: productBrand,
        origin: productOrigin,
        logo: productLogo
    };

    const existingProductIndex = findProductIndex(productName);

    if (existingProductIndex === -1) {
        // Add the product to the array
        products.push(product);
    } else {
        // Update existing product
        products[existingProductIndex] = product;
    }

    // Clear the form inputs
    clearForm();

    // Update the product list
    updateProductList();
}

function findProductIndex(productName) {
    return products.findIndex(product => product.name === productName);
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productModel').value = '';
    document.getElementById('productBrand').value = '';
    document.getElementById('productOrigin').value = '';
    document.getElementById('productLogo').value = '';
}

function updateProductList() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${product.name}</strong> - 
            Model: ${product.model}, 
            Brand: ${product.brand}, 
            Origin: ${product.origin}, 
            Price: $${product.price.toFixed(2)}, 
            Logo: <img src="${product.logo}" alt="Product Logo" style="max-width: 50px;">
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="removeProduct(${index})">Remove</button>`;
        productList.appendChild(listItem);
    });
}

function editProduct(index) {
    const product = products[index];

    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productModel').value = product.model;
    document.getElementById('productBrand').value = product.brand;
    document.getElementById('productOrigin').value = product.origin;
    document.getElementById('productLogo').value = product.logo;

    // Remove the edited product from the array
    products.splice(index, 1);

    // Update the product list
    updateProductList();
}
function removeProduct(index) {
    // Remove the product from the array
    products.splice(index, 1);

    // Update the product list
    updateProductList();
}
