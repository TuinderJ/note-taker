const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const api = require("./routes/index");

app.use(express.static("public"));
app.use(express.json());

app.use(`/api/`, api);
app.get("/notes/", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
