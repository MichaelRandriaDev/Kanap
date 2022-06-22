const urlParams = new URLSearchParams(window.location.search); // Récupération de l'url dans un format utilisable
const urlID = urlParams.get("id"); // Récupération d'un paramètre situé dans l'url

let product = [];

const colorChoiced = document.querySelector("#colors");
const quantityChoiced = document.querySelector("#quantity");

/////////////////////////////////////////////////////////////AFFICHAGE PRODUIT////////////////////////////////////////////////////////////////////

// Récupération des données de l'api en fonction de l'ID du produit
fetch(`http://localhost:3000/api/products/${urlID}`)
    .then((res) => res.json())
    .then((data) =>{
        product = data;
        console.log(data);
        // Affichage du produit unique
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

        addBasket(product);
        })
        
        .catch((error) =>{ //Message en cas d'erreur d'obtention des données
            alert("Le chargement des données à rencontré un problème." +error);
        });
;

/////////////////////////////////////////////////////////////AJOUT AUX PANIER////////////////////////////////////////////////////////////////////

function addBasket() {

    // Sélection du bouton d'ajout produit dans le DOM
    const btn_addBasket = document.querySelector("#addToCart");

    // La suite de code suivante sera lancée grâce à l'addEventListener Click qui a été appliqué au bouton du DOM
    btn_addBasket.addEventListener("click", (event) => {
        if (quantityChoiced.value > 0 && quantityChoiced.value <= 100) { // La condition if sera lancé si la quantité du produit demandé est strictement supérieure à 0 et inférieure ou égale à 100

            let choixCouleur = colorChoiced.value; // On donne à la variable choixCouleur la valeur de l'input du DOM
            let choixQuantite = quantityChoiced.value; // On donne à la variable choixQuantite la valeur de l'input du DOM
            
            // Récupération de l'item productStored situé dans le local storage
            let cartContent = JSON.parse(localStorage.getItem("productStored"));

            let newProduct = { // Création du nouvel objet destiné a être envoyé dans le local storage. 
                id: product._id,
                name: product.name,
                color: choixCouleur,
                quantity: choixQuantite,
                image: product.imageUrl,
                description: product.description,
                alt: product.altTxt,
            };

            if (cartContent) {// Si cartContent existe déjà, verification si le produit dispose du même id et de la même couleur
            const cartContentNotEmpty = cartContent.find((el) => el.id === newProduct.id && el.color === newProduct.color);

                if (cartContentNotEmpty) { // Le produit dispose du même id et de la même couleur
                    let newQuantity = parseInt(newProduct.quantity) + parseInt(cartContentNotEmpty.quantity); // addition de la nouvelle quantité avec l'ancienne quantité
                    cartContentNotEmpty.quantity = newQuantity; // On donne la nouvelle quantité au cartContent déjà existant
                    localStorage.setItem("productStored", JSON.stringify(cartContent)); // Maj dans le localStorage
                    console.table(cartContent);
                } else {
                    cartContent.push(newProduct); // Le cartContent existe déjà mais ne dispose pas des mêmes id et couleurs, un nouveau produit est donc ajouté 
                    localStorage.setItem('productStored', JSON.stringify(cartContent)); // Maj dans le localstorage
                    console.table(cartContent);
                }
            } else { // Le panier est vide, on envoi seulement le nouveau produit dans le localStorage
                cartContent = [];
                cartContent.push(newProduct);
                localStorage.setItem("productStored", JSON.stringify(cartContent));
                console.table(cartContent);
            }

        } else {
            alert("Veuillez choisir un nombre en 1 et 100"); // La condition du if n'étant pas validé, un message d'erreur est affiché.
        }
        alert("Produit ajouté à votre panier.");
    })
}