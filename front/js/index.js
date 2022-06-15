let productsData = []; // Déclaration du tableau qui contenant les données de l'api
const productsList = document.getElementById("items"); // Assignation de la variable productList à l'ID Item du DOM

fetch('http://localhost:3000/api/products') // Fonction permettant de récuperer les données de l'api
    .then(res => res.json())
    .then((data) => { // Les données du tableau seront placés dans data
        productsData = data; // productsData prend les données de data 
        console.log(productsData);

        for(let i = 0; i < productsData.length; i++){ //Boucle permettant l'affichage des tous les objets json
            
            //Création du lien vers la page produit
            let productLink = document.createElement("a");
            productLink.setAttribute("href", `product.html?id=${productsData[i]._id}`);
            productsList.appendChild(productLink);

            //Création de la card
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);
            
            //Affichage des images + attribut alt
            let productImg = document.createElement("img");
            productImg.setAttribute("src", productsData[i].imageUrl);
            productImg.setAttribute("alt", productsData[i].altTxt);
            productArticle.appendChild(productImg);

            //Affichage du nom des produits
            let productName = document.createElement("h3");
            productName.textContent = productsData[i].name;
            productArticle.appendChild(productName);

            //Affichage de la description des produits
            let productDescription = document.createElement("p");
            productDescription.textContent = productsData[i].description;
            productArticle.appendChild(productDescription);
        }
    })

    .catch((error) =>{ //Message en cas d'erreur d'obtention des données
        console.log("Le chargement des données à rencontré un problème." +error);
    });

