let productsLS = JSON.parse(localStorage.getItem("produit"));

console.table(productsLS);






displayCart();

// Si le panier est vide
async function displayCart() {
    const positionEmptyCart = document.getElementById("cart__items");
    if (productsLS === null || productsLS == 0) {
        positionEmptyCart.textContent = "Votre panier est vide";
        positionEmptyCart.style.textAlign = "center";
        console.log("Panier vide");
    } else {

        for (let produit in productsLS) { // Boucler sur les produits du panier


            const product = await getArticle(productsLS[produit]._id);
            console.log(product);










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
            itemTitle.textContent = productsLS[produit].name;

            let itemColor = document.createElement("p"); // <p>Vert</p>
            itemTitle.appendChild(itemColor);
            itemColor.textContent = productsLS[produit].color;

            let itemPrice = document.createElement("p"); //  <p>42,00 €</p>  :: ************************* PRICE ********
            itemTitle.appendChild(itemPrice);
            itemPrice.textContent = product.price + " euros";

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
            supprimerItem.textContent = "Supprimer";

            // calcul prix total  !
            async function prixTotal(){
            let lenghtItem = productsLS.length;
            totalPrix = 0;

            for (let i = 0; i < lenghtItem; i++) {
                const product = await getArticle(productsLS[produit]._id);
                totalPrix += parseInt(productsLS[i].quantity) * product.price;
                console.log(totalPrix);
            }


            let quantiteTotalPrix = document.getElementById("totalPrice");
            quantiteTotalPrix.textContent = totalPrix;
        }



            // modif quantité   !
          async  function modifyProduct() {
                let quantiteDeBase = document.querySelectorAll(".itemQuantity");

                for (let i = 0; i < quantiteDeBase.length; i++) {
                    

                    quantiteDeBase[i].addEventListener("change", function (event) {
                        event.preventDefault();

                        let newQuantitedeBase = quantiteDeBase[i].value;
                        const newLS = {

                            _id: productsLS[i]._id,
                            imageUrl: productsLS[i].imageUrl,
                            altTxt: productsLS[i].altTxt,
                            name: productsLS[i].name,
                            color: productsLS[i].color,
                            quantity: newQuantitedeBase,
                        };
                        productsLS[i] = newLS;
                        localStorage.setItem('produit', JSON.stringify(productsLS));
                        
                        quantiteTotal();
                        prixTotal();
                    })
                }
            }
            modifyProduct();
        }


    }

    // appel a l'api pour les produits par rapport a leurs id
    async function getArticle(productId) {
        return fetch("http://localhost:3000/api/products/" + productId)
            .then((res) => {
                return res.json();
            })


            .catch((error) => {
                console.log("Erreur API");
            })

            .then(function (product) {
                // console.log(product);
                // console.log(product.price);             // la je vois bien les prix dans les log
                // console.log(`${product.price}`);

                return product;
            });
    }



    //*********** */ quantité total  des produits 



    function quantiteTotal() {



        let lenghtItem = productsLS.length;
        totalBase = 0; // on definit le total de base à 0 pour pouvoir ajouter 



        for (let i = 0; i < lenghtItem; i++) {  // boucle pour ajouter la quanité et le prix * quantité
            totalBase += parseInt(productsLS[i].quantity);

        }


        let quantiteTotalProduit = document.getElementById("totalQuantity");
        quantiteTotalProduit.textContent = totalBase;
        // on ajoute au html


        // pareil pour le prix

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
                alert("Produit supprimé");
                location.reload(); // rechargement de la page après suppression pour afficher le nouveau panier
            })
        }
    }


    deleteProduct();

}


// ****** *Formulaire et regex ******* 
//Récupération des coordonnées du formulaire client
let inputFirstName = document.getElementById('firstName');    // on recupere les input dans les elements du formulaire
let inputLastName = document.getElementById('lastName');
let inputAddress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputEmail = document.getElementById('email');

