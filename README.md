# <p align="center"> :couch_and_lamp: Kanap - Projet 5 Formation OC</p>

<p align="center">➡️Projet 5 - Construisez une site e-commerce en JavaScript</p>

## <p align="center">🛠️ Le projet:</p>
-Unifier les travaux déjà réalisés par l’équipe en intégrant dynamiquement les éléments de l’API dans les différentes pages web avec JavaScript. Le code du front-end et de l’API est disponible sur un repo fourni.
-Mettre en place un plan de test d'acceptation. ( Présenté lors du PowerPoint )


## <p align="center">⚙️ Informations complémentaires: </p>

### La page d'accueil:
-Cette page présente l’ensemble des produits retournés par l’API.
-En cliquant sur le produit, l’utilisateur sera redirigé sur la page du produit pour consulter
celui-ci plus en détail.

### La page produit:
-Cette page présente un seul produit ; elle aura un menu déroulant permettant à l'utilisateur
de choisir une option de personnalisation, ainsi qu’un input pour saisir la quantité. Ces
éléments doivent être pris en compte dans le panier.

### La page panier:
-Sur cette page, l’utilisateur va pouvoir modifier la quantité d’un produit de son panier ; à ce
moment, le total du panier devra bien se mettre à jour.
-L’utilisateur aura aussi la possibilité de supprimer un produit de son panier, le produit devra
donc disparaître de la page.
-Les inputs des utilisateurs doivent être analysés et validés pour vérifier le format et le type
de données avant l’envoi à l’API. En cas de problème de saisie, un message d’erreur devra être affiché en dessous du champ
correspondant.
-Ne pas stocker le prix des articles en local.

### La page confirmation:
-Sur cette page, l'utilisateur doit voir s’afficher son numéro de commande. Il faudra veiller à
ce que ce numéro ne soit stocké nulle part.

### Pour l'API:
-Des promesses devront être utilisées pour éviter les callbacks. Il est
possible d’utiliser des solutions alternatives, comme fetch, celle-ci englobant la promesse.
L’API n’est actuellement que dans sa première version. La requête post qu’il faudra formuler
pour passer une commande ne prend pas encore en considération la quantité ni la couleur
des produits achetés.





<img src="https://user-images.githubusercontent.com/95346160/218700846-4e646d3b-c767-46d3-beaa-5390e4559fc6.png" alt="kanap_image" />








## <p align="center">✔️ Installation: </p>

### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.
