let cartContent = JSON.parse(localStorage.getItem("productStored")); // Récupération du localStorage 
console.table(cartContent);

var productWithPrice = []; // Déclaration du tableau qui va recevoir le produit avec son prix
let formCompleted = true;

/////////////////////////////////////////////////////////////AFFICHAGE PANIER + QTY ET PRIX TOTAL////////////////////////////////////////////////////////////////////

// Récupération des produits
fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then((data) => {
    for(let i = 0; i < cartContent.length; i++){
        // La fonction find va isoler les produits disposant du même id pour ensuite y stocker le prix
        let productPrice = data.find(el => el._id === cartContent[i].id).price; 
        console.log(productPrice);

        // Déclaration d'un nouvel objet contenant l'id et le prix du produit puis push dans le tableau productWithPrice
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
         
        let price = productWithPrice.find(el => el.id === cartContent[i].id).price; // On isole le prix dans une variable dédiée

        totalPrice += price * parseInt(cartContent[i].quantity); //Calcul du prix total

        //Affichage des produits dans le panier
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
        totalQtty += itemQty[i].valueAsNumber; // Calcul de la quantité totale
    }
    
    // Affichage dynamique de la quantité totale 
    let productTotalQty = document.getElementById('totalQuantity');
    productTotalQty.innerHTML = totalQtty;
    console.log(totalQtty);
        
    // Affichage dynamique du prix total
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);

    modifyQty();
    removeProduct();
}) 

/////////////////////////////////////////////////////////////MODIFICATION QUANTITE////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////SUPPRESSION PRODUIT////////////////////////////////////////////////////////////////////

function removeProduct(){
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < btn_supprimer.length; i++){
        btn_supprimer[i].addEventListener("click" , (event) => { // Le code suivant sera lancé lorsqu'une modification de la valeur de l'input sera détectée
            event.preventDefault();

            let idDelete = cartContent[i].id;
            let colorDelete = cartContent[i].color;

            cartContent = cartContent.filter( el => el.id !== idDelete || el.color !== colorDelete ); // Filtrage de l'élément qui ne correspond pas aux conditions
            
            localStorage.setItem("productStored", JSON.stringify(cartContent));

            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}

/////////////////////////////////////////////////////////////VALIDATION DU FORMULAIRE////////////////////////////////////////////////////////////////////

function getForm(){
    let form = document.querySelector(".cart__order__form");
    
    const regexChar =  /^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]+$/;
    const regexAdress = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,.'-]{3,}$/; 
    const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const prenom = document.getElementById("firstName");
    const nom = document.getElementById("lastName");
    const ville = document.getElementById("city");
    const adresse = document.getElementById("address");
    const mail = document.getElementById("email");
    
    // Chaque constante du formulaire dispose de sa fonction de validation par les regex 
    // La fonction de validation sera lancé lorsqu'un evenement de type change aura ete détecté dans l'input correspondant 
    
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
            formCompleted = false;
            console.log(formCompleted);
        }
    }
    
    function checkLastName(nom){
        const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        if(regexChar.test(nom)){
            lastNameErrorMsg.innerHTML = '';
        }else{
            lastNameErrorMsg.innerHTML = 'error';
            formCompleted = false;
            console.log(formCompleted);
        }
    }
    
    function checkAddress(adresse){
        const addressErrorMsg = document.getElementById("addressErrorMsg");
        if(regexAdress.test(adresse)){
            addressErrorMsg.innerHTML = '';
        }else{
            addressErrorMsg.innerHTML = 'error';
            formCompleted = false;
            console.log(formCompleted);
        }
    }
    
    function checkCity(ville){
        const cityErrorMsg = document.getElementById("cityErrorMsg");
        if(regexChar.test(ville)){
            cityErrorMsg.innerHTML = '';
        }else{
            cityErrorMsg.innerHTML = 'error';
            formCompleted = false;
            console.log(formCompleted);
        }
    }
    
    function checkEmail(email){
        const emailErrorMsg = document.getElementById("emailErrorMsg");
        if(regexEmail.test(email)){
            emailErrorMsg.innerHTML = '';
        }else{
            emailErrorMsg.innerHTML = 'error';
            formCompleted = false;
            console.log(formCompleted);
        }
    }
    console.log(formCompleted);
}
getForm();

    /////////////////////////////////////////////////////////////ENVOI DE LA COMMANDE////////////////////////////////////////////////////////////////////
    
    function sendOrder(){
        
        console.log(formCompleted);
        
        let btn__order = document.getElementById("order");
        
        btn__order.addEventListener("click", (event) => {
            event.preventDefault();
            
        let onlyId = []; // L'api ne pouvant recevoir que l'id produit, on déclare un tableau vide qui contiendra seulement l'id des produits demandés.
        
        const prenom = document.getElementById("firstName").value;
        const nom = document.getElementById("lastName").value;
        const ville = document.getElementById("city").value;
        const adresse = document.getElementById("address").value;
        const mail = document.getElementById("email").value;
        
        // Préparation des objets à envoyer à l'api.
        
        let contactOrder = {
            firstName: prenom,
            lastName: nom,
            city: ville,
            address: adresse,
            email: mail,
        }
        console.log(contactOrder);
        
        // Boucle for servant à isoler l'id des produits du panier 
        for(let i = 0; i < cartContent.length; i++){
            let productId = cartContent[i].id;
            console.log(productId);
            onlyId.push(productId);
        }
        
        // Objet qui sera envoyé à l'api
        const toSend = {
            'products': onlyId,
            'contact': contactOrder,
        }
        
        console.log(toSend);
        
        if(formCompleted){
            alert('Commande validé!');
            const promise01 = fetch('http://localhost:3000/api/products/order',{
                method: 'POST',
                body: JSON.stringify(toSend),
                headers: {
                    "Content-type" : 'application/json;charset=utf-8',
                    "Accept" : 'applicattion/json',
                }
            })
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                console.log(data);
                localStorage.setItem("orderId", data.orderId) // OrderID placé dans le LocalStorage avant changement de page
                window.location.replace("./confirmation.html");
            })
            .catch(function(err) {
                console.log("erreur!");
            })
        }else{
            alert('Veuillez completer le formulaire');
        }
        
    })
}
sendOrder();
