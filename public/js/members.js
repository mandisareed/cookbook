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

          recipe.html(`
            <div class="card">
              <div class="card-body">
                <img class="card-image" src="${hit.recipe.image}">
                <div class="card-text recipe-name">${hit.recipe.label}</div>
                <div class="diet-labels">${dietLabels.html()}</div>
                <div class="time">
                  <span class="dot"></span>
                  ${hit.recipe.totalTime} minutes
                </div>
                <button id="saveBtn" class="btn btn-secondary" data-id="${hit.recipe.uri}"><i class="fa fa-plus"></i></button>
              </div>
            </div>
          `);
          $("#results").append(recipe);
        });
        $("#saveBtn").on("click", function() {
          const recipeUri = $(this).data("id");
          $.post("/api/saveRecipe", {
            recipeUri: recipeUri
          }).then(() => {
            alert("Recipe Saved!");
          }).catch(() => {
            alert("Recipe was not saved!");
          });
        });
      }
    );
  });
});
