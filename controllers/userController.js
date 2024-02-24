const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        // if (user.password !== password) {
        //   return done(null, false, { message: "Incorrect password" });
        // };
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        // passwords do not match!
            return done(null, false, { message: "Incorrect password" })
        }
        return done(null, user);
      } catch(err) {
        return done(err);
      };
    })
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
  });

exports.sign_up_get = asyncHandler(async(req, res, next) => {
    res.render('sign-up', { title: 'Sign-up' });
});

//TODO: Sanitize inputs
exports.sign_up_post = [
    body("first_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("First name required")
        .isLength({ max: 20 })
        .withMessage("First name must not exceed 20 characters"),
    body("last_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Last name required")
        .isLength({ max: 20 })
        .withMessage("Last name must not exceed 20 characters"),
    body("email")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Email required")
        .isEmail()
        .withMessage("Invalid email address")
        .isLength({ max: 30 })
        .withMessage("Email must not exceed 30 characters")
        .custom(async value =>{
            const existinguser = await User.findOne({ email: value });
            if (existinguser) {
                throw new Error('Email already in use.')
            }
        }),
    body("password")
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be between 8 and 20 characters."),
    body("confirm_password")
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Typed passwords do not match"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            is_member: false,
            is_admin: false
        });

        if (!errors.isEmpty()) {
            res.render('sign-up', {
                title: 'Sign-up' ,
                userDetail: user,
                errors: errors.array(),
            });
            return;
        } else {
            await user.save();
            res.redirect('/');
        }
    })
];

exports.log_in_get = asyncHandler(async(req, res, next) => {
    res.render('log-in', { title: 'Log In' });
});

exports.log_in_post = [
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "log-in"
      })
];

exports.log_out_get = asyncHandler(async(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});