const express = require("express");
const app = express();
const notes = require("./notes");

app.get("/", (req, res) => res.send("Hello World!"));
app.use(`/notes`, notes);

module.exports = app;
