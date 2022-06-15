const urlParams = new URLSearchParams(window.location.search);
const urlID = urlParams.get("id");
console.log(urlID);

let product = [];

const colorChoiced = document.querySelector("#colors");
const quantityChoiced = document.querySelector("#quantity");

fetch(`http://localhost:3000/api/products/${urlID}`)
    .then((res) => res.json())
    .then((data) =>{
        product = data;
        console.log(product);

        let productImg = document.getElementsByClassName("item__img")[0];

        let img = document.createElement("img");
        img.setAttribute("src", product.imageUrl);
        img.setAttribute("alt", product.altTxt);
        productImg.appendChild(img);

        let productTitle = document.getElementById("title");
        productTitle.innerHTML += `${product.name}`

        let productPrice = document.getElementById("price");
        productPrice.innerHTML += `${product.price}`
        
        let productDescription = document.getElementById("description");
        productDescription.innerHTML += `${product.description}`
        
        let productColors = document.getElementById("colors");
        for (i = 0; i < product.colors.length; i++) {
            productColors.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
            }

        // addToCart(product);
        addBasket(product);
        })
        
        .catch((error) =>{ //Message en cas d'erreur d'obtention des données
            console.log("Le chargement des données à rencontré un problème." +error);
        });
;

function addBasket() {

    const btn_addBasket = document.querySelector("#addToCart");

    btn_addBasket.addEventListener("click", (event) => {
        if (quantityChoiced.value > 0 && quantityChoiced.value <= 100) {

            let choixCouleur = colorChoiced.value;
            let choixQuantite = quantityChoiced.value;
            
            let cartContent = JSON.parse(localStorage.getItem("productStored"));
            console.log('cart content ' + JSON.stringify(cartContent));
            let newProduct = {
                id: product._id,
                name: product.name,
                color: choixCouleur,
                quantity: choixQuantite,
                // price: product.price,
                image: product.imageUrl,
                description: product.description,
                alt: product.altTxt,
            };
            if (cartContent) {
                const resultFind = cartContent.find((el) => el.id === newProduct.id && el.color === newProduct.color);
                //Si le produit commandé est déjà dans le panier
                console.log('find ' + resultFind);
                if (resultFind) {
                    let newQuantite = parseInt(newProduct.quantity) + parseInt(resultFind.quantity);
                    resultFind.quantity = newQuantite;
                    localStorage.setItem("productStored", JSON.stringify(cartContent));
                    console.table(cartContent);
                } else { //Si le produit commandé n'est pas dans le panier
                    cartContent.push(newProduct);
                    localStorage.setItem('productStored', JSON.stringify(cartContent));
                    console.table(cartContent);
                }
            } else {
                cartContent = [];
                cartContent.push(newProduct);
                localStorage.setItem("productStored", JSON.stringify(cartContent));
                console.table(cartContent);
            }
        }
    })
}







        
        
