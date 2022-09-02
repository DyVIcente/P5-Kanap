let produitId = function () {
    return new URL(location.href).searchParams.get("id");
};   // On recup l'id des canap avec search qui renvoit les url de locationhref pour recup les bonnes url puis on chope l'id

const productId = produitId();
// on dit donc que l'id recup et égal a l'id de la variable product id , oui tu vois ou je veux en venir 

fetch(`http://localhost:3000/api/products/${productId}`) // on fetch du coup l'url avec la variable productid qui sera bien la bonne vu ce qu'on a fait au dessus ! clever ! 

    .then(function (response) {  
        console.log(response);
        return response.json();   // on recup les infos en json, comme sur la page script on commence à s'y connaitre un peu à ce point
    })

    .then(function (product) {
        elementDesProduits (product); // le beau produit est là ! on console log et bim les infos du produit, puis qu'a les dispatch aux bons endroits
        console.log(product);
        ajouterPanier(); // ça fonctionne, et ça fait du bien ! 
    })

    .catch(function(error) {
        let itemerror = document.querySelector(".item");
        itemerror.innerHTML = "Pas de Kanap pour toi ! ";
        itemerror.style.textAlign = "center";
    })

     let elementDesProduits = function(product) {  // les elem des produits on les dispatch
            document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
            // l'img avec la ligne html  dans producthtml merci ! 
            document.getElementById("title").innerText += `${product.name}`;
            // le nom on select l'id c'est cool 
            document.getElementById("price").innerText += `${product.price}`;
            // meme combat avec le prix et son id 
            document.getElementById("description").innerText += `${product.description}`;
            // tu l'as vu venir ? meme chose encore une fois !
            document.querySelector('title').innerText = `${product.name}`;
            // Le title aussi ! 


// les couleurs toujours pas avec getbyid et query vu qu'il y en a plusieurs doit y avoir un truc à faire, à voir !
           let pRainbow = document.getElementById("colors"); // on dit que #colors c'est p 
           for (let i =0; i < product.colors.length; i++) { // on boucle pour ajouter les couleurs tant qu'il y en a
            let option = document.createElement("option"); // on dit que option c'est créer l'élément option
            let colors = i; // on dit que colors c'est i ! 
            option.innerText = product.colors[colors]; // pb j'ai toutes les couleurs parce que c'est un variable, idiot fallait mettre entre crochet pour un array !!!!!!
            pRainbow.appendChild(option); // pour finir on appendchild a p pour qu'option ajoute un noeud en dessous ! 
            // merci d'avoir lu mon tedtalk !
           }
      }

      let ajouterPanier = function() {
        
        const button = document.querySelector("#addToCart");
        const quantityKanap = document.querySelector("#quantity"); // On def quelques constantes pour les récupérer 
        const colorKanap = document.querySelector("#colors");

        button.addEventListener("click", function(cliquetis) { // on écoute sur le button le click

            cliquetis.preventDefault(); // on fait notre action et pas celle par defaut
            
            if (quantityKanap.value > 0 && quantityKanap.value < 100) { // si on a entre 0 et 100 KANAP

                
                
                let productAjoutés = {
                    _id: productId,
                    quantity:(document.querySelector("#quantity").value), 
                    color: colorKanap.value,
                    
            };
                
                console.log(productAjoutés);  // On recup les trois valeurs id quantité et couleur demandé dasn étapes clés !
            
            
               // au début javais fait un log sur chaque click sur la page, mais maintenant que je veux cibler #addToCart j'ai R ! 
                
        }
                else{
                    alert("Sélectionnez un nombre de Canapé ! ")
                }
 

   /**** Gestion du localStorage ****/

      // Récupération des données du localStorage
      class Cart {
        constructor(){}
      existingCart = JSON.parse(localStorage.getItem("cart"));
      }
      // Si le localStorage existe
     
      if (Cart.existingCart) {
        console.log("Il y a déjà un produit dans le panier, on compare les données");

        // On recherche avec la méthode find() si l'id et la couleur d'un article sont déjà présents
        let item = Cart.existingCart.find( 
            (item) => 
            item._id === productAjoutés._id && item.color === productAjoutés.color
            );

        // Si oui, on incrémente la nouvelle quantité 
        if (item) {
          item.quantity = item.quantity + productAjoutés.quantity;
          localStorage.setItem("cart", JSON.stringify(existingCart));
          console.log("Quantité supplémentaire dans le panier.");
          return;
        }

        // Si non, alors on push le nouvel article sélectionné
        Cart.existingCart.push(productAjoutés);
        localStorage.setItem("cart", JSON.stringify(Cart.existingCart));
        console.log("Le produit a été ajouté au panier");

      } else {
        // Sinon création d'un tableau dans le lequel on push l'objet "productAjoutés"
        let createLocalStorage = [];
        createLocalStorage.push(ajouterPanier);
        localStorage.setItem("cart", JSON.stringify(createLocalStorage));
        console.log("Le panier est vide, on ajoute le premier produit");
      }
    }
        )};
;




    
