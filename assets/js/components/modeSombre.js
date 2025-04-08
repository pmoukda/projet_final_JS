"use strict";

//==============Variables==================
// Aucune

//==============Sélections HTML============
const modeEcranHTML = document.querySelector(".mode-ecran");
const btnOptionHTML = document.querySelectorAll("[data-mode-option]");
//console.log(btnOptionHTML);

//==============Fonctions==================

/**
 * Au chargement de la page
 */
function init() {
  // récuper les infos préférencetielles de l'utilisateur dans le local storage
  const conserverMode = localStorage.getItem("mode") || "jour";

  modeEcranHTML.addEventListener("click", clicBtnTheme);
  changerModeEcran(conserverMode);
}

/**
 * Fonction lorsqu'on clique sur le bouton jour/nuit en propagation de l'événement
 * @param {event} evenement
 */
function clicBtnTheme(evenement) {
  const boutonDeclencheur = evenement.target.closest("[data-mode-option]");
  // console.log(boutonDeclencheur);

  // si le bouton est cliqué, on l'enregistre dans le local storage
  if (boutonDeclencheur !== null) {
    const option = boutonDeclencheur.dataset.modeOption;
    //console.log(bouton.dataset.modeOption)
    memoriserTheme(option);
  }
}

/**
 * Fonction pour faire afficher les boutons selon le thème choisi
 * @param {string} nouveau
 */
function afficherBtn(nouveau) {
  btnOptionHTML.forEach(function (bouton) {
    const theme = bouton.dataset.modeOption;

    bouton.classList.toggle("invisible", theme == nouveau);

    // Si le thème est nuit, le fond du bouton jour sera blanc
    if (theme == "nuit") {
      bouton.classList.add("active");
    }
  });
}

/**
 * Fonction pour changer de mode
 * @param {string} theme
 */
function changerModeEcran(theme) {
  document.body.dataset.mode = theme;

  afficherBtn(theme);
}

/**
 * Fonction qui enregitre le nouveau mode de l'utilisateur dans le stockage local
 * @param {string} nouveau
 */
function memoriserTheme(nouveau) {
  //console.log(nouveau)

  changerModeEcran(nouveau);

  localStorage.setItem("mode", nouveau);
}

//==============Exécution==================
/**
 * Exporter la fonction init
 */
export default init;
