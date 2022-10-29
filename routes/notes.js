const notes = require("express").Router();
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

// Get method should read the db file and return it
notes.get("/", async (req, res) => {
  const dbPath = `./db/db.json`;
  const data = JSON.parse(await readFilePromise(dbPath, (err, data) => data));
  res.json(data);
});

// Post method should read the db file, add a new note, write the new list to the file and send a valid response
notes.post("/", async (req, res) => {
  const newNote = req.body;
  if (newNote === {}) {
    return res.status(400).send("Bad Request");
  }
  newNote.id = uuidv4();

  const dbPath = `./db/db.json`;
  const data = JSON.parse(await readFilePromise(dbPath, (err, data) => data));

  data.push(newNote);
  await writeFilePromise(dbPath, JSON.stringify(data, null, 2));
  res.send(`${req.method} received`);
});

// Delete method should receive an id in the request path. It will read from the db file and remove it from the list. Then it will write the new list to the file.
notes.delete("/:id", async (req, res) => {
  const dbPath = `./db/db.json`;
  const data = JSON.parse(await readFilePromise(dbPath, (err, data) => data));

  console.log(req.params.id);

  data.forEach((note, index) => {
    if (note.id === req.params.id) {
      data.splice(index, 1);
    }
  });

  await writeFilePromise(dbPath, JSON.stringify(data, null, 2));
  res.send(`${req.method} received`);
});

module.exports = notes;
