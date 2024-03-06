// Recupération et stockage des travaux
let works = [];

const token = localStorage.getItem("token");

// Récuperer les données via l'API
async function fetchData() {
  const worksUrl = "http://localhost:5678/api/works";

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

  const form = document.getElementById("myForm");
  const photoInput = document.getElementById("inputFile");
  const titleInput = document.getElementById("inputTitle");
  const icon = document.querySelector(".fa-image");
  const selectCategories = document.getElementById("selectCategories");
  const submitButton = document.getElementById("submitButton");
  const erreurText = document.createElement("p");

  erreurText.classList.add("error-message");

  // ecouteur evenement
  photoInput.addEventListener("input", () => {
    updateButtonColor();
    updatePreview();
  });

  titleInput.addEventListener("input", updateButtonColor);
  selectCategories.addEventListener("change", updateButtonColor);

  function removePreviewImage() {
    if (selectedImage) {
      selectedImage.parentNode.removeChild(selectedImage);
    }
  }

  function updatePreview() {
    const buttonAdd = document.querySelector("buttonAddPhoto");
    const pPhoto = document.querrySelector(".p-photo");

    if (photoInput.files[0]) {
      buttonAdd.style.display = "none";
      pPhoto.style.display = "none";
      icon.style.display = "none";
    }
  }

  function addInput() {
    const buttonAdd = document.querrySelector(".buttonAddPhoto");
    const pPhoto = document.querrySelector(".p-photo");

    buttonAdd.style.display = "block";
    pPhoto.style.display = "block";
    icon.style.display = "block";
  }

  function updateButtonColor() {
    const photoInput = document.getElementById("inputFile");
    const buttonAdd = document.querySelector(".buttonAddPhoto");
    const pPhoto = document.querrySelector(".p-photo");
    const icon = document.querrySelector(".fa-image");

    if (photoInput.files[0] && titleInput.value && selectCategories.value) {
      submitButton.style.backgroundColor = "#1D6154";
    } else {
      submitButton.style.backgroundColor = "";
    }
  }

  function resetModalI() {
    titleInput.value = "";
    selectCategories.value = "";
    photoInput.value = "";
    submitButton.style.backgroundColor = "";
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
      document.querrySelector(".modal-d").classList.contains("modal--open-d")
    ) {
      const endPoint = "http://localhost:5678/api/works";
      const formData = new FormData();

      formData.append("image", photoInput.files[0]);
      formData.append("title", titleInput.value);
      formData.append("category", selectCategories.value);

      fetch(endPoint, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            

            removePreviewImage();
            resetModalI();
            addInput();

            window.alert("Photo ajouté");

            // recharge Travaux
            return fetchData();
          } else {
            

            window.alert("Veuillez renseignez les champs.");
          }
        })

        .catch((error) => {
          console.error("Erreur pendant la requete", error);
        });
    }
  });
});
//--------------------- catégories

//tableau catégories

async function getCategories() {
  const categoriesUrl = "http://localhost:5678/api/categories";

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
    const figCaptionGallery = document.createElement("figcaption");
    const figureGallery = document.createElement("figure");
    const trashIcon = document.createElement("i");
    const divModal = document.createElement("div");
    const imgModal = document.createElement("img");
    const span = document.createElement("span");
    // appendChild
    gallery.appendChild(figureGallery);
    figureGallery.appendChild(figCaptionGallery);
    figureGallery.appendChild(imgGallery);
    span.appendChild(trashIcon);
    divModal.appendChild(span);
    modalBody.appendChild(divModal);
    divModal.appendChild(imgModal);
    
    figCaptionGallery.innerText = travail.title;
    imgGallery.src = travail.imageUrl;
    
    
    


    trashIcon.classList.add("fa-solid", "fa-trash-can");
    divModal.classList.add("divModal");

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
        window.alert("Photo supprimée");
        return fetchData();
      });
    });
  });
}

const logoutButton = document.getElementById("loginButton");

if (token !== null) {
  document.querySelector(".flex-align button").style.display = "block";
  document.querySelector(".mode-edition").style.display = "block";
  const login = document.querySelector("#loginButton");
  login.innerText = "Logout";
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
  });
}

const flexAlign = document.querySelector(".flex-align");

if (token) {
  flexAlign.classList.add("extra-space");
} else {
  flexAlign.classList.remove("extra-space");
}
