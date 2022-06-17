let cartContent = JSON.parse(localStorage.getItem("productStored"));

console.table(cartContent);

var productWithPrice = [];

fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then((data) => {
    console.log(data);
    for(let i = 0; i < cartContent.length; i++){
        let productPrice = data.find(el => el._id === cartContent[i].id).price;
        console.log(productPrice);
        let productIdPrice = {
            id : cartContent[i].id,
            price : productPrice,
        }
        productWithPrice.push(productIdPrice);
    }
    console.table(productWithPrice);
    
    let totalPrice = 0;
    
    let cartItems = document.getElementById("cart__items");
    
    for(let i = 0; i < cartContent.length; i++){
         
        let price = productWithPrice.find(el => el.id === cartContent[i].id).price;

        totalPrice += price * parseInt(cartContent[i].quantity);

        cartItems.innerHTML += `<article class="cart__item" data-id="${cartContent[i].id}" data-color="${cartContent[i].color}">
        <div class="cart__item__img">
            <img src="${cartContent[i].image}" alt="${cartContent[i].alt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${cartContent[i].name}</h2>
            <p>${cartContent[i].color}</p>
            <p>${price},00 €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartContent[i].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
            </div>
            </div>
            </article>`
    }

    let itemQty = document.getElementsByClassName('itemQuantity');
    let itemLgth = itemQty.length;
    let totalQtty;
    totalQtty = 0;

    for (let i = 0; i < itemLgth ; i++){
        totalQtty += itemQty[i].valueAsNumber;
    }

    let productTotalQty = document.getElementById('totalQuantity');
    productTotalQty.innerHTML = totalQtty;
    console.log(totalQtty);
        
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);

    modifyQty();
    removeProduct();
}) 


function modifyQty(){
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < qttModif.length; i++){
        qttModif[i].addEventListener("change" , (event) => {
            event.preventDefault();

            let qttModifValue = qttModif[i].valueAsNumber;
            
            if(qttModif !== qttModifValue){
                cartContent[i].quantity = qttModifValue;  
            }

            localStorage.setItem("productStored", JSON.stringify(cartContent));
            
            location.reload();
        })
    }
}


function removeProduct(){
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < btn_supprimer.length; i++){
        btn_supprimer[i].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = cartContent[i].id;
            let colorDelete = cartContent[i].color;

            cartContent = cartContent.filter( el => el.id !== idDelete || el.color !== colorDelete );
            
            localStorage.setItem("productStored", JSON.stringify(cartContent));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}

let form = document.querySelector(".cart__order__form");

const regexChar = /[a-zA-Z ,.'-]+$/;
const regexAdress = /^[a-zA-Z0-9\s,.'-]{3,}$/; 
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");

form.firstName.addEventListener("change" , (event) => {
    console.log(event.target.value);
    checkFirstName(event.target.value);
})

form.lastName.addEventListener("change" , (event) => {
    console.log(event.target.value);
    checkLastName(event.target.value);
})

form.address.addEventListener("change" , (event) => {
    console.log(event.target.value);
    checkAddress(event.target.value);
})

form.city.addEventListener("change" , (event) => {
    console.log(event.target.value);
    checkCity(event.target.value);
})

form.email.addEventListener("change" , (event) => {
    console.log(event.target.value);
    checkEmail(event.target.value);
})

function checkFirstName(prenom){
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    if(regexChar.test(prenom)){
        firstNameErrorMsg.innerHTML = '';
    }else{
        firstNameErrorMsg.innerHTML = 'error';
    }
}

function checkLastName(nom){
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if(regexChar.test(nom)){
        lastNameErrorMsg.innerHTML = '';
    }else{
        lastNameErrorMsg.innerHTML = 'error';
    }
}

function checkAddress(adresse){
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    if(regexAdress.test(adresse)){
        addressErrorMsg.innerHTML = '';
    }else{
        addressErrorMsg.innerHTML = 'error';
    }
}

function checkCity(ville){
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    if(regexChar.test(ville)){
        cityErrorMsg.innerHTML = '';
    }else{
        cityErrorMsg.innerHTML = 'error';
    }
}

function checkEmail(email){
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    if(regexEmail.test(email)){
        emailErrorMsg.innerHTML = '';
    }else{
        emailErrorMsg.innerHTML = 'error';
    }
}