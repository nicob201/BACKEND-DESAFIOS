import { Router } from "express";
import usersCollection from "../../dao/models/user.js";

const router = Router();

// Router para registro de usuarios
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    const newUser = new usersCollection({
      first_name,
      last_name,
      email,
      age,
      password,
    });
    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    res.status(500).send("Error registering user!");
  }
});

// Router para login de usuarios
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersCollection.findOne({ email });
    //Verifico que exista el email en la base
    if (!user) {
      return res.status(404).send("User not found!");
    }
    //Verifico la contraseña ingresada
    if (user.password !== password) {
      return res.status(401).send("Invalid password!");
    }

    const userSession = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: email === "adminCoder@coder.com" ? "admin" : "user",
    };

    req.session.user = userSession;

    res.redirect("/products");
  } catch (err) {
    res.status(500).send("Failed to login!");
  }
});

// Router para logout de usuarios
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Failed to logout!");
    res.redirect("/login");
  });
});

export default router;
