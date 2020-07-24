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
