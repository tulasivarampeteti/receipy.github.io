const recipesContainer = document.getElementById("recipes");

async function searchRecipe() {
    const searchInput = document.getElementById("searchInput").value.trim();

    if (searchInput === "") {
        alert("Please enter a recipe name!");
        return;
    }

    recipesContainer.innerHTML = "<h2>Loading...</h2>";

    try {
        const response = await fetch(
            https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}
        );

        const data = await response.json();

        recipesContainer.innerHTML = "";

        if (!data.meals) {
            recipesContainer.innerHTML = "<h2>No recipes found.</h2>";
            return;
        }

        data.meals.forEach(meal => {
            recipesContainer.innerHTML += `
                <div class="recipe-card">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p><b>Category:</b> ${meal.strCategory}</p>
                    <button onclick='showRecipe(${JSON.stringify(meal)})'>
                        View Recipe
                    </button>
                </div>
            `;
        });

    } catch (error) {
        recipesContainer.innerHTML = "<h2>Something went wrong!</h2>";
        console.error(error);
    }
}

function showRecipe(meal) {

    document.getElementById("popup").style.display = "block";
    document.getElementById("recipeTitle").textContent = meal.strMeal;
    document.getElementById("recipeImage").src = meal.strMealThumb;
    document.getElementById("instructions").textContent = meal.strInstructions;

    const ingredients = document.getElementById("ingredients");
    ingredients.innerHTML = "";

    for (let i = 1; i <= 20; i++) {

        const ingredient = meal["strIngredient" + i];
        const measure = meal["strMeasure" + i];

        if (ingredient && ingredient.trim() !== "") {

            const li = document.createElement("li");
            li.textContent = ${ingredient} - ${measure};
            ingredients.appendChild(li);

        }
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Search when Enter key is pressed
document.getElementById("searchInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchRecipe();
    }
});
