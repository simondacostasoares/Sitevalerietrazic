/* ==========================================================================
   Menu — burger mobile et sous-menu « Cours »
   --------------------------------------------------------------------------
   Ce fichier est le seul JavaScript du site. Il est appelé à la fin de
   chaque page.

   Il fait deux choses :
     1. ouvrir et fermer le menu burger sur mobile ;
     2. ouvrir et fermer le sous-menu « Cours » au clic, sur ordinateur.

   Le sous-menu s'ouvre DÉJÀ tout seul au survol de la souris et à l'arrivée
   du clavier : c'est le CSS qui s'en charge. Ce fichier ne gère que le clic,
   parce que sur un écran tactile ni l'un ni l'autre n'existe.

   Si le JavaScript ne se charge pas, le site reste utilisable : sur
   ordinateur le survol suffit, et sur mobile le sous-menu est de toute façon
   toujours déplié.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ------------------------------------------------------------------
     1. Menu burger
     ------------------------------------------------------------------ */

  var burger = document.querySelector(".nav__burger");
  var liste = document.querySelector(".nav__liste");

  // Si l'un des deux manque, on ne fait rien plutôt que de provoquer une erreur.
  if (burger && liste) {
    burger.addEventListener("click", function () {
      var estOuvert = liste.classList.toggle("est-ouvert");

      // aria-expanded indique aux lecteurs d'écran si le menu est ouvert.
      // Le CSS s'en sert aussi pour transformer le burger en croix.
      burger.setAttribute("aria-expanded", estOuvert ? "true" : "false");
    });
  }


  /* ------------------------------------------------------------------
     2. Sous-menu « Cours »
     ------------------------------------------------------------------ */

  var bascule = document.querySelector(".nav__bascule");
  if (!bascule) return;

  // Le même seuil que la bascule burger du CSS (style.css, §6).
  // En dessous, « Cours » n'est plus un bouton mais un simple intertitre :
  // le sous-menu est déjà déplié, il n'y a rien à ouvrir.
  var surOrdinateur = window.matchMedia("(min-width: 901px)");

  function fermer() {
    bascule.setAttribute("aria-expanded", "false");
  }

  bascule.addEventListener("click", function (evenement) {
    if (!surOrdinateur.matches) return;

    // Le bouton est dans un <li> : sans cette ligne, le clic remonterait
    // jusqu'au document et le gestionnaire ci-dessous refermerait aussitôt
    // le panneau qu'on vient d'ouvrir.
    evenement.stopPropagation();

    var estOuvert = bascule.getAttribute("aria-expanded") === "true";
    bascule.setAttribute("aria-expanded", estOuvert ? "false" : "true");
  });

  // Un clic ailleurs dans la page referme le panneau.
  document.addEventListener("click", fermer);

  // La touche Échap aussi, et le focus revient sur le bouton « Cours » :
  // sans cela, la personne qui navigue au clavier se retrouve perdue au
  // milieu de la page.
  document.addEventListener("keydown", function (evenement) {
    if (evenement.key !== "Escape") return;
    if (bascule.getAttribute("aria-expanded") !== "true") return;

    fermer();
    bascule.focus();
  });

  // Si la fenêtre est redimensionnée jusqu'à repasser en mode mobile, on
  // remet le bouton à zéro : sinon un « aria-expanded="true" » resté ouvert
  // décrirait au lecteur d'écran un panneau dépliable qui n'existe plus.
  surOrdinateur.addEventListener("change", fermer);

});
