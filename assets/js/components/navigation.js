"use strict";
//============ Variables globales ==================
const navPrincipale = [
  {
    url: "index.html",
    nom: "Accueil",
  },
  {
    url: "contact.html",
    nom: "Contact",
  },
  {
    url: "à-propos.html",
    nom: "À propos",
  },
  {
    url: "formulaire.html",
    nom: "Formulaire",
  },
];

//============ Sélection HTML ================
const liensNavHTML = document.querySelector(".nav-liste");

//============ Fonctions ==============

/**
 * Au chargement de la page
 */
function init() {
  // Appel des fonctions trierLiensNav et afficherLiensNav
  let liensNavTries = trierNomsLiens(navPrincipale);
  afficherLiensNav(liensNavTries);

  // mettre le nom du lien de la page courante en evidence
  // resource utilisé MDN web docs
  const pageCourante = location.href;
  //console.log(pageCourante);
  // Récupérer tous les liens du menu
  const menuItems = document.querySelectorAll(".nav-liste li a");

  // Boucler sur chaque élément du menu pour modifier la police de caractère
  menuItems.forEach(function (item) {
    if (item.href == pageCourante) {
      item.style.fontSize = "24px"; // Changer la grosseur du texte
      item.style.textTransform = "uppercase"; // Mettre en majuscule
      item.style.fontWeight = "900"; // Grossir les caractères de police
      item.style.textDecoration = "underline"; // changer la couleur pour un bleu très foncé
    }
  });
}

/**
 * Fonction pour trier par nom des liens
 * @returns {array}  le tableau du clone trié
 */
function trierNomsLiens() {
  // Faire un clone du tableau pour ne pas perdre l'original
  let cloneNavPrincipale = [...navPrincipale];
  cloneNavPrincipale.sort(function (a, b) {
    if (a.nom < b.nom) {
      return -1;
    } else if (a.nom > b.nom) {
      return 1;
    } else {
      return 0;
    }
  });

  //console.log("apres trie:", cloneNavPrincipale);

  // Retourner le clone du tableau trié
  return cloneNavPrincipale;
}

/**
 * Fonction pour faire afficher tous les liens triés
 * @param {string} liensNavTries
 */
function afficherLiensNav(liensNavTries) {
  // Boucle pour traverser le tableau de liens
  for (let i = 0; i < liensNavTries.length; i++) {
    const liensNav = liensNavTries[i];

    // Appel de la fonction  genererLiensNav
    genererLiensNav(liensNav);
  }
}

/**
 * Fonction pour formatter les liens avec la nomenclature par crochet
 * @param {string} liensNav
 * @returns {string} liens formattés
 */
function formatterLiensNav(liensNav) {
  liensNav["url"] = liensNav["url"].trim(); // enlever les espaces vides
  liensNav["url"] = liensNav["url"].toLowerCase(); // mettre tous en minuscule
  liensNav["url"] = liensNav["url"].replaceAll("-", ""); // enlever les tirets
  liensNav["url"] = liensNav["url"].replaceAll("à", "a"); // remplacer "à" par "a"

  // retourne les liens formattés
  return liensNav["url"];
}

/**
 * Fonction pour générer le contenu des liens
 * @param {string} liensNav
 */
function genererLiensNav(liensNav) {
  //appel de la fonction formatterLiensNav
  let liens = formatterLiensNav(liensNav);

  // ajout des liens avec la méthode insertAdjacentHTML
  const template = `<li><a href="${liens}">${liensNav.nom}</a></li>`;
  // console.log(template);
  liensNavHTML.insertAdjacentHTML("beforeend", template);
}

//============Exécution ============
/**
 * Exporter la fonction init
 */
export default init;