function getForm() {

    let form = document.querySelector(".cart__order__form");





    //ecoute sur la modification du input du form email 
    form.email.addEventListener('change', function () {
        validEmail(this)
    });

    //ecoute sur la modification du input du form prénnom
    form.firstName.addEventListener('change', function () {
        validfirstName(this)
    });

    //ecoute sur la modification du input du form nom
    form.lastName.addEventListener('change', function () {
        validlastName(this)
    });

    //ecoute sur la modification du input du form adresse
    form.address.addEventListener('change', function () {
        validaddress(this)
    });

    //ecoute sur la modification du input du form ville
    form.city.addEventListener('change', function () {
        validcity(this)
    });








    // ****** Validation Email *********** 
    const validEmail = function (inputEmail) {
        // Creation de la reg exp pour validation email
        let emailRegexp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

        // recuperation de la balise emailErrorMsg
        let emailErrorMsg = inputEmail.nextElementSibling;

        // On test l'expression reguliere "<span style='color: red;'>**Message</span>";
        if (emailRegexp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = "<span style='color: green;' > Email Valide</span>";
            return true;
        } else {
            emailErrorMsg.textContent = 'Email Non Valide';
            return false;
        }
    };


    // ****** Validation Prénom *********** 
    const validfirstName = function (inputFirstName) {
        // Creation de la reg exp pour validation Prénom
        let FirstNameRegexp = new RegExp("^[a-zA-Z ,.'-]+$");

        // recuperation de la balise FirstNameErrorMsg
        let FirstNameErrorMsg = inputFirstName.nextElementSibling;

        // On test l'expression reguliere
        if (FirstNameRegexp.test(inputFirstName.value)) {
            FirstNameErrorMsg.innerHTML = "<span style='color: green;' > Prénom Valide</span>";
            return true;
        } else {
            FirstNameErrorMsg.textContent = 'Prénom Non Valide';
            return false;
        }
    };

    // ****** Validation Nom *********** 
    const validlastName = function (inputLastName) {
        // Creation de la reg exp pour validation email
        let lastNameRegexp = new RegExp("^[a-zA-Z ,.'-]+$");

        // recuperation de la balise emailErrorMsg
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        // On test l'expression reguliere
        if (lastNameRegexp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = "<span style='color: green;' > Nom Valide</span>";
            return true;
        } else {
            lastNameErrorMsg.textContent = 'Nom Non Valide';
            return false;
        }
    };

    // ****** Validation Adresse *********** 
    const validaddress = function (inputAddress) {
        // Creation de la reg exp pour validation email
        let addressRegexp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");;

        // recuperation de la balise emailErrorMsg
        let addressErrorMsg = inputAddress.nextElementSibling;

        // On test l'expression reguliere
        if (addressRegexp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = "<span style='color: green;' > Adresse Valide</span>";
            return true;
        } else {
            addressErrorMsg.textContent = 'Adresse Non Valide';
            return false;
        }
    };

    // ****** Validation Ville *********** 
    const validcity = function (inputCity) {
        // Creation de la reg exp pour validation email
        let cityRegexp = new RegExp("^[a-zA-Z ,.'-]+$");

        // recuperation de la balise emailErrorMsg
        let cityErrorMsg = (inputCity.nextElementSibling);

        // On test l'expression reguliere
        if (cityRegexp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = "<span style='color: green;' > Ville Valide</span>";
            return true;
        } else {
            cityErrorMsg.textContent = 'Ville Non Valide';
            return false;
        }
    };




    //Ecouter le panier
    form.addEventListener("submit", function (event) {      // on écoute le sbmit sur le bouton order

        event.preventDefault();
        if (
            validEmail(inputEmail) &&
            validfirstName(inputFirstName) &&
            validlastName(inputLastName) &&
            validaddress(inputAddress) &&
            validcity(inputCity)

        ) {
            console.log('info valid');
            postForm();

        } else {
            console.log('info non valid');
        }
        return false;
    });



}

getForm();



function postForm() {



    //on construit un tableau de produit
    let productIds = [];
    for (let i = 0; i < productsLS.length; i++) {  // on boucle sur les produits présents / autant d'id produit qu'il y a de quantité
        for (let j = 1; j <= productsLS[i].quantity; j++) {
            productIds.push(productsLS[i]._id);
        }



        // on push d                                   let j = 0 ; j = productsLS.quantity ; j++ 
    }
    console.log(productIds);                       // on récupère bien 

    const order = {                                   // construction d'un objet contact 
        contact: {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            email: inputEmail.value,

        },
        products: productIds,
    }

    console.log(order);



    const options = {          // envoi de order par method post 
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    };

    fetch("http://localhost:3000/api/products/order", options)   // !!!!!!! fetch sur l'order avec la const options 

        .then(function (response) {
            return response.json()
        })

        .then(function (data) {
            console.log(data);   
            orderId = data.orderId;
           console.log(orderId);

           if (orderId != "") {
            location.href="confirmation.html?id=" + orderId;
        }

        })
        
        .catch(function (erreur) {
            alert("erreur");
        });

        
}
