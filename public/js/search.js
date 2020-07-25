/* eslint-disable prettier/prettier */
//const express = require("express");

$(".submit").on("click", (event) => {
  event.preventDefault();

  const newQuery = {
    query: $("#search")
      .val()
      .trim(),
  };
  console.log(newQuery);

  const queryURL =
    "https://api.edamam.com/search?q=" +
    newQuery +
    "&app_id=dd153d3f&app_key=e1ba59a8ca84e648a5c86dbbda76b663";

  // $.get(queryURL).then((response) => {
  //   return console.log(response);
  //   //location.reload();
  // });

  $.ajax("/members", {
    type: "GET",
    data: queryURL,
  }).then(() => {
    console.log(queryURL);
    //location.reload();
  });

  // $.ajax("/members", {
  //   type: "GET",
  //   data: queryURL,
  // }).then((response) => {
  //   return console.log(response);
  //   //location.reload();
  // });

  // $.post("/api/recipe", newQuery).then((data) => {
  //   console.log(data);

  //   alert("Searching...");
  // });
});
