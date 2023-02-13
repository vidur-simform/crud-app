const tableContent = document.getElementById('table-content');

const productListJson = localStorage.getItem("productList");
const productList = productListJson ? JSON.parse(productListJson) : [];



const tableRow = (productID, productName, productImage, productPrice, productDescription) => {
    return `<tr>
                <th scope="row">${productID}</th><td>Mark</td>
                <td>${productName}</td>
                <td><img src=${productImage} style="width:30px; height:30px"></td>
                <td>${productPrice}</td>
                <td>${productDescription}</td>
            </tr>`;
};

const showProducts = () => {
    let content = '';
    productList.forEach(prod => {
        content += tableRow(prod.productId, prod.productName, prod.productImage, prod.productPrice, prod.productDescription);
    console.log(prod.productImage)
    });

    tableContent.innerHTML = content;
};
showProducts();