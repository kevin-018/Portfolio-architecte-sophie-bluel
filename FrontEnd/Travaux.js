// variables

const filters = document.querySelector(".filters");

// le tableau de la galleries
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return response.json();
}

// affichez le works

async function createWorks() {
  const gallery = document.querySelector(".galerie");
  const works = await getWorks();
  console.log(gallery);
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
    figure.classList.add("galleryStyle");
    figure.appendChild(img);
    figure.appendChild(figcaption);
    galerie.appendChild(figure)
  });
}
//---------------------
createWorks();
/*
async function getCategorys() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

async function displayCategorysButtons() {
  const categorys = await getCategorys();
  categorys.forEach((category) => {
    // navigue dans la catégorys
    const btn = document.createElement("button");
    // création de button
    btn.textContent = category.name;
    // cherche le name dans categories
    btn.id = category.id;
    // chercher l'id dans la categories
  });
}
displayCategorysButtons();

/*sur tous = 0  ne pas activé */

/*sur Objects = id 1 , appelle uniquement objets et enlevez les autres*/

/*sur Appartements = id 2 */

/*sur Hôtel & restaurants = id 3 */
