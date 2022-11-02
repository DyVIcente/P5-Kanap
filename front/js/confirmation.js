 let produitId = function () {
    return new URL(location.href).searchParams.get("id");
};
//J'utilise de nouveau URLsearchParams comme dans product.js
  const orderId = produitId();
// on dit que cette URL est = a orderId

const idcommande = document.querySelector("#orderId");


idcommande.textContent = orderId;
  
localStorage.clear();
 