"use strict";
//==============Variables==================
let indexCarrousel = 0;
let interval;

//==============Sélections HTML============
const imgCarrouselHTML = document.querySelectorAll(".carrousel-items");
const boutonsDirectionHTML = document.querySelectorAll("[data-direction]");
//console.log(carrouselHTML);

//==============Fonctions==================

/**
 * Au chargement de la page
 */
function init() {
  // on met un écouteur d'évènement sur les boutons de clic de direction
  boutonsDirectionHTML.forEach(function (bouton) {
    bouton.addEventListener("click", clicBoutonDIrection);
  });

  // On met un delay pour le défilement automatique
  interval = setInterval(defilerImages, 5000);
}

/**
 * fonction qui masque l'image active au défilement
 */
function cacherImg() {
  imgCarrouselHTML.forEach(function (img) {
    img.classList.remove("active");
  });
}

/**
 * Fonction qui affiche l'image active à l'index passé en paramètre
 * @param {number} index  L'index de l'image à afficher
 */
function afficherImg(index) {
  cacherImg(); // en premier, on masque l'image active

  imgCarrouselHTML[index].classList.add("active");
}

/**
 * Fonction qui fait défilé les images actives automatiquement
 *
 */
function defilerImages() {
  // On incrémente l'index pour passer à l'image suivante
  indexCarrousel++;

  // si l'index dépasse le nombre d'images, alors, on le fait revenir à la première image
  if (indexCarrousel >= imgCarrouselHTML.length) {
    indexCarrousel = 0;
  }

  afficherImg(indexCarrousel); // afficher l'image à l'index actuel
}

/**
 * Fonction qui prend un événement de propagation au clic sur les boutons de direction, on change d'images
 * @param {Event} evenement
 */
function clicBoutonDIrection(evenement) {
  const declencheur = evenement.target;

  const direction = Number(declencheur.dataset.direction); // S'assurer que c'est un nombre

  // On arrête le défilement automatique quand les boutons de direction sont enclenchés manuellement
  clearInterval(interval);

  indexCarrousel += direction; // modifier l'index selon la direction

  // S'assurer qu'on ne dépasse pas le maximum et le minimum de nombre d'images
  if (indexCarrousel >= imgCarrouselHTML.length) {
    indexCarrousel = 0;
  } else if (indexCarrousel < 0) {
    indexCarrousel = imgCarrouselHTML.length - 1;
  }

  afficherImg(indexCarrousel); // afficher l'image à l'index actuel

  // On fait repartir le défilement automatique
  interval = setInterval(defilerImages, 5000);
}

//==============Exécution==================
/**
 * Exporter la fonction init
 */
export default init;
