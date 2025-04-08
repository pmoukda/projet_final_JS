"use strict";
// Importation de la navigation
import naviationPrincipale from "../components/navigation.js";
import modeNuit from "../components/modeSombre.js";

//=============Variables globales======================

const destinations = [
  {
    id: 1,
    nomDestination: "Australie",
    pays: "Australie",
    ville: "Sydney",
    description:
      "L’Australie est une terre de contraste située à l’autre bout du monde, regorgeant de trésors. Entre la beauté sauvage de ses milliers de paysages, sa faune et sa flore uniques au monde, ses richesses naturelles et culturelles exceptionnelles, l’Australie est une destination exceptionnelle à visiter au moins une fois dans sa vie.",
    langue: "Anglais",
    date: "voir calendrier",
    duree: 20,
    tarif: 5600,
  },
  {
    id: 2,
    nomDestination: "Grèce",
    pays: "Grèce",
    ville: "Santorini",
    description:
      "Connue pour être la plus belle île de Grèce mais également la plus visitée, Santorin est la destination de tous les superlatifs. Ses maisons d’un blanc immaculé et les domes bleus de ses églises suffisent à eux seuls à la distinguer des milliers d’autres îles du pays. Pour nous, Santorini a été un vrai coup de cœur. Une île où nous aimerions revenir encore et encore pour poursuivre la découverte de ce site hors du commun.",
    langue: "Grec",
    date: "voir calendrier",
    duree: 16,
    tarif: 3250,
  },
  {
    id: 3,
    nomDestination: "France",
    pays: "France",
    ville: "Paris",
    description:
      "Lorsqu’on pense à Paris, on pense immédiatement à la ville de l’amour, de la gastronomie et de la culture. Avec ses monuments emblématiques tels que la Tour Eiffel, l’Arc de Triomphe et la Basilique du Sacré-Cœur, la ville attire chaque année des millions de visiteurs du monde entier.",
    langue: "Français",
    date: "voir calendrier",
    duree: 14,
    tarif: 2395,
  },
  {
    id: 4,
    nomDestination: "Indonésie",
    pays: "Indonésie",
    ville: "Bali",
    description:
      "Surnommée l’île des dieux, Bali est l’une des destinations les plus appréciées au monde. La raison à cela est la grande diversité d’attractions que cette île exotique propose à ses visiteurs. Chacune de ses régions, chacune de ses villes ne manqueront pas de vous surprendre.",
    langue: "Indonésien",
    date: "voir calendrier",
    duree: 25,
    tarif: 6695,
  },
  {
    id: 5,
    nomDestination: "Polynésie Française",
    pays: "Polynésie Française",
    ville: "Tahiti",
    description:
      "Avec leurs lagons aux eaux turquoise, leurs plages de sable blanc, leurs températures agréables et leurs paysages paradisiaques, Tahiti Et Ses Îles font rêver tous les voyageurs. Prenez le temps de visiter Tahiti. Au cœur de la Polynésie française, visiter cette île vaut le voyage, quelle que soit la saison.",
    langue: "Français et Tahitien",
    date: "voir calendrier",
    duree: 25,
    tarif: 7800,
  },
  {
    id: 6,
    nomDestination: "Japon",
    pays: "Japon",
    ville: "Ashikaya",
    description:
      "Il y a un nombre infini de raisons de visiter le Japon, car le pays regorge d’activités pour tous les types de voyageurs. Que vous mouriez d’envie de découvrir l’histoire et la culture japonaises grâce aux nombreux sites du patrimoine mondial de l’UNESCO, de déguster la cuisine locale ou de faire un tour en Shinkansen, un voyage au Japon vous promet une aventure unique.Des visites des nombreux temples et châteaux impressionnants à travers le pays, à la possibilité de faire un plongeon dans une source chaude onsen.",
    langue: "Japonais",
    date: "voir calendrier",
    duree: 21,
    tarif: 6500,
  },
];

//============ Sélection Html=========================

