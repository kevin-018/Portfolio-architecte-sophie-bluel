// variables


const gallery = document.querySelector(".galerie");
const filters = document.querySelector(".filters");

// le tableau de la galleries
async function getExpos() {
  const response = await fetch("http://localhost:5678/api/works");
  return response.json();
}
getExpos();

// affichez le works
async function displayExpos() {
  const expos = await getExpos();
  expos.forEach((expo) => {
    createExpos(expo);
  });
}
displayExpos();    

  function createExpos(expo) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = expo.imageUrl;
    figcaption.textContent = expo.title;
    figure.classList.add("galeriesStyle");
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
//--------------------- catégories 

//tableau catégories

async function getCategorys() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

async function displayCategorysButtons() {
  const categorys = await getCategorys();
  console.log(categorys);
  categorys.forEach((category) => {       // navigue dans la catégorys
    const btn = document.createElement("button"); // création de button
    btn.textContent = category.name;  // cherche le name dans categories
    btn.id = category.id; // chercher l'id dans la categories
    filters.appendChild(btn);
  });
}
displayCategorysButtons();

// filtrer au clics sur les boutons

async function filtercategory() {
  const work = await getExpos();    // works = toutes les oeuvres
  console.log(work);
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {   // ajoute un eventListener click
      btnId = e.target.id;
      gallery.innerHTML = "";
      if (btnId !== "0") {  // Si pas egal a 0
        const workTriCategory = work.filter((expo) => {
          return expo.categoryId == btnId;
        });
        workTriCategory.forEach((expo) => {
          createExpos(expo);
        });
      } else {
        displayExpos();
      }
      console.log(btnId);
    });
  });
}
filtercategory();
//sur tous = 0  ne pas activé

//sur Objects = id 1 , appelle uniquement objets et enlevez les autres

//sur Appartements = id 2

//sur Hôtel & restaurants = id 3
