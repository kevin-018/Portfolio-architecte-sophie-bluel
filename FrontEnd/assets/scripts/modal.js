function openModal() {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector(".modal").classList.add("modal--open");
}
function buttonOpenModal() {
  const buttonOpenModal = document.getElementById("button-open-modal");
  buttonOpenModal.addEventListener("click", (e) => {
    e.preventDefault;
    openModal();
  });
}
function closeModal() {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".modal").classList.remove("modal--open");
}
function closeModalForm() {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".modal").classList.remove("modal--open");
  document.querySelector(".modal-d").classList.remove("modal--open-d");
}
function buttonCloseModal() {
  const buttonCloseModal = document.getElementById("button-close-modal");
  buttonCloseModal.addEventListener("click", (e) => {
    e.preventDefault;
    closeModal();
    closeModalForm();
  });
}
document.querySelector(".overlay").addEventListener("click", function (event) {
  if (event.target === document.querySelector(".overlay")) {
    closeModal();
    closeModalForm();
  }
});

function openModalD() {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector(".modal-d").classList.add("modal--open-d");
  document.querySelector(".modal").classList.remove("modal--open");
}
function buttonOpenModalD() {
  const buttonOpenModalD = document.getElementById("button-open-modal-d");
  buttonOpenModalD.addEventListener("click", (e) => {
    e.preventDefault;
    openModalD();
  });
}
function returnModal() {
  document.querySelector(".modal-d").classList.remove("modal--open-d");
  document.querySelector(".modal").classList.remove("modal--open");
  document.querySelector(".modal").classList.add("modal--open");
  document.querySelector(".overlay").style.display = "block";

  document
    .querySelector(".overlay")
    .addEventListener("click", function (event) {
      if (event.target === document.querySelector(".overlay")) {
        returnModal();
      }
    });
}
function buttonReturnModal() {
  const buttonReturnModal = document.getElementById("button-return-modal");
  buttonReturnModal.addEventListener("click", (e) => {
    e.preventDefault;
    returnModal();
  });
}

const token = localStorage.getItem("token");
buttonOpenModal();
buttonCloseModal();
buttonOpenModalD();
buttonReturnModal();
