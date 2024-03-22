const URL = "http://localhost:5678/api/";
const worksUrl = `${URL}works`;
const categoriesUrl = `${URL}categories`;
// Recupération et stockage des travaux
let works = [];

const token = localStorage.getItem("token");
// Récuperer les données via l'API
async function fetchData() {
  try {
    const response = await fetch(worksUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    works = await response.json();

    // le tableau des travaux
    createWorks(works);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

//execute la fonction fetchdata apres le DOM
document.addEventListener("DOMContentLoaded", async () => {
  await fetchData();
  getCategories();
  const erreurText = document.createElement("p");
  erreurText.classList.add("error-message");
});
//--------------------- catégories
//tableau catégories
async function getCategories() {
  try {
    const response = await fetch(categoriesUrl);

    if (!response.ok) {
      throw new error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    createCategories(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
// créations boutons filtres
function createCategories(categories) {
  const categoriesGallery = document.createElement("div");
  categoriesGallery.classList.add("container");

  const buttonCategoriesTous = document.createElement("button");
  buttonCategoriesTous.classList.add("filter-button");

  buttonCategoriesTous.innerText = "Tous";
  buttonCategoriesTous.setAttribute("data-category-id", 0);
  categoriesGallery.appendChild(buttonCategoriesTous);

  if (token !== null) {
    categoriesGallery.style.display = "none";
  }

  for (let i = 0; i < categories.length; i++) {
    const buttonC = categories[i];

    const buttonCategories = document.createElement("button");
    buttonCategories.classList.add("filter-button");

    buttonCategories.innerText = buttonC.name;
    buttonCategories.setAttribute("data-category-id", buttonC.id);
    categoriesGallery.appendChild(buttonCategories);
  }
  const divD = document.createElement("div");

  const gallery = document.querySelector(".gallery");
  const pGallery = gallery.parentElement;

  divD.appendChild(categoriesGallery);
  pGallery.insertBefore(divD, gallery);
  // filtrer au clics sur les boutons
  const boutonsF = document.querySelectorAll(".filter-button");

  boutonsF.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const categorieFilterId = parseInt(
        bouton.getAttribute("data-category-id"),
        10
      );

      filterByCategorie(categorieFilterId);

      boutonsF.forEach((btn) => {
        btn.classList.remove("active");
      });
      bouton.classList.add("active");
    });
  });
  buttonCategoriesTous.click();
}
// filtre sur les travaux
function filterByCategorie(categorieId) {
  const travauxF = works.filter((travail) => {
    return categorieId === 0 || travail.categoryId === categorieId;
  });
  console.log(travauxF);
  createWorks(travauxF);
}
// tableau works
function createWorks(filteredWorks) {
  const gallery = document.querySelector(".gallery");
  const modal = document.querySelector(".modal");
  gallery.innerHTML = "";
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = "";
  Array.from(modal.children).forEach((child) => {
    if (
      !child.classList.contains("modal-close") &&
      !child.classList.contains("modal-header")
    ) {
      child.remove();
    }
  });
  const modalForm = document.createElement("div");
  modalForm.classList.add("modalForm");
  filteredWorks.forEach((travail) => {
    // const priority
    const imgGallery = document.createElement("img");
    const trashIcon = document.createElement("i");
    const divModal = document.createElement("div");
    const imgModal = document.createElement("img");
    const figureGallery = document.createElement("figure");
    const figCaptionGallery = document.createElement("figcaption");
    const span = document.createElement("span");
    // appendChild
    gallery.appendChild(figureGallery);
    figureGallery.appendChild(imgGallery);
    divModal.appendChild(span);
    modalBody.appendChild(divModal);
    divModal.appendChild(imgModal);
    span.appendChild(trashIcon);
    figureGallery.appendChild(figCaptionGallery);

    figCaptionGallery.innerText = travail.title;
    imgGallery.src = travail.imageUrl;
    divModal.classList.add("divModal");
    trashIcon.classList.add("fa-solid", "fa-trash-can");

    imgModal.src = travail.imageUrl;
    trashIcon.id = travail.id;
    trashIcon.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      fetch(`http://localhost:5678/api/works/${travail.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        return fetchData();
      });
    });
  });
}
function getAuthorization() {
  const token = JSON.parse(localStorage.getItem("auth")).token;
  return "Bearer" + token;
}
console.log(token);
//log
const logoutButton = document.getElementById("loginButton");
if (token !== null) {
  const login = document.querySelector("#loginButton");
  document.querySelector("p.align-p").style.display = "flex";
  document.querySelector(".mode-edition").style.display = "block";
  login.innerText = "Logout";
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
  });
}
//preview image
const previewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input");
const labelFile = document.querySelector(".containerFile label");
const iconFile = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");
// ecoute changement input
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "flex";
      labelFile.style.display = "none";
      iconFile.style.display = "none";
      pFile.style.display = "none";
    };
    reader.readAsDataURL(file);
  }
});
// POST pour l'ajout du projet
//addWorkButton.addEventListener("click", function () {
const addWork = function () {
  //let token = sessionStorage.getItem("token");
  const formData = new FormData();
  // recupération title ,category, img
  const titre = document.querySelector("#titre").value;
  const categorie = document.querySelector("#selectCategories").value;
  const fileField = document.querySelector('input[type="file"]');
  
  formData.append("title", titre);
  formData.append("category", categorie);
  formData.append("image", fileField.files[0]);

  fetch(worksUrl, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  }).then((response) => {
    if (response.status === 200 || response.status === 201) {
      resetForm();
      veriForm();
      resetPreview();
      fetchData();
    } else if (response.status === 401) {
      console.log("sesion expiré");
    } else {
      console.log("Erreur");
      
    }
  });
};
// remise a 0 du form
function resetForm(){
  selectCategories.value = 0;
  titre.value = "";
}
function resetPreview() {
  inputFile.value = "";
  previewImg.src = "";
  previewImg.style.display = "none";
  labelFile.style.display = "flex";
  iconFile.style.display = "flex";
  pFile.style.display = "flex";

}
// verifié le formulaire
const veriForm = function () {
  if (
    inputFile.value != "" &&
    selectCategories.value != 0 &&
    titre.value != ""
  ) {
    addWorkButton.style.backgroundColor = "#1D6154";
    addWorkButton.addEventListener("click", addWork);
  } else {
    addWorkButton.style.backgroundColor = "#A7A7A7";
    addWorkButton.removeEventListener("click", addWork);
  }
};
inputFile.addEventListener("change", veriForm);
selectCategories.addEventListener("change", veriForm);
titre.addEventListener("change", veriForm);
console.log(file.value);
