const express = require("express");
const User = require("../models/User");

const router = express.Router();

//@route  POST api/users
//@desc   Registra un nuevo usuario
//@access  Public
router.post("/", async (req, res) => {
  //Validar los datos
  //Mirar si el User ya existe
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "EL usuario ya existe" });
    }
    user = new User({
      name,
      email,
      password,
    });
    await user.save();

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error en el servidor");
  }
  res.json(req.body);
});

module.exports = router;