const grilleDestinationsHTML = document.querySelector(".grille-destinations");
const detailImageHTML = document.querySelector(".detail__img");
const detailPaysHTML = document.querySelector(".detail__pays");
const detailVilleHTML = document.querySelector(".detail__ville");
const detailLangueHTML = document.querySelector(".detail__langue");
const detailDescriptionHTML = document.querySelector(".detail__description");
const detailDureeHTML = document.querySelector(".detail__duree");
const detailDateHTML = document.querySelector(".detail__date");
const detailPrixHTML = document.querySelector(".detail__tarif");
const boutonPrixHTML = document.querySelector("#tri-prix-filtres");
const boutonOrdreAphaHTML = document.querySelector("#tri-alpha-croissant");
const boutonDureeHTML = document.querySelector("#tri-ordre-decroissant");

//==============Fonctions ===============================

/**
 * au chargement de la page
 */
function init() {
  // Appel des fonctions des fichiers importés
  naviationPrincipale();
  modeNuit();

  // appel de la fonction pour faire afficher les images des destinations
  afficheListeDestinations(destinations);

  // appel de la fonction pour trouver aléatoirement les destinations ainsi que la fonction pour faire afficher les détail
  const aleatoire = trouveDestinationAleatoire(destinations);
  afficheDetails(aleatoire);
  //Ajout d'un écouteur d'événement au clic pour chaque bouton. Au clic, les éléments sont filtrés ou triés
  boutonOrdreAphaHTML.addEventListener("click", clicTriAlpha);
  boutonPrixHTML.addEventListener("click", clicPrixFiltres);
  boutonDureeHTML.addEventListener("click", clicTriParDuree);
}

//******trier et filtrer les éléments de la liste en cliquant sur des boutons*****

/**
 * fonction au clic quand on veut faire afficher les éléments en ordre alphabétique
 */
function clicTriAlpha() {
  const destinationsTries = trierAlphabetiquement(destinations);
  afficheListeDestinations(destinationsTries);
  //console.log(albumsTries);
}

/**
 * fonction au clic pour faire afficher les prix par filtrage
 */
function clicPrixFiltres() {
  const prixDestinationTrie = filtrerParPrix(destinations, 5800);
  afficheListeDestinations(prixDestinationTrie);
}

/**
 * fonction au clic pour faire afficher la durée des séjours en commençant par les plus longues
 */
function clicTriParDuree() {
  const dureeDestinationsTries = trierParLongueDuree(destinations);
  afficheListeDestinations(dureeDestinationsTries);
}

/**
 * fonction pour trier les noms de pays par ordre alphabétique et retourner le tableau une fois trié
 * @returns le tableau trié alphabétiquement
 */
function trierAlphabetiquement() {
  // faire une copie du tableau pour garder l'originale
  let copieTabDestinations = [...destinations];
  copieTabDestinations.sort(function (a, b) {
    if (a.pays < b.pays) {
      return -1;
    } else if (a.pays > b.pays) {
      return 1;
    } else {
      return 0;
    }
  });

  return copieTabDestinations;
}

/**
 * fonction pour trier la durée du séjour en ordre décroissant et le retourner
 * @returns {Array} la copie du tableau trié par longue durée
 */
function trierParLongueDuree() {
  // faire une copie du tableau pour garder l'originale
  let copieNomDestination = [...destinations];
  // trier en ordre croissant
  copieNomDestination.sort(function (a, b) {
    if (a.duree < b.duree) {
      return -1;
    } else if (a.duree > b.duree) {
      return 1;
    } else {
      return 0;
    }
  });
  // ensuite, mettre le tableau en ordre decroissant
  copieNomDestination.reverse();

  return copieNomDestination;
}

/**
 *  fonction pour filtrer par prix
 * @param {Array} tabDestinations
 * @param {Number} prixMax
 * @returns {Number} le prix filtré
 */
function filtrerParPrix(tabDestinations, prixMax) {
  let copieTab = [...tabDestinations];
  // on stock un tableau vide dans une variable
  let prixFiltres = [];
  //on boucle à travers le tableau pour chaque prix
  copieTab.forEach(function (prixDestination) {
    // condition pour déterminer si le prix est inférieur ou égal au prix maximum. si oui, on le fais afficher avec la méthode push
    if (prixDestination.tarif <= prixMax) {
      prixFiltres.push(prixDestination);
    }
  });

  // on retourne le prix filtrer
  return prixFiltres;
}

//********** Dans la partie aside ***********

/**
 * fonction qui fait afficher les détail dans la section aside
 * @param {Array} destinations
 */
