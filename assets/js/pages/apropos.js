// Importation des modules
import navigationPrincipale from "../components/navigation.js";
import imgEnCarroussel from "../components/carrousel.js";
import boiteModale from "../components/boiteModale.js";
import modeNuit from "../components/modeSombre.js";
import scrollAnimation from "../components/ScrollAnimator.js";

//==============Variables==================
//Aucune
//==============Sélections HTML============

const sectionsAproposHTML = document.querySelectorAll(".img-texte");
const image = document.querySelectorAll(".petit > img");
//console.log(sectionsAproposHTML);

//==============Fonctions==================

/**
 *  Au chargement de la page
 */
function init() {
  // Appel des fonctions importés
  navigationPrincipale();
  imgEnCarroussel();
  boiteModale();
  modeNuit();

  new scrollAnimation(null, image);
}

// Animation: faire apparaitre les sections
sectionsAproposHTML.forEach(function (section, index) {
  // console.log("index", index);

  section.animate(
    [
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1 },
    ],
    {
      duration: 3000,
      delay: 200 * index,
      fill: "forwards",
      easing: "ease-in-out",
    }
  );
});

//==============Exécution==================
init();
