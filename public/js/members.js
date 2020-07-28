/* eslint-disable prettier/prettier */
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  const searchBtn = $(".searchBtn");

  searchBtn.on("click", () => {
    const appId = "add72012";
    const appKey = "cb87396ddb413723f833ddcae1c1d4e5";
    const searchQuery = $("#searchInput").val();

    $.get(
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}`,
      (response) => {
        $("#results").empty();
        console.log("response", response);
        const hits = response.hits;

        $("#results").append(
          `<div class="font-weight-bold">Results: ${hits.length}</div>`
        );

        hits.forEach((hit) => {
          const recipe = $("<div>");

          const dietLabels = $("<div>");

          hit.recipe.dietLabels.forEach((dietLabel) => {
            dietLabels.append(
              `<span class="badge badge-warning">${dietLabel}</span>`
            );
          });

          const ingredientList = $("<div>");

          hit.recipe.ingredients.forEach((ingredient) => {
            ingredientList.append(
              `<div class="ingredient">
              <img class="ingredient-image" src="${ingredient.image}"/>
              <span>${ingredient.text}</span>
              </div>`
            );
          });

          $("img").on("error", function() {
            $(this).css("visibility", "hidden");
            $(this).css("width", "50px");
            $(this).css("height", "50px");
          });

          recipe.html(`
            <div class="card">
              <div class="card-body">
                <img class="card-image" src="${hit.recipe.image}">
                <div class="card-text recipe-name" >${hit.recipe.label.toUpperCase()}</div>
                <div class="diet-labels">${dietLabels.html()}</div>
                <div class="time">
                  <span class="dot"></span>
                  ${hit.recipe.totalTime} minutes
                </div>
                <div class="actions">
                  <button class="btn btn-warning showRecipe">Show Recipe</button>
                  <button class="btn btn-secondary saveBtn" 
                  data-id="${hit.recipe.url}" 
                  data-label="${hit.recipe.label}" 
                  data-image="${hit.recipe.image}" 
                  data-time="${hit.recipe.totalTime}">
                  
                  <i class="fa fa-plus"></i>
                  </button>
                </div>
                <div class="recipe-link">
                  <a href=${hit.recipe.url} 
                  target="_blank">Link to Recipe</a>
                </div>
                <div class="recipe-information">
                  <div class="ingredient-list">
                    ${ingredientList.html()}
                  </div>
                </div>
              </div>
            </div>
          `);
          $("#results").append(recipe);
        });
        $(".showRecipe").on("click", function() {
          const recipeInfo = $(this)
            .parent()
            .siblings(".recipe-information");

          if ($(this).text() === "Show Recipe") {
            recipeInfo.slideDown();
            $(this).text("Hide Recipe");
          } else {
            recipeInfo.slideUp();
            $(this).text("Show Recipe");
          }
        });
        $(".saveBtn").on("click", function() {
          const recipeUrl = $(this).data("id");
          const recipeLabel = $(this).data("label");
          const recipeImage = $(this).data("image");
          const recipeTime = $(this).data("time");
          $.post("/api/saveRecipe", {
            RecipeUrl: recipeUrl,
            RecipeLabel: recipeLabel,
            Image: recipeImage,
            PrepTime: recipeTime,
            // UserId: UserId,
          })
            .then(() => {
              alert("Recipe Saved!");
            })
            .catch(() => {
              alert("Recipe was not saved!");
            });
        });
      }
    );
  });

  $(".deleteBtn").on("click", function() {
    const recipeId = $(this).data("id");

    $.ajax({
      url: `/api/saveRecipe/${recipeId}`,
      method: "DELETE",
    })
      .then(() => {
        alert("Recipe deleted");
        location.reload();
      })
      .catch(() => {
        alert("Error");
      });
  });
});
