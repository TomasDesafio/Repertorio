const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.listen(3000, console.log("¡¡Servidor encendido!!"));

app.use(cors());

app.use(express.json());

// Servir la página HTML en la raíz del servidor
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  // 1
  const producto = req.body;
  // 2
  const productos = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
  // 3
  productos.push(producto);
  // 4
  fs.writeFileSync("repertorio.json", JSON.stringify(productos));
  // 5
  res.send("Producto agregado con éxito!");
});

app.delete("/canciones/:id", (req, res) => {
  const  {id} = req.params;
  console.log(id,typeof(id));
  const productos = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = productos.findIndex((p) => p.id == id);
  productos.splice(index, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(productos));
  res.send("Producto eliminado con éxito");
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const producto = req.body;
  console.log(producto)
  const productos = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = productos.findIndex((p) => p.id == id);
  productos[index] = producto;
  fs.writeFileSync("repertorio.json", JSON.stringify(productos));
  res.send("Producto modificado con éxito");
});
