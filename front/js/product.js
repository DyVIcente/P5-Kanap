let produitId = function(){
    return new URL(location.href).searchParams.get("id");
};
const productId = produitId();
  
fetch(`http://localhost:3000/api/products/${productId}`)

    .then(function(response){
      return response.json();
})
  
    .catch(function(error){
     // let productNotFound = document.querySelector(".item");
     // productNotFound.innerHTML = "Erreur, le produit n'a pas été trouvé, faut encore définir les prods dans la page avec leurs éléments et tout ";
        alert('produit pas finit d etre mis dans la page');
});