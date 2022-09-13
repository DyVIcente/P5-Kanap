
let productsLS = JSON.parse(localStorage.getItem("produit"));

console.table(productsLS);

// apppel du prix des produits, pour les distribuer dans la page:

getArticle();
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPrice(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}
    
function getPost(article){

}

  

       








displayCart();

// Si le panier est vide
function displayCart() {
    if (productsLS === null || productsLS == 0) {
        console.log("Panier vide");
    } else {

        for (let produit in productsLS) { // Boucler sur les produits du panier

            let produitArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(produitArticle);   //article  <article   
            produitArticle.classList.add("cart__item"); //class="cart__item"
            produitArticle.setAttribute('data-id', productsLS[produit]._id); //data-id="{product-ID}"
            produitArticle.setAttribute('data-color', productsLS[produit].color);     //data-color="{product-color}">    


            let divImgage = document.createElement("div");      // div <div class="cart__item__img">
            produitArticle.appendChild(divImgage);
            divImgage.classList.add("cart__item__img");


            let imageItem = document.createElement("img");
            divImgage.appendChild(imageItem);
            imageItem.src = productsLS[produit].imageUrl;    //<img src="../images/product01.jpg" alt="Photographie d'un canapé">
            imageItem.alt = productsLS[produit].altTxt;


            let carItemContent = document.createElement("div");   //<div class="cart__item__content">
            produitArticle.appendChild(carItemContent);
            carItemContent.classList.add("cart__item__content");

            let carItemContentDesp = document.createElement("div"); // <div class="cart__item__content__description">
            carItemContent.appendChild(carItemContentDesp);
            carItemContentDesp.classList.add("cart__item__content__description");

            let itemTitle = document.createElement("h2");   // <h2>Nom du produit</h2>
            carItemContentDesp.appendChild(itemTitle);
            itemTitle.innerHTML = productsLS[produit].name;

            let itemColor = document.createElement("p"); // <p>Vert</p>
            itemTitle.appendChild(itemColor);
            itemColor.innerHTML = productsLS[produit].color;

            let itemPrice = document.createElement("p"); //  <p>42,00 €</p>
            itemTitle.appendChild(itemPrice);
            itemPrice.innerHTML = productsLS[produit].price + " euros";

            let cartItemSetting = document.createElement("div"); //<div class="cart__item__content__settings">
            carItemContent.appendChild(cartItemSetting);
            cartItemSetting.classList.add("cart__item__content__settings");

            let cartItemSettingquantity = document.createElement("div"); //<div class="cart__item__content__settings__quantity">
            cartItemSetting.appendChild(cartItemSettingquantity);
            cartItemSettingquantity.classList.add("cart__item__content__settings__quantity");

            let itemQuantity = document.createElement("p"); // <p>Qté : </p>
            cartItemSettingquantity.appendChild(itemQuantity);
            itemQuantity.innerHTML = "<p>Qté : </p>";

            let itemQuantityInput = document.createElement("input"); // <input      
            cartItemSettingquantity.appendChild(itemQuantityInput);
            itemQuantityInput.classList.add("itemQuantity");    //class="itemQuantity"
            itemQuantityInput.setAttribute("type", "number");   //type="number"
            itemQuantityInput.setAttribute("name", "itemQuantity");//name="itemQuantity"
            itemQuantityInput.setAttribute("min", "1"); //min="1"
            itemQuantityInput.setAttribute("max", "100");//max="100"
            itemQuantityInput.value = productsLS[produit].quantity;//value= quantité d'item

            let itemContentSettingDelete = document.createElement("div"); // <div class="cart__item__content__settings__delete">
            cartItemSetting.appendChild(itemContentSettingDelete);
            itemContentSettingDelete.classList.add("cart__item__content__settings__delete");

            let supprimerItem = document.createElement("p"); //<p class="deleteItem">Supprimer</p>
            itemContentSettingDelete.appendChild(supprimerItem);
            supprimerItem.classList.add("deleteItem");
            supprimerItem.innerHTML = "Supprimer";

        }

    }
}


//*********** */ quantité total et prix total des produits 



function quantiteTotal() {



    let lenghtItem = productsLS.length;
    totalBase = 0; // on definit le total de base à 0 pour pouvoir ajouter 
    totalPrix = 0;


    for (let i = 0; i < lenghtItem; i++) {  // boucle pour ajouter la quanité et le prix * quantité
        totalBase += parseInt(productsLS[i].quantity);
        totalPrix += parseInt(productsLS[i].quantity * productsLS[i].price);
    }


    let quantiteTotalProduit = document.getElementById("totalQuantity");
    quantiteTotalProduit.innerHTML = totalBase;
    // on ajoute au html

    let quantiteTotalPrix = document.getElementById("totalPrice");
    quantiteTotalPrix.innerHTML = totalPrix;




}

quantiteTotal();



//***********Suppression d'un produit 

function deleteProduct() {



    let boutonSuppr = document.querySelectorAll(".deleteItem"); //

    for (let i = 0; i < boutonSuppr.length; i++) { // on  boucle sur les boutons suppr présent sur la page

        boutonSuppr[i].addEventListener("click", function (event) { // on écoute le click sur ces boutons 


            let supprId = productsLS[i]._id;    // on def l'id et la couleur a sppr
            let supprColor = productsLS[i].color;

            //La méthode filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback.

            productsLS = productsLS.filter(i => i._id !== supprId || i.color !== supprColor); // il faut que l'id et la couleur soit differente de celle suppr 

            localStorage.setItem("produit", JSON.stringify(productsLS)); // push des nouveaux elements qui n'ont pas été suppr
            console.log("Produit supprimé");
            location.reload(); // rechargement de la page après suppression pour afficher le nouveau panier
        })
    }
}


deleteProduct();



// Modification d'une quantité de produit
function modifyProduct() {
    let quantiteDeBase = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < quantiteDeBase.length; i++){

        quantiteDeBase[i].addEventListener("change" , function (event) {  

           
            let supprId = productsLS[i]._id;    // on def l'id et la couleur a sppr
            let supprColor = productsLS[i].color;
            let modifQuantite = productsLS[i].quantity;
            let qttModifValue = parseInt(quantiteDeBase[i].quantity);
            
            const resultmodif = productsLS.find((i) =>sdzdszdz );

// si couleur et id identique mais quantite dif , on prend la nouvelle 

           
           

           // localStorage.setItem("produit", JSON.stringify(productsLS)); push 
        
             
            //location.reload(); et rechargement de page
     })
    }
}
modifyProduct();

