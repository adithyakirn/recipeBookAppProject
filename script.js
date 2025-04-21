
import { API_KEY } from "./config.js";
const recipeList = document.getElementById(`items`);

function displayRecipes(recipes){
    recipeList.innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeItem = document.createElement("li");
        recipeItem.classList.add("itemContainer");
        const recipeImage = document.createElement(`img`);
        recipeImage.src = recipe.image;

        const recipeTitle = document.createElement(`h3`);
        recipeTitle.innerText = recipe.title;

        const recipeIngredients = document.createElement(`p`);
        recipeIngredients.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")} `;

        const recipeLink = document.createElement(`a`);
        recipeLink.href = recipe.sourceUrl;
        recipeLinkEl.innerText = "View Recipe";

        recipeItem.appendChild(recipeImage);
        recipeItem.appendChild(recipeTitle);
        recipeItem.appendChild(recipeIngredients);
        recipeItem.appendChild(recipeLink);
        recipeList.appendChild(recipeItem);
    });
}

async function getRecipes(){
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`)
    const data = await response.json();
    return data.recipes;
}

async function init(){
    const recipes = await getRecipes();
    displayRecipes(recipes);
}

init();