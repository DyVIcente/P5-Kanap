// allo l'API tu m'entends ? si oui, envois les infos en json stp
fetch("http://localhost:3000/api/products/")
  .then(function (response) { 
    if (response.ok) {
      return response.json();
    }
  }) 
  // Création d'une liste des produits à partir des données de l'API
  .then(function(products) {
    
// Pour les produits on change le html pour incorporer ce qu'on nous donne dans index
    for(let product of products) {
      let i = 0; i < product.length; i++; 
      // boucle for qui démare à 0 et qui continue d'etre executer jusqu'a qu'il n'y ai plus de produit, et ça c'est beau
      // On chope l'id items et on change son HTML , bim c'est  magique ! 
      document.getElementById("items").innerHTML += 

      `<a href="./product.html?id=${product._id}">
                                                     
      <article>
                                                       
      <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                       
      <h3 class="productName">${product.name}</h3>
                                                       
      <p class="productDescription">${product.description}</p>
                                                      
      </article>
                                                   
      </a>`
    }
  })

  // On affiche un message d'erreur des plus délicieux
  .catch(function(error) {
    let itemsNotFound = document.querySelector(".items");
    itemsNotFound.innerHTML = "Erreur, vérifier que le port 3000 est ouvert, merci, prennez soin de vous, on se voit à la piscine, Bisous";

  });