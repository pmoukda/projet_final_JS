"use strict";

//==============Variables==================
// Aucune
//==============Sélections HTML============
const boiteModalHTML = document.querySelector(".boite-modale");
const fermerModalHTML = document.querySelectorAll("[data-declenceur]");
//console.log(declencheurModalHTML)

//==============Fonctions==================

/**
 *   Au chargement de la page
 */
function init() {
  // On met un écouteur d'événement au click sur la boite modale
  fermerModalHTML.forEach(function (declencheur) {
    declencheur.addEventListener("click", afficherBoiteModale);
  });

  let infolettre = localStorage.getItem("infolettres");

  // Si l'infolettre est null, on le crée et on le sauvegarde  avec la date sans heure
  if (!infolettre) {
    infolettre = new Date().toISOString().split("T")[0];
    localStorage.setItem("infolettres", infolettre);

    setTimeout(afficherBoiteModale, 5000); //  on fait apparaitre la boite modal après 5 secondes
  }
}

/**
 *Fonction pour faire afficher la boite modale
 */
function afficherBoiteModale() {
  boiteModalHTML.classList.toggle("active");
}

//==============Exécution==================
/**
 * Exporter la fonction init
 */
export default init;
