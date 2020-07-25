$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var searchBtn = $(".searchBtn");

  searchBtn.on("click", (event) => {
    var appId = "add72012";
    var appKey = "cb87396ddb413723f833ddcae1c1d4e5";
    var searchQuery = $("#searchInput").val();

    $.get(
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}`,
      function(response) {
        console.log("response", response);
        var hits = response.hits;

        for (var i = 0; i < hits.length; i++) {
          var recipe = $("<div>");
          recipe.attr("data-id", hits[i].recipe.uri);
          recipe.html(`
            <div class="card" style="width: 18rem;">
              <img src="${hits[i].recipe.image}" class="card-img-left" alt="...">
              <div class="card-body">
                <p class="card-text">${hits[i].recipe.label}</p>
              </div>
            </div>
          `);
          $("#results").append(recipe);
        }
      }
    );
  });
});
