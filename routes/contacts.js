const express = require("express");
const router = express.Router();

//@route GET api/contacts
//@desc Obtener todos los contactos
//@access Private
router.get("/", (req, res) => res.json({ contacts: "Array con contactos" }));

//@route POST api/contacts
//@desc  Crear un contacto nuevo
//@access Private
router.post("/", (req, res) => res.json({ contact: "EL contacto creado" }));

//@route PUT api/contacts/:id
//@desc Actualiza un contacto
//@access Private
router.put("/", (req, res) => res.json({ contact: "Actualiza un contacto" }));

//@route DELETE api/contacts/:id
//@desc Borra un contacto
//@access Private
router.delete("/", (req, res) => res.json({ contact: "Borra un contacto" }));

module.exports = router;
