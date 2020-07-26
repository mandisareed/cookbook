$(() => {
  $(".addRecipe").on("submit", (event) => {
    event.preventDefault();

    const savedRecipe = {
      name: $("#ca")
        .val()
        .trim(),
    };

    $.ajax("/api/recipes", {
      type: "POST",
      data: savedRecipe,
    }).then(() => {
      location.reload();
    });
  });
});
