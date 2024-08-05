const express = require("express");
const users = require("./sample.json");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
const port = 7000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
// get read
app.get("/users", (req, res) => {
  return res.json(users);
});

//delete data

app.delete("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let filtered = users.filter((user) => {
    return user.id !== id;
  });
  fs.writeFile("./sample.json", JSON.stringify(filtered), (err, data) => {
    return res.json(filtered);
  });
});

//post data
app.post("/users", (req, res) => {
  let { name, age, city } = req.body;

  if (!name || !age || !city) {
    res.status(400).send({ message: "All fields Required" });
  }
  let id = Date.now();
  users.push({ id, name, age, city });

  fs.writeFile("./sample.json", JSON.stringify(users), (err, data) => {
    return res.json({ message: "user detail added success" });
  });
});

//updateuser patch
app.patch("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let { name, age, city } = req.body;

  if (!name || !age || !city) {
    res.status(400).send({ message: "All fields Required" });
  }
   
  let index = users.findIndex((user)=>user.id == id)
   
  
  users.splice(index,1,{... req.body})

  fs.writeFile("./sample.json", JSON.stringify(users), (err, data) => {
    return res.json({ message: "user detail update" });
  });
});

app.listen(port, (err) => {
  console.log("app is running");
});
