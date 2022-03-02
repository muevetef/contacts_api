const express = require("express");
const router = express.Router();

//@route GET api/login/:id
//@desc Obtener el usuario logeado
//@access Private
router.get("/", (req, res) => res.json({ user: "Usuario logueado" }));

//@route  POST api/login
//@desc   Autentificar el usuario y generar un token
//@access Public
router.post("/", (req, res) => res.json({ token: "Toma tu token!" }));

module.exports = router;
