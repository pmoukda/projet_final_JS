// Importation de la navigation
import naviationPrincipale from "../components/navigation.js";
import modeNuit from "../components/modeSombre.js";

// ============ Variables ==============
let sectionActuelle = 0;
//let etapeActuelle = 0;

// ================ Sélections HTML ====================
const formulaireHTML = document.querySelector("form");
const champsHTML = document.querySelectorAll("[name]");
const etapeProgressionHTML = formulaireHTML.querySelectorAll(
  "header .etat-progression"
);
const sectionsHTML = formulaireHTML.querySelectorAll("[data-section]");
const resumeHTML = formulaireHTML.querySelector(".resume");
const valeurResume = formulaireHTML.querySelectorAll("[data-champ]");
const boutonContinuerHTML = formulaireHTML.querySelector(
  ".boutonForm-navigation [data-direction='1']"
);
const boutonRetourHTML = formulaireHTML.querySelector(
  ".boutonForm-navigation [data-direction='-1']"
);
const boutonHTML = formulaireHTML.querySelectorAll(
  ".boutonForm-navigation [data-direction"
);
const boutonReserverHTML = formulaireHTML.querySelector("[type='submit']");
const remerciementHTML = formulaireHTML.querySelector(".merci >p");

// ============ Fonctions ==============

/**
 * au chargement de la page
 */
function init() {
  // Appel des fonctions des fichiers importés
  naviationPrincipale();
  modeNuit();
  // on met un écouteur d'événemet sur chaque champ quand on change de champ
  champsHTML.forEach(function (champ) {
    champ.addEventListener("change", changerDeChamp);
  });

  // on ajoute un écouteur de l'événement pour bloquer la soumission et sur les boutons de navigation
  formulaireHTML.addEventListener("submit", envoyerFormulaire);
  boutonContinuerHTML.addEventListener("click", clicBoutonNavigation);
  boutonRetourHTML.addEventListener("click", clicBoutonNavigation);

  // on fait afficher la section actuelle tout en cachant le reste des autres sections
  afficherSection(sectionActuelle);

  // on affiche les étapes de la progression
  afficherProgressionEtape();

  // on valide le formulaire
  validerFormulaire();

  // ajouter un animation sur les étapes de progression
  etapeProgressionHTML.forEach(function (etape, index) {
    //console.log("index", index);

    etape.animate(
      [
        { opacity: 0, scale: 1 },
        { opacity: 1, scale: 1 },
      ],
      {
        duration: 3000,
        delay: 100 * index,
        fill: "forwards",
        easing: "ease-in",
      }
    );
  });
}

//****************** Événements********************
//*************************************************
/**
 * Bloquer l'événement de la soumission du formulaire
 * @param {Event} evenement
 */
function envoyerFormulaire(evenement) {
  evenement.preventDefault();
  //console.log("formulaire bloqué",evenement.preventDefault());
  let estValide = validerFormulaire();
  // si la validation du formulaire est correct, le bouton submit est activé
  if (estValide) {
    alert("Merci d'avoir réservé avec Air Apiness!");
    //formulaireHTML.remove();
    //remerciementHTML.classList.remove("invisible");
    //formulaireHTML.submit();
  }
}

/**
 * Fonction pour chaque changement de champ
 * @param {Event} evenement
 */
function changerDeChamp(evenement) {
  const champHTML = evenement.currentTarget;

  // on affiche toutes les validations
  personnaliserChampsValidation(champHTML);
  validerChamps(champHTML);
  validerSections(sectionActuelle);

  // on fait afficher le résumer et la validation du formulaire
  afficherResume(champHTML);
  validerFormulaire();
}

/**
 * Fonction de clic sur les boutons de navigation
 * @param {Event} evenement
 */
function clicBoutonNavigation(evenement) {
  // on trouve le déclencheur d'événement
  const declencheur = evenement.currentTarget;

  //on s'assure que c'est bien un nombre et non une chaine de caractère
  const direction = Number(declencheur.dataset.direction);
  //console.log(direction);

  sectionActuelle += direction;
  // s'assurer qu'on ne dépasse pas le maximun et le minimun des sections
  sectionActuelle = Math.min(sectionActuelle, sectionsHTML.length - 1);
  sectionActuelle = Math.max(sectionActuelle, 0);

  //on fait afficher la section courante
  afficherSection(sectionActuelle);
}

//****************** Navigation********************
//*************************************************

/**
 * Fonction pour cacher les sections
 */
function cacherSection() {
  //On boucle et on ajoute une classe sur chaque élément
  sectionsHTML.forEach(function (sections) {
    sections.classList.add("invisible");
  });
}

// fonction pour faire afficher une section à la fois
function afficherSection(sectionActuelle) {
  //On cache en premier les sections
  cacherSection();

  //On fait afficher la section courante, donc, on enlève la classe invissible
  sectionsHTML[sectionActuelle].classList.remove("invisible");

  //On met à jour la navigation
  afficherBoutonNavigation();

  //On met à jour les étapes de progression
  afficherProgressionEtape();
}

