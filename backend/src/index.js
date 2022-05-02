const express = require("express");
const cors = require("cors");
const fs = require("fs");
let data = require("./data");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

function saveData(data) {
  fs.writeFile("./data.json", JSON.stringify(data), { flag: "a+" }, (err) => {
    if (err) console.log(err);
  });
}

app.get("/todos", (req, res) => {
  return res.status(200).send({ data });
});

app.post("/todos", (req, res) => {
  data = req.body;
  saveData(data);
  return res.status(201);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
