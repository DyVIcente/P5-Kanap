let produitId = function(){
    return new URL(location.href).searchParams.get("id");
};
const productId = produitId();
  
fetch(`http://localhost:3000/api/products/${productId}`)

    .then(function(response){
        console.log(response);
        return response.json();
      
})

 .then(function(produitNom){
    document.getElementById("title").textContent = letrucadef.name;// je dois définir le produit avant de pouvoir rajouter son nom !
 //mettre les autres éléments à modifier dans la page !





})



  
    .catch(function(error){
     // let productNotFound = document.querySelector(".item");
     // productNotFound.innerHTML = "<p>Erreur, le produit n'a pas été trouvé, faut encore définir les prods dans la page avec leurs éléments et tout<p>";
    // alert('produit pas finit d etre mis dans la page');
});