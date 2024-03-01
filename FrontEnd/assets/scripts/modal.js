function openModal() {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector(".modal").classList.add("modal--open");
}

function closeModal() {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".modal").classList.remove("modal--open");
  document.querySelector("modal-d").classList.remove("modal--open-d");
}

document.querySelector("overlay").addEventListener("click", function (event) {
  if (event.target === document.querySelector(".overlay")) {
    closeModal();
  }
});

function openModalD() {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector(".modal-d").classList.add("modal--open-d");
  document.querySelector(".modal").classList.remove("modal--open");
}

function returnModal() {
  document.querySelector(".modal-d").classList.remove("modal--open-d");
  document.querySelector(".modal").classList.remove("modal--open");
  document.querySelector("modal").classList.add("modal--open");
}

const token = localStorage.getItem("token");

// <i class="fa fa-trash" aria-hidden="true"></i> a rajouté pour les images ou en svg
// 2eme icones croix a reparer (ne se ferme pas)
// rajouter le retour a la page precedente au modal return
// faire apparaitre l'image quand selectionner 
