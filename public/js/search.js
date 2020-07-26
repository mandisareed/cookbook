/* eslint-disable prettier/prettier */
//const express = require("express");

$("#submit").on("click", (event) => {
  event.preventDefault();

  const newQuery = {
    query: $("#search")
      .val()
      .trim(),
  };
  console.log(newQuery);

  $.ajax("/search", {
    type: "GET",
    data: newQuery,
  }).then(() => {
    console.log(newQuery);
    //location.reload();
  });

  // $.post("/api/recipe", newQuery).then((data) => {
  //   console.log(data);

  //   alert("Searching...");
  // });
});


//i don't think a delete function is needed in this file, as it's in the saved.handlebards file

//delete function to delete a saved recipe
//not sure which of this two functions is more in the right direction:
// $(".delete-recipe").on("click", function () {
//   const id = $(this).data("id");

//   // Send the DELETE request.
//   //what's the route to the saved recipes page
//   $.ajax(`/api/saved/${id}`, {
//     type: "DELETE",
//   }).then(() => {
//     // Reload the page to get the updated list
//     location.reload();
//   });
// });

// //OR

// function deleteRecipe(id) {
//   $.ajax({
//     method: "DELETE",
//     url: `/api/saved/${id}`
//   })
//     .then(() => {
//       getPosts(postCategorySelect.val());
//     });
// }
