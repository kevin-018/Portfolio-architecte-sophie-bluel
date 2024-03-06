function openModal() {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector(".modal").classList.add("modal--open");
}

function closeModal() {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".modal").classList.remove("modal--open");
  document.querySelector(".modal-d").classList.remove("modal--open-d");
}

document.querySelector(".overlay").addEventListener("click", function (event) {
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
  document.querySelector(".modal").classList.add("modal--open");
  document.querySelector(".overlay").style.display = "block";

  document.querySelector(".overlay").addEventListener("click", function (event) {
    if (event.target === document.querySelector(".overlay")) {
      returnModal();
    }
  });
}

const token = localStorage.getItem("token");
