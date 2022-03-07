const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const app = express();

//Conectamos a la DB
connectDB();
app.use(cors());
//Middleware para recoger el JSON en el Body de la request
app.use(express.json());

// Definir las rutas
app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/login"));
app.use("/api/contacts", require("./routes/contacts"));

//default route
app.use("*", (req, res) => res.send("<h1>API de contactos</h1>"));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Servidor escuchando den el puerto ${PORT}`)
);
