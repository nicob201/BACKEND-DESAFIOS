import passport from "passport";
import local from "passport-local";
import GitHubStrategy from 'passport-github2'
import userService from "../dao/models/user.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

// Estrategia local para passport
const initializePassport = () => {

  /////////////////////////////////////////
  /////////// LOGIN CON GITHUB ///////////
  ////////////////////////////////////////
  passport.use("github",new GitHubStrategy({
        clientID: "Iv23lidSQRnwYn2Gogqf",
        clientSecret: "2235bd73883883c4625b21606572482741c0cb7f",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          let user = await userService.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 20,
              email: profile._json.email,
              password: "",
            };
            let result = await userService.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  /////////////////////////////////////////
  /////////// LOGIN CON PASSPORT ///////////
  ////////////////////////////////////////
  passport.use("register",new LocalStrategy({ passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await userService.findOne({ email: username });
          if (user) {
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          let result = await userService.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error creating user!" + error);
        }
      }
    )
  );

  passport.use("login",new LocalStrategy({ usernameField: "email" },
  async (username, password, done) => {
    try {
      const user = await userService.findOne({ email: username });
      if (!user) {
        return done(null, user);
      }
          if (!isValidPassword(user, password)) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userService.findById(id);
    done(null, user);
  });
};

export default initializePassport;
