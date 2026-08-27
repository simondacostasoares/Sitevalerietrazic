/* ==========================================================================
   Menu mobile — ouverture / fermeture du burger
   --------------------------------------------------------------------------
   Ce fichier est le seul JavaScript du site. Il est copié dans toutes les
   pages via la balise <script> du header.

   Sur desktop, le menu est toujours visible : ce code ne sert à rien.
   Sur mobile (moins de 900 px), le CSS masque la liste ; c'est la classe
   « est-ouvert », ajoutée ici, qui la fait apparaître.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  var burger = document.querySelector(".nav__burger");
  var liste = document.querySelector(".nav__liste");

  // Si l'un des deux manque, on ne fait rien plutôt que de provoquer une erreur.
  if (!burger || !liste) return;

  burger.addEventListener("click", function () {
    var estOuvert = liste.classList.toggle("est-ouvert");

    // aria-expanded indique aux lecteurs d'écran si le menu est ouvert.
    // Le CSS s'en sert aussi pour transformer le burger en croix.
    burger.setAttribute("aria-expanded", estOuvert ? "true" : "false");
  });

});
