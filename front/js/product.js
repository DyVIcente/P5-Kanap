let produitId = function(){
    return new URL(location.href).searchParams.get("id");
};
const productId = produitId();
  
fetch(`http://localhost:3000/api/products/${productId}`)

    .then(function(response){
       // console.log(response);
        return response.json();
      
}).catch(function(error){

    // let productNotFound = document.querySelector(".item");
    // productNotFound.innerHTML = "<p>Erreur, le produit n'a pas été trouvé, faut encore définir les prods dans la page avec leurs éléments et tout<p>";
   alert(`produit pas fini d'etre mis dans la page`);
})

 .then(function(product){
console.log(product);})


    //document.querySelector("title").textContent += product.name;// je dois définir le produit avant de pouvoir rajouter son nom !
 //mettre les autres éléments à modifier dans la page !
 let product = function(product){
document.getElementsByClassName("item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
document.getElementById("title").innerText += `${product.name}`;
document.getElementById("price").innerText += `${product.price}`;
document.getElementById("description").innerText += `${product.description}`;
document.getElementById("colors").innerText += `${product.colors}`;

}









  
