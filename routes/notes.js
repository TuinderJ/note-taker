const notes = require("express").Router();
const fs = require("fs");
const util = require("util");

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

notes.post("/", async (req, res) => {
  const dbPath = `./db/db.json`;
  const data = JSON.parse(await readFilePromise(dbPath, (err, data) => data));
  console.log(data, req.body);
  data.push(req.body);
  await writeFilePromise(dbPath, JSON.stringify(data));
  res.send(`${req.method} received`);
});

notes.get("/", async (req, res) => {
  const data = JSON.parse(await readFilePromise(`./db/db.json`, (err, data) => data));
  res.send(data);
});

module.exports = notes;