function afficheDetails(destinations) {
  let imgUrl = formatterLiensImages(destinations);
  detailImageHTML.src = imgUrl;
  detailPaysHTML.textContent = destinations.pays;
  detailVilleHTML.textContent = destinations.ville;
  detailLangueHTML.innerHTML = `<strong>Langue: </strong> ${destinations.langue}`;
  detailDescriptionHTML.textContent = destinations.description;
  detailDureeHTML.innerHTML = `<strong>Durée de séjours:</strong> ${destinations.duree} jours`;
  detailDateHTML.innerHTML = `<strong>Disponibilité:</strong> ${destinations.date}`;
  detailPrixHTML.innerHTML = `<strong>${destinations.tarif} $ par adulte</strong>`;
}

/**
 * fonction au clic sur un produit, les détails s'affichent dans la section aside
 * @param {Event} evenement
 */
function clicImage(evenement) {
  const declencheur = evenement.currentTarget;
  const id = declencheur.id;

  // appel de la fonction trouver l'image de la destination
  const destinationClique = trouverDestination(destinations, id);

  // appel de la fonction affichecheDetails une fois l'image cliqué
  afficheDetails(destinationClique);
}

//********* Dans la partie section**********

/**
 *fonction pour faire afficher et générer chaque image des destinations
 * @param {Array} destinationsTries
 */
function afficheListeDestinations(destinationsTries) {
  grilleDestinationsHTML.innerHTML = "";

  for (let i = 0; i < destinationsTries.length; i++) {
    const listeDestinations = destinationsTries[i];

    genererImagesDestination(listeDestinations);
  }
}
/**
 * Fonction pour formatter les liens des images
 * @param {string} src
 * @returns {string} les liens des image formattées
 */
function formatterLiensImages(src) {
  // mettre en minuscule
  src.nomDestination = src.nomDestination.toLowerCase();

  // remplace les accents par les non accents
  src.nomDestination = src.nomDestination.normalize("NFD");
  src.nomDestination = src.nomDestination.replace(/[\u0300-\u036f]/g, "");

  // remplace les espaces par les tirets
  src.nomDestination = src.nomDestination.replaceAll(" ", "-");

  // concatené avec l'extension du liens des images
  let liensImages = `assets/img/albumAccueil/${src.nomDestination}.jpg`;
  // console.log(liensImages);
  // Retourner les liens des image formattés
  return liensImages;
}

/**
 * fonction qui génère les images et ajoute l'élément au dom
 * @param {Array} listeDestinations
 */
function genererImagesDestination(listeDestinations) {
  // appel de la fonction formaterLiensImages
  let liensImg = formatterLiensImages(listeDestinations);
  // générer le gabarit pour le contenue du HTML
  const template = `<div class="pays" id="${listeDestinations.id}">
                        <img src="${liensImg}" alt="${listeDestinations.pays}">
                        <h2>${listeDestinations.pays}</h2>
                    </div>`;
  // inserer l'élément HTML dans la grille avec la méthode insertAdjacentHTML
  grilleDestinationsHTML.insertAdjacentHTML("beforeend", template);
  // récupérer le dernier élément
  const ajoutHTML = grilleDestinationsHTML.lastElementChild;
  //ajouter un écouteur d'évènement au clic sur un produit pour ensuite faire afficher les détails
  ajoutHTML.addEventListener("click", clicImage);
}

/**
 * fonction qui retourne  la liste de destinatons au hasard
 * @param {Array} listeDestinations
 * @returns {Array} le tableau des destinations aléatoirement
 */
function trouveDestinationAleatoire(listeDestinations) {
  let position = Math.floor(Math.random() * listeDestinations.length);
  let destinationAleatoire = listeDestinations[position];

  return destinationAleatoire;
}

/**
 * fonction pour trouver la destination
 * @param {Array} tableauPays
 * @param {Number} id
 * @returns element du tableau
 */
function trouverDestination(tableauPays, id) {
  // S'assurer que l'id est un nombre
  id = Number(id);

  // Boucler sur les éléments du temps
  for (let i = 0; i < tableauPays.length; i++) {
    let elementTableau = tableauPays[i];

    // Récupère le id d'un élément
    let idElementTableau = elementTableau.id;

    // Si le id recherché est identique au id de l'élément du tableau, on retourne l'élément du tableau
    if (id == idElementTableau) {
      return elementTableau;
    }
  }
}

//=============Exécution ==============
//Appel de la fonction init
init();
