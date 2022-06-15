let cartContent = JSON.parse(localStorage.getItem("productStored"));

console.table(cartContent);

// let totalPrice = 0;
let totalQtty = 0;
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

function getForm(){

    const btn_sendForm = document.getElementsByClassName("cart__order__form__submit");
    console.log(btn_sendForm);

    btn_sendForm.addEventListener("click", (event) => {
        event.preventDefault();
            
        const formValue = {
            prenom : document.getElementsByClassName('firstName').value,
            nom : document.getElementsByClassName('lastName').value,
            adresse : document.querySelector('address').value,
            ville : document.querySelector('city').value,
            email : document.querySelector('email').value,
        }
    })
}

getForm();
