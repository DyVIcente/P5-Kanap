// Récupère l'ID contenu dans l'URL
let idWindow = window.location.href; 

let url = new URL(idWindow);

let numeroCommande = url.searchParams.get("orderId");


// Affiche l'ID dans le html
document.querySelector("#orderId").innerHTML = numeroCommande;