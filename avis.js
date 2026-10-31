//ici on récupère le bouton de tri décroissant dans le DOM
export function ajoutListenerAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");
    // On ajoute un écouteur d'événement sur chaque bouton de pièce
    for (let i = 0; i < piecesElements.length; i++) {
      piecesElements[i].addEventListener("click", async function (event) {
        const id = event.target.dataset.id;
        const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
        const avis = await reponse.json();
        window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis));
        const pieceElement = event.target.parentElement;
        afficherAvis(pieceElement, avis);
      });
    }
}

export function afficherAvis(pieceElement, avis) {
  const avisElement = document.createElement("p");
  for (let i = 0; i < avis.length; i++) {
    avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br> ${avis[i].nbEtoiles} étoiles <br>`;
  }
  pieceElement.appendChild(avisElement);
}


//ici on fait un ecouteur d'évenement sur le bouton envoyer du formulaire
export function ajoutListenerEnvoyerAvis() {
  const formulaireAvis = document.querySelector(".formulaire-avis");

  formulaireAvis.addEventListener("submit", function (event) {
    // Désactivation du comportement par défaut du navigateur
    event.preventDefault();
    // Création de l’objet du nouvel avis.
    const avis = {
      pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
      utilisateur: event.target.querySelector("[name=utilisateur").value,
      commentaire: event.target.querySelector("[name=commentaire]").value,
      nbEtoiles: event.target.querySelector("[name=nbEtoiles]").value
    };
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(avis);
    // Création de la requête avec appel de la fonction fetch avec toutes les informations nécessaires 
    fetch("http://localhost:8081/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
  })
}