const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
const db = require("./query");
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Hello World");
})
app.get("/user/:id", db.getUserById);
app.get("/users", db.getUsers);
app.post("/user", db.createUser);
app.put("/user/:id", db.updateUser);
app.delete("/user/:id", db.deleteUser);
app.listen(port, () => {
    console.log("Server Started on PORT: " + port);
})
