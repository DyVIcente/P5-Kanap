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
        console.log(product);  // ça fonctionne, et ça fait du bien ! 
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
            document.querySelector("#colors").innerText += `${product.colors}`;
            // les couleurs toujours pas avec getbyid et query vu qu'il y en a plusieurs doit y avoir un truc à faire, à voir !
            document.querySelector('title').innerText = `${product.name}`;
      }

   









