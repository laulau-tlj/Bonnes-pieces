//Récupération des pièces depuis le fichier JSON
const response = await fetch("pieces-autos.json");

//ici on récupère le contenu du fichier JSON et on le transforme en objet JavaScript
const pieces = await response.json();

//On boucle sur le tableau de pièces pour créer les fiches
for(let i = 0; i < pieces.length; i++){

    //Créons notre article avec la methode createElement
    const article = pieces[i];

    //je récupère l'élément du DOM qui accueillera les fiches 
    const sectionFiches = document.querySelector(".fiches");

    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article")

    //ici je crée un élément image pour afficher l'image de la pièce
    const imageElement = document.createElement("img");
    //Je le rajoute dans la liste des pièces de l'article
    imageElement.src = article.image;

    //ici je crée un élément h2 pour afficher le nom de la pièce
    const nomElement = document.createElement("h2");
    //ici je remplis le contenu de l'élément h2 avec le nom de la pièce
    nomElement.innerText = article.nom;

    //ici je crée un élément p pour afficher le prix de la pièce
    const prixElement = document.createElement("p");
    //on a utilisé l'opérateur ternaire pour afficher un resultat en fonction du prix
    prixElement.innerText = `prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

    //ici je crée un élément p pour afficher la catégorie de la pièce
    const categorieElement = document.createElement("p");
    //on a utilisé l'opérateur nullish coalescing pour afficher un resultat en fonction de la catégorie 
    categorieElement.innerText = article.categorie ?? ("aucune categorie");

    //ici je crée un élément p pour afficher la description de la pièce
    const descriptionElement = document.createElement("p");
    //on a utilisé l'opérateur nullish coalescing pour afficher un resultat en fonction de la description
    descriptionElement.innerText = article.description ?? ("pas de description pour le moment");

    //ici je crée un élément p pour afficher la disponibilité de la pièce
    const stockElement = document.createElement("p");
    //on a utilisé l'opérateur ternaire pour afficher un resultat en fonction de la disponibilité
    stockElement.innerText = article.disponibilité == true ? "En stock" : "Rupture de stock";


    //Après avoir créer mes éléments je dois les rattacher à la page web ou le parent pour que les données s'affichent

    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);

    // On rattache les éléments à la balise article
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

}

