import { Router } from "express";
import usersCollection from "../../dao/models/user.js";
import { createHash, isValidPassword } from "../../utils.js";
import passport from "passport";

const router = Router();

////////////////////////////////////////////////////
/////////// LOGIN CON BCRYPT UNICAMENTE ////////////
///////////////////////////////////////////////////

// Router para registro de usuarios
/* router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    const newUser = new usersCollection({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    });
    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    res.status(500).send("Error registering user!");
  }
}); */

// Router para login de usuarios
/* router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersCollection.findOne({ email:email }, {email:1, first_name:1, last_name:1, password:1});
    //Verifico que exista el email en la base
    if (!user) {
      return res.status(404).send("User not found!");
    }
    //Verifico la contraseña ingresada
    if (!isValidPassword(user, password)) {
      return res.status(401).send("Invalid password!");
    }
    delete user.password;

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
}); */

// Router para logout de usuarios
/* router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Failed to logout!");
    res.redirect("/login");
  });
}); */

/////////////////////////////////////////
/////////// LOGIN CON PASSPORT //////////
////////////////////////////////////////

// Router para registro de usuarios
router.post("/register",passport.authenticate("register", { failureRedirect: "failregister" }),
  async (req, res) => {
    res.redirect("/login");
  }
);

router.get("/failregister", async (req, res) => {
  res.send({ error: "Error registering user" });
});

// Router para login de usuarios
router.post("/login",passport.authenticate("login", { failureRedirect: "faillogin" }),
  async (req, res) => {
    if (!req.user)
      return res.status(400).send({ status: "error", error: "Incomplete email or password" });
    try {
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
      };
      res.redirect("/products");
    } catch (err) {
      res.status(500).send("Error login user!");
    }
  }
);

router.get("/faillogin", (req, res) => {
  res.send({ error: "Failed login" });
});

// Router para logout de usuarios
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error signing out");
    res.redirect("/login");
  });
});

// Router para reestablecer contraseña
router.get("/reset-password", (req, res) => {
  res.render("restorePass");
});

router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found!");
    }
    user.password = createHash(password);
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.status(500).send("Error resetting password!");
  }
});

// Login con Github
router.get("/github",passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get("/githubcallback",passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

export default router;
