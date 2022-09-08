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
        elementDesProduits(product); // le beau produit est là ! on console log et bim les infos du produit, puis qu'a les dispatch aux bons endroits
        console.log(product);
        ajouterPanier(); // ça fonctionne, et ça fait du bien ! 
    })

    .catch(function (error) {
        let itemerror = document.querySelector(".item");
        itemerror.innerHTML = "Pas de Kanap pour toi ! ";
        itemerror.style.textAlign = "center";
    })

let elementDesProduits = function (product) {  // les elem des produits on les dispatch
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
    for (let i = 0; i < product.colors.length; i++) { // on boucle pour ajouter les couleurs tant qu'il y en a
        let option = document.createElement("option"); // on dit que option c'est créer l'élément option
        let colors = i; // on dit que colors c'est i ! 
        option.innerText = product.colors[colors]; // pb j'ai toutes les couleurs parce que c'est un variable, idiot fallait mettre entre crochet pour un array !!!!!!
        pRainbow.appendChild(option); // pour finir on appendchild a p pour qu'option ajoute un noeud en dessous ! 
        // merci d'avoir lu mon tedtalk !
    }
}

let ajouterPanier = function () {

    const button = document.querySelector("#addToCart");
    const quantityKanap = document.querySelector("#quantity"); // On def quelques constantes pour les récupérer 
    const colorKanap = document.querySelector("#colors");

    button.addEventListener("click", function (cliquetis) { // on écoute sur le button le click

        cliquetis.preventDefault(); // on fait notre action et pas celle par defaut

        if (quantityKanap.value > 0 && quantityKanap.value < 100) { // si on a entre 0 et 100 KANAP



            let productAjoutés = {
                _id: productId,
                quantity: (document.querySelector("#quantity").value),
                color: colorKanap.value,

            };

            console.log(productAjoutés);  // On recup les trois valeurs id quantité et couleur demandé dasn étapes clés !




            // Gestion du localStorage
            class Cart {
                constructor() {
                   let existingCart = JSON.parse(localStorage.getItem("cart"));  // récupération des données 
                
                    console.log(existingCart);

                    if (existingCart === null) {
                        existingCart = []
                    }

                }


                save() {
                    localStorage.setItem("cart", JSON.stringify(existingCart))   // on save et ajoute avec clé cart et valeur en json en texte
                }



                addToCart(item) {
                    const cartItem = existingCart.find((item) => item._id === productAjoutés._id && item.color === productAjoutés.color)
                    //find renvoi la valeur du premier élément trouvé qui respecte la condition
                    //ici, si le produit à la même id et même couleur : 

                    if (cartItem) {
                        item.quantity += productAjoutés.quantity   // on ajoute a la quantité
                        //console.log("Quantité supplémentaire dans le panier.");
                    }
                    else {
                        item.products.push(productAjoutés)   // sinon on push ( ajoute a la suite du tableau)
                        // console.log("Le produit a été ajouté au panier");
                    }

                    this.save();
                  
                   // pour finir on save  ?
                }
                
           
            }
        }
    }
    );
}





