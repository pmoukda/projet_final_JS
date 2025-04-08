/**
 * Cette classe permet d'afficher des éléments au défilement de la page
 * Vous devez l'importer dans le fichier de votre choix et l'instancier avec new.
 * Passez les bons paramètres
 */
class ScrollAnimator {
  constructor(zoneVisibilite, targets) {
    this.zoneVisibilite = zoneVisibilite; // La zone d'intersection, null pour utiliser la fenêtre du navigateur comme zone d'intersection
    this.targets = targets; // Les éléments cibles à observer

    //Les options de l'intersection observer
    // root: null, //null pour observer la fenêtre du navigateur
    // rootMargin: "0px", //Cela permet de décaler la zone d'intersection par rapport à la zone d'observation
    // threshold: 1, //Pourcentage de visibilité de l'élément pour déclencher l'intersection 1 = 100% de visibilité
    // Cela veut dire que l'élément doit être entièrement visible pour déclencher l'intersection
    this.options = {
      root: this.zoneVisibilite,
      rootMargin: "0px",
      threshold: 0.5,
    };

    //Création de l'instance de l'intersection observer
    //On passe la fonction de rappel qui sera appelée lorsqu'un élément cible entre ou sort de la zone d'intersection
    this.observer = new IntersectionObserver(
      this.onIntersection.bind(this),
      this.options
    );

    //On observe les éléments cibles
    targets.forEach(
      function (target) {
        //On observe chaque élément cible
        this.observer.observe(target);
      }.bind(this)
    );
  }

  /**
   * Fonction de rappel appelée lorsqu'un élément cible entre ou sort de la zone d'intersection
   * @param {*} entries
   */
  onIntersection(entries) {
    //Entries est un tableau d'objets IntersectionObserverEntry, donc tous les éléments cibles observés
    entries.forEach(
      function (objetVisible) {
        //entry est un objet IntersectionObserverEntry, donc un élément cible observé
        let element = objetVisible.target; //L'élément HTML cible
        let intersecte = objetVisible.isIntersecting; //Si l'élément cible est dans la zone d'intersection

        // Animation: faire flipper les photos des memen=bre de l'équipe de la page apropos

        if (intersecte === true) {
          element.animate(
            [{ transform: "scaleX(-1)" }, { transform: "scaleX(1)" }],
            { fill: "forwards", duration: 2000 }
          );
        } else {
          element.animate(
            [{ transform: "scaleX(1)" }, { transform: "scaleX(-1)" }],
            { fill: "forwards", duration: 2000 }
          );
        }

        //Action à effectuer lorsque l'élément cible entre ou sort de la zone d'intersection
        // == MODIFIER LE CODE ICI EN FONCTION DE L'EFFET SOUHAITÉ ==
        //element.classList.toggle("invisible", intersecte == false);
      }.bind(this)
    );
  }
}
export default ScrollAnimator;
