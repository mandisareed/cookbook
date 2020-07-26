/* eslint-disable prettier/prettier */
const axios = require("axios");
//const express = require("express");
//const router = express.Router();

module.exports = (app) => {
  // eslint-disable-next-line no-unused-vars
  app.get("/search", (req, res) => {
    const query = req.query.query;
    console.log(query);
    const config = { headers: { accept: "application/json" } };
    axios
      .get(
        "https://api.edamam.com/search?q=" +
          query +
          "&app_id=dd153d3f&app_key=e1ba59a8ca84e648a5c86dbbda76b663",
        //"https://api.edamam.com/search?q=chicken&app_id=dd153d3f&app_key=e1ba59a8ca84e648a5c86dbbda76b663",
        config
      )
      .then((response) => {
        console.log(response.data.hits[0]);
        // res.json(response.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};