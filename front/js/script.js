
getArticles();


// allo l'API tu m'entends ? si oui, envois les infos en json stp
function getArticles() {
  fetch("http://localhost:3000/api/products/")

    .then(function (response) {  
        return response.json();     
    })

    
// On affiche un message d'erreur des plus délicieux
    .catch(function (error) {
      let itemsNotFound = document.querySelector(".items");
      itemsNotFound.innerHTML = "Erreur, vérifier que le port 3000 est ouvert, merci, prennez soin de vous, on se voit à la piscine, Bisous";

    })

    //  On ajoute les éléments des kanap 
    .then(function (resultatAPI) {
      const articles = resultatAPI;  // on dit qu'article  est le resustat de l'api 
      console.table(articles); // on affiche un tableau dans la console avec toutes les infos qu'on a recup
      // 
      for (let article in articles) {
        // du coup pour article dans les resultats de l'api on ajoute les elements 
        let linkProduit = document.createElement("a");
        document.querySelector(".items").appendChild(linkProduit);
        linkProduit.href = `product.html?id=${resultatAPI[article]._id}`;

        let articleProduit = document.createElement("article");
        linkProduit.appendChild(articleProduit);

        let imageProduit = document.createElement("img");
        articleProduit.appendChild(imageProduit);
        imageProduit.src = resultatAPI[article].imageUrl;
        imageProduit.alt = resultatAPI[article].altTxt;

        let nameProduit = document.createElement("h3");
        articleProduit.appendChild(nameProduit);
        nameProduit.classList.add("productName");
        nameProduit.innerHTML = resultatAPI[article].name;

        let descriptionProduit = document.createElement("p");
        articleProduit.appendChild(descriptionProduit);
        descriptionProduit.classList.add("productDescription");
        descriptionProduit.innerHTML = resultatAPI[article].description;

      }
    });
}

  
