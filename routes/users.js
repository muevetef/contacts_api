const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    //Encriptar el password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //Generamos un token JWT y lo enviamos
    const payload = { user: { id: user.id } };

    jwt.sign(payload,'secreto',{expiresIn: 3600}, (err, token) => {
      if(err) throw err;
      res.json({token});
    });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;
