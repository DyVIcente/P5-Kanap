function main() {

    const idcommande = document.getElementById("orderId");
    idcommande.innerText = localStorage.getItem("orderId"); // main get #orderId, et affiche l'orderId de la commande du client
    console.log(localStorage.getItem("orderId"))
    localStorage.clear(); // clear le LS
}

main();