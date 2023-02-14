const tableContent = document.getElementById('table-content');

//getting data stored in local storage
var productListJson = localStorage.getItem("productList");
var productList = productListJson ? JSON.parse(productListJson) : [];



var isDescending = false;       //true for descending false for ascending
var sortByFlag = 'id';  //id, name, price
const sortList = ()=>{
    console.log(sortByFlag,isDescending);
    if(sortByFlag=='id')
        productList = productList.sort((a,b)=>a.productId > b.productId);
    else if(sortByFlag=='name')
        productList = productList.sort((a,b)=>a.productName.localeCompare(b.prodctName));
    else if(sortByFlag=='price')
        productList = productList.sort((a,b)=>a.productPrice - b.productPrice);
    console.log(productList);
        //order
    if(isDescending){
        productList = productList.reverse();
    }  
};

const sortByElement = document.getElementById('sortby');
sortByElement.addEventListener('change', ()=>{
    if(sortByElement.value == "sort-by-product-id"){
        sortByFlag = 'id';
    }
    else if(sortByElement.value == "sort-by-product-name"){
        sortByFlag = 'name';
    }
    else if(sortByElement.value == "sort-by-product-price"){
        sortByFlag = 'price';
    }
    sortList();
    showProducts();
});

const sortOrderElement = document.getElementById('sort-order');
sortOrderElement.addEventListener('change', ()=>{
    if(sortOrderElement.value == "ascending"){
        isDescending = false;
    }
    else if(sortOrderElement.value == "descending"){
        isDescending = true;
    }
    sortList();
    showProducts();
});



//deleting product by index
const deleteProduct = (ind) => {
    productList.splice(ind,1);
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
    productList.forEach((prod, ind) => {
        content += tableRow(ind, prod.productId, prod.productName, prod.productImage, prod.productPrice, prod.productDescription);
    });

    tableContent.innerHTML = content;
};
showProducts();

