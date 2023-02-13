const tableContent = document.getElementById('table-content');

const productListJson = localStorage.getItem("productList");
const productList = productListJson ? JSON.parse(productListJson) : [];



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

const showProducts = () => {
    let content = '';
    tableContent.innerHTML = '';
    productList.forEach((prod, ind) => {
        content += tableRow(ind, prod.productId, prod.productName, prod.productImage, prod.productPrice, prod.productDescription);
    });

    tableContent.innerHTML = content;
};
showProducts();

const deleteProduct = (ind) => {
    productList.splice(ind,1);
    localStorage.setItem("productList", JSON.stringify(productList));
    showProducts();
};