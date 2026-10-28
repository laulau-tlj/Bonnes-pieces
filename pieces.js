//Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());


//fuction qui génere toute la page
function genererPieces(pieces) {
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
}

genererPieces(pieces);

//ici on récupère le bouton de tri dans le DOM
const boutonTrier = document.querySelector(".btn-trier");
//ici on ajoute un écouteur d'événement sur le bouton de tri
boutonTrier.addEventListener("click", function() {
    // On crée une copie du tableau de pièces pour ne pas modifier l'original
    const piecesOrdonnees = Array.from(pieces); 
    // On trie le tableau de pièces par prix croissant
    pieces.sort(function(a, b) {
        return a.prix - b.prix;
    });
    // On efface le contenu de la balise body et donc l’écran
  document.querySelector(".fiches").innerHTML = "";
  // On regénère la page avec les pièces triées
  genererPieces(piecesOrdonnees);
});




const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function() {
    // On crée une copie du tableau de pièces pour ne pas modifier l'original
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


/* filtrer la liste des pièces pour n’afficher que celles qui ont une description, à l’aide d’un bouton  */
//ici on récupère le bouton de filtrage par description dans le DOM
const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");
boutonFiltrerDescription.addEventListener("click", function() {
    // On crée une copie du tableau de pièces pour ne pas modifier l'original
    const piecesAvecDescription = pieces.filter(function(piece) {
        //
        return piece.description;
        //ou 
        //return piece.description !== undefined && piece.description !== null && piece.description !== "";
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesAvecDescription);
});


const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", function() {
    // On crée une copie du tableau de pièces pour ne pas modifier l'original
    const piecesOrdonnees = Array.from(pieces); 
    // On trie le tableau de pièces par prix croissant
    pieces.sort(function(a, b) {
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length - 1; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i, 1);
    }
}

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
/* document.querySelector('.abordables').appendChild(abordablesElements); */



//Création de la liste
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

for(let i = pieces.length - 1; i >= 0; i--){
    if(pieces[i].disponibilite === undefined || pieces[i].disponibilite === null || pieces[i].disponibilite === ""){
        nomsDisponibles.splice(i, 1);
        prixDisponibles.splice(i, 1);
    }
}

const disponibleElements = document.createElement('ul');

for(let i=0; i < nomsDisponibles.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponibleElements.appendChild(nomElement)
}

/* document.querySelector('.disponibles').appendChild(disponibleElements); */


const inputPrixMax = document.querySelector('#prix-max');
console.log(inputPrixMax);
inputPrixMax.addEventListener("input", function(){
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= inputPrixMax.value;
    })
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


