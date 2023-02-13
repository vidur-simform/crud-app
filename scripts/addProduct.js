const productName = document.getElementById('product-name');
const productImage = document.getElementById('product-image');
const productDescription = document.getElementById('product-description');
const productPrice = document.getElementById('product-price');

const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', () => {
    storeData();
});

const validateData = () => {
    if (!productName.checkValidity()) {
        productName.reportValidity();
    }
    else if (!productImage.checkValidity()) {
        productImage.reportValidity();
    }
    else if (!productPrice.checkValidity()) {
        productPrice.reportValidity();
    }
    else if (!productDescription.checkValidity()) {
        productDescription.reportValidity();
    }
    else {
        return true;
    }
    return false;
};

const encodeAsUrl = (file) => {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(new Error("Problem encoding file!"))
        }
    });
};

const storeData = async () => {
    //validating input data
    if (!validateData()) return;

    let productListJson = localStorage.getItem("productList");
    let productList = productListJson ? JSON.parse(productListJson) : [];

    try {
        //creating product object
        let imgEncoded = await encodeAsUrl(productImage.files[0]);
        let product = {
            productId: Date.now(), //for unique id
            productName: productName.value,
            productImage: imgEncoded,
            productPrice: productDescription.value,
            productDescription: productDescription.value
        };

        productList.push(product);

        //storing in local storage
        localStorage.setItem("productList", JSON.stringify(productList));
    }
    catch (err) {
        alert(err.message);
    }
    finally {
        //clearing input
        productName.value = "";
        productImage.value = "";
        productPrice.value = "";
        productDescription.value = "";
    }
};