// fonction pour faire afficher les boutons de navigations
function afficherBoutonNavigation() {
  // Si on est au début du formulaire, on fait disparaître le bouton "retour" en affichant seulement le bouton "continuer"
  boutonRetourHTML.classList.toggle("invisible", sectionActuelle <= 0);

  // Si la section est invalide on bloque le bouton suivant
  boutonContinuerHTML.classList.toggle(
    "disabled",
    sectionActuelle > sectionsHTML.length - 2 ||
      validerSections(sectionActuelle) == false
  );
  validerSections(sectionActuelle) == true;

  // Si on est à la fin, on cache le bouton suivant et on affiche le bouton submit
  boutonContinuerHTML.classList.toggle(
    "invisible",
    sectionActuelle >= sectionsHTML.length - 1
  );
  boutonReserverHTML.classList.toggle(
    "invisible",
    sectionActuelle != sectionsHTML.length - 1
  );
}

// fonction de progression de chaque étape des sections remplies
function afficherProgressionEtape() {
  const index = document.querySelectorAll(".etat-progression > [data-etape]");
  // on parcourt la liste des étapes
  index.forEach(function (etape) {
    const etapeIndex = Number(etape.dataset.etape);
    etape.classList.toggle("active", etapeIndex <= sectionActuelle);
  });
}

//******************Validations********************
//*************************************************

// fonction de personalisation des champs de validations
function personnaliserChampsValidation(champHTML) {
  const champNom = champHTML.name;
  const valeur = champHTML.value;

  // si le nombre de passager entré est supérieur au nombre demander, alors un message d'erreur s'affiche sinon le message s'enlève
  if (
    (champNom == "nbPassagerAdulte" || champNom == "nbPassagerEnfant") &&
    valeur > 10
  ) {
    champHTML.setCustomValidity("La valeur dépasse le nombre attendu. Max 10");
  } else {
    champHTML.setCustomValidity("");
  }

  // mettre en place le format personaliser du code postal en enlevant les espaces, et a les mettre en majuscule
  if (champNom === "codePostal") {
    champHTML.value = champHTML.value
      .trim()
      .replace(/^([A-Za-z]\d[A-Za-z])\s?(\d[A-Za-z]\d)$/, "$1 $2")
      .toUpperCase();
  }

  // mettre en place le format personaliser du téléphone
  if (champNom === "numeroTel") {
    champHTML.value = champHTML.value
      .trim()
      .replace(/^\(?(\d{3})\)?\s?-?(\d{3})\s?-?(\d{4})$/, "$1 $2-$3");
  }

  // mettre en place le format personaliser du numéro de carte de crédit
  if (champNom === "numeroCarte") {
    champHTML.value = champHTML.value
      .trim()
      .replace(/^(\d{4})\s?(\d{4})\s?(\d{4})\s?(\d{4})$/, "$1 $2 $3 $4");
  }

  validerChamps(champHTML);
}

// fonction de validations des champs
function validerChamps(champHTML) {
  const champsValides = champHTML.checkValidity();
  // console.log(champsValides);

  //si les champs sont valides, on affiche dans le résumé
  if (champsValides) {
    afficherResume(champHTML);
  }

  champHTML.classList.toggle("msg-erreur", champsValides == false);
}

// fonction pour valider les sections du formulaire
function validerSections(sectionActuelle) {
  // on récupère la section actuelle selon l'index
  const sections = sectionsHTML[sectionActuelle];
  // console.log(sections)
  // on sélectionne tous les éléments avec l'attribut name
  const champsSection = sections.querySelectorAll("[name]");

  // tableau vide pour stocker les résultats de chaque champ
  const tabValidation = [];

  // on boucle à traver chaque champ et on ajoute le résultat de la validation
  for (let i = 0; i < champsSection.length; i++) {
    const element = champsSection[i];
    tabValidation.push(element.checkValidity());
  }

  // on vérifie si il y a au moins un champs invalide, si oui, on désactive le bouton "continuer"
  const champInvalide = tabValidation.includes(false);

  boutonContinuerHTML.classList.toggle("disabled", champInvalide == true);
  //console.log(champInvalide);
}

// fonction pour valider le formulaire
function validerFormulaire() {
  // on vérifie si le formulaire est valide
  const formEstValide = formulaireHTML.checkValidity();

  // si invalide le bouton "Réserver" est désactiver et si valide, on enlève l'attribut "disabled"
  if (formEstValide == false) {
    boutonReserverHTML.disabled = "true";
  } else {
    boutonReserverHTML.removeAttribute("disabled");
  }

  return formEstValide;
}

//************* Affichage de résumé ********************
//******************************************************
/**
 * fonction qui fait afficher les champs modifiés dans la section résumé
 * @param {HTMLElement} champHTML
 */
function afficherResume(champHTML) {
  // console.log(champHTML);

  const name = champHTML.name;
  const valeur = champHTML.value;
  /*console.log(name, valeur);*/
  // on récupère les élément du html
  const span = resumeHTML.querySelector(`[data-champ="${name}"]`);
  if (span) {
    if (name == "memeAdresse") {
      span.textContent = champHTML.checked ? "Oui" : "Non";
    } else {
      span.textContent = valeur;
    }
  }
}

// ============ Exécution ==============
init();
