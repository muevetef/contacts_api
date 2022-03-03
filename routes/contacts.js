const express = require("express");
const { check, validationResult } = require("express-validator");
const Contact = require("../models/Contact");
const User = require("../models/User");
const router = express.Router();
const auth = require("../middleware/auth");
//@route GET api/contacts
//@desc Obtener todos los contactos
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    console.log(contacts)
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error en el servidor");
  }
});

//@route POST api/contacts
//@desc  Crear un contacto nuevo
//@access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "El nombre es requerido").not().isEmpty(),
      check("type", "Tiene que ser Personal o Profesional").isIn([
        "Personal",
        "Profesional",
      ]),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    try {
      const { name, email, phone, type } = req.body;
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error en el servidor");
    }
  }
);

//@route PUT api/contacts/:id
//@desc Actualiza un contacto
//@access Private
router.put("/", (req, res) => res.json({ contact: "Actualiza un contacto" }));

//@route DELETE api/contacts/:id
//@desc Borra un contacto
//@access Private
router.delete("/", (req, res) => res.json({ contact: "Borra un contacto" }));

module.exports = router;
