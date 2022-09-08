
let productsLS = JSON.parse(localStorage.getItem("produit"));
console.table(productsLS);

// Si le panier est vide
function displayCart() {
    if (productsLS === null || productsLS == 0) {
        console.log("Panier vide");
    } else {

        for (let produit in productsLS) { // Boucler sur les produits du panier

            let produitArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(produitArticle);   //article  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            produitArticle.classList.add("cart__item");
            produitArticle.setAttribute('data-id', productsLS[produit]._id);
            produitArticle.setAttribute('data-color', productsLS[produit].color)                 // chercher pour ajouter dataid et datacolor

            let divImgage = document.createElement("div");      // div <div class="cart__item__img">
            produitArticle.appendChild(divImgage);
            divImgage.classList.add("cart__item__img");


            let image = document.createElement("img");
            divImgage.appendChild(image);
            image.src = productsLS[produit].imageUrl;    //<img src="../images/product01.jpg" alt="Photographie d'un canapé">
            image.alt = productsLS[produit].altTxt;


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
            itemPrice.innerHTML = productsLS[produit].price;

            let cartItemSetting = document.createElement("div"); //<div class="cart__item__content__settings">
            carItemContent.appendChild(cartItemSetting);
            cartItemSetting.classList.add("cart__item__content__settings");

            let cartItemSettingquantity = document.createElement("div"); //<div class="cart__item__content__settings__quantity">
            cartItemSetting.appendChild(cartItemSettingquantity);
            cartItemSettingDelete.classList.add("cart__item__content__settings__quantity");

            let itemQuantity = document.createElement("p"); // <p>Qté : </p>
            cartItemSettingquantity.appendChild(itemQuantity);
            // itemQuantity.innerHTML = ?

            let itemQuantityInput = document.createElement("input"); // <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            cartItemSettingquantity.appendChild(itemQuantityInput);
            itemQuantityInput.classList.add("itemQuantity");      // ajouter les type name etc;;

            let itemContentSettingDelete = document.createElement("div"); // <div class="cart__item__content__settings__delete">
            cartItemSetting.appendChild(itemContentSettingDelete);
            itemContentSettingDelete.classList.add("cart__item__content__settings__delete");

            let supprimer = document.createElement("p"); //<p class="deleteItem">Supprimer</p>
            itemContentSettingDelete.appendChild(supprimer);
            supprimer.classList.add("deleteItem");

        }

    }
}

displayCart();






