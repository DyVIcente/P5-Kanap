let produitId = function () {
    return new URL(location.href).searchParams.get("id");
};   // On désigne une nouvelle url sur cette page, avec searchparams et la method get qui récupère l'id.

const productId = produitId();
// on dit donc que l'id recup et égal a l'id de la variable product id , oui tu vois ou je veux en venir 
console.log(productId);
fetch(`http://localhost:3000/api/products/${productId}`) // on fetch du coup l'url avec la variable productid qui sera bien la bonne vu ce qu'on a fait au dessus ! clever ! 

    .then(function (response) {
        console.log(response);
        return response.json();   // on recup les infos en json, comme sur la page script on commence à s'y connaitre un peu à ce point
    })

    .then(function (product) {
        elementDesProduits(product); // le beau produit est là ! on console log et bim les infos du produit, puis qu'a les dispatch aux bons endroits
        console.log(product);
        ajouterPanier(product); // ça fonctionne, et ça fait du bien ! 
    })

    .catch(function (error) {
        let itemerror = document.querySelector(".item");
        itemerror.innerHTML = "Pas de Kanap ! ";
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



    let pRainbow = document.getElementById("colors"); // on dit que #colors c'est p 
    for (let i = 0; i < product.colors.length; i++) { // on boucle pour ajouter les couleurs tant qu'il y en a
        let option = document.createElement("option"); // on dit que option c'est créer l'élément option
        let colors = i; // on dit que colors c'est i ! 
        option.innerText = product.colors[colors]; // pb j'ai toutes les couleurs parce que c'est un variable, idiot fallait mettre entre crochet pour un array !!!!!!
        pRainbow.appendChild(option); // pour finir on appendchild a p pour qu'option ajoute un noeud en dessous ! 
        // merci d'avoir lu mon tedtalk !
    }
}


const button = document.querySelector("#addToCart");
const quantityKanap = document.querySelector("#quantity"); // On def quelques constantes pour les récupérer 
const colorKanap = document.querySelector("#colors");



let ajouterPanier = function (product) {



    button.addEventListener("click", function (cliquetis) { // on écoute sur le button le click

        cliquetis.preventDefault(); // on fait notre action et pas celle par defaut
        if (colorKanap.value == false) {
            confirm("Veuillez sélectionner une couleur.")
        } else if (quantityKanap.value == 0) {
            confirm("Veuillez sélectionner une quantité.")
        }
        else if (quantityKanap.value > 0 && quantityKanap.value < 100) { // si on a entre 0 et 100 KANAP



            let elementDesProduits = {
                _id: productId,
                quantity: (document.querySelector("#quantity").value),
                color: colorKanap.value,
                imageUrl: product.imageUrl,
                altTxt: product.altTxt,
                name: product.name,

                //  price: product.price,



            };
            alert("Votre article a bien été ajouté au panier");
            console.log(elementDesProduits);  // On recup les trois valeurs id quantité et couleur demandé dasn étapes clés !





            let productsLS = JSON.parse(localStorage.getItem("produit")); // productsLS est les produits recup dans le Localsotrage


            if (productsLS) {   // si productsLS  est déjà présent avec la meme id et meme couleur 
                const cartItem = productsLS.find((i) => i._id === productId && i.color === colorKanap.value);

                if (cartItem) {
                    let newQuantity = parseInt(elementDesProduits.quantity) + parseInt(cartItem.quantity); //parseInt en ajoutant les quantité pour pas qu'elles se mettent à la suite mais qu'elles s'ajoutent
                    cartItem.quantity = newQuantity;
                    localStorage.setItem("produit", JSON.stringify(productsLS)); // on store dans produit la nouvelle quantité
                    console.table(productsLS);


                } else {
                    productsLS.push(elementDesProduits); //Si le produit n'est pas déjà présent on ajoute les éléments à la fin du tableau 
                    localStorage.setItem("produit", JSON.stringify(productsLS)); // et on store à la suite 
                    console.table(productsLS);

                }

            } else {
                productsLS = []; // si le panier est vide on crée un tableau 
                productsLS.push(elementDesProduits); // on ajoute les éléments dans le tableau à la suite 
                localStorage.setItem("produit", JSON.stringify(productsLS)); // et on store dans le localstorage
                console.table(productsLS);


            }
        }
    });
}
