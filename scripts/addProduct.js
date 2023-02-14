//getting data stored in local storage
const productListJson = localStorage.getItem("productList");
const productList = productListJson ? JSON.parse(productListJson) : [];

const productName = document.getElementById('product-name');
const productImage = document.getElementById('product-image');
const productDescription = document.getElementById('product-description');
const productPrice = document.getElementById('product-price');
const imagePreview = document.getElementById('image-preview');

//this function encode image file as url (asynchronously) which can be used as src (base64)
const encodeAsUrl = (file) => {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        if (file.type == "image/png" || file.type == "image/jpeg" || file.type =="image/webp") {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = () => {
                reject(new Error("Problem encoding file!"))
            }
        }
        else{
            reject(new Error("Type of file should be image."))
        }
    });
};

//getting encoded image as preview and to store it later
var imgEncoded = '';
const getEncodedImage = async () => {
    try {
        imgEncoded = await encodeAsUrl(productImage.files[0]);
    }
    catch (err) {
        productImage.value= '';
        imgEncoded = '';
        alert(err.message);
    }
    finally{
        imagePreview.src = imgEncoded;
    }
}
productImage.addEventListener('change', getEncodedImage);

//validation of input
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

const addData = () => {
    //validating input data
    if (!validateData()) return;

    let product = {
        productId: Date.now(), //for unique id
        productName: productName.value,
        productImage: imgEncoded,
        productPrice: productPrice.value,
        productDescription: productDescription.value
    };

    productList.push(product);

    //storing in local storage
    localStorage.setItem("productList", JSON.stringify(productList));

    //clearing input
    productName.value = "";
    productImage.value = "";
    productPrice.value = "";
    productDescription.value = "";

    location.replace('index.html');
};

document.getElementById('add-btn')
.addEventListener('click', () => {
    addData();
});
