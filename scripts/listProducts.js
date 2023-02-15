const tableContent = document.getElementById('table-content');

//getting data stored in local storage
var productListJson = localStorage.getItem("productList");
var productList = productListJson ? JSON.parse(productListJson) : [];

var isDescending = 1;       //-1 for descending false , 1 for ascending
var sortByFlag = 'id';          //id, name, price

//sorting list
const sortList = () => {
    if (sortByFlag == 'id') {
        productList.sort((a, b) => isDescending*(a.productId - b.productId));
    }
    else if (sortByFlag == 'name') {    //localeCompare will return diffrence for string
        productList.sort((a, b) => isDescending*(a.productName).localeCompare(b.productName));
    }
    else if (sortByFlag == 'price') {
        productList.sort((a, b) => isDescending*(a.productPrice - b.productPrice));
    }
};

const filterByID = document.getElementById('filter-by-id');
filterByID.addEventListener('keyup',()=>{
    showProducts();
});

const sortByElement = document.getElementById('sortby');
sortByElement.addEventListener('change', () => {
    if (sortByElement.value == "sort-by-product-id") {
        sortByFlag = 'id';
    }
    else if (sortByElement.value == "sort-by-product-name") {
        sortByFlag = 'name';
    }
    else if (sortByElement.value == "sort-by-product-price") {
        sortByFlag = 'price';
    }
    sortList();
    showProducts();
});

const sortOrderElement = document.getElementById('sort-order');
sortOrderElement.addEventListener('change', () => {
    if (sortOrderElement.value == "ascending") {
        isDescending = 1;
    }
    else if (sortOrderElement.value == "descending") {
        isDescending = -1;
    }
    sortList();
    showProducts();
});

//deleting product by index
const deleteProduct = (ind) => {
    productList.splice(ind, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    showProducts();
};

//table row to append in table body
const tableRow = (ind, productID, productName, productImage, productPrice, productDescription) => {
    return `<tr>
                <th scope="row">${productID}</th>
                <td>${productName}</td>
                <td><img class="image-of-product" src=${productImage}></td>
                <td>${productPrice}</td>
                <td>${productDescription}</td>
                <td>
                    <a href="update.html?id=${productID}" type="button" class="btn btn-primary "> Update </a>
                    <a type="button" onclick='deleteProduct(${ind})' class="btn btn-danger "> Delete </a>
                </td>
            </tr>`;
};

//listing available products
const showProducts = () => {
    let content = '';
    tableContent.innerHTML = '';
    //filtering
    productList.filter(obj => obj.productId.toString().includes(filterByID.value)).forEach((prod, ind) => {
        content += tableRow(ind, prod.productId, prod.productName, prod.productImage, prod.productPrice, prod.productDescription);
    });

    tableContent.innerHTML = content;
};
showProducts();