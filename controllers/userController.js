const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

require('dotenv').config();

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
        // If user doesn't exist in DB
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        const match = await bcrypt.compare(password, user.password);
        // If password doesn't match 
        if (!match) {
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

// Get form so creating new user
exports.sign_up_get = asyncHandler(async(req, res, next) => {
    res.render('sign-up', { title: 'Sign-up' });
});

// Post new user
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

        // Create new user with form fields, membership and admin false by default
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            is_member: false,
            is_admin: false
        });

        // If errors, redraw and repopulate form with errors displayed
        if (!errors.isEmpty()) {
            res.render('sign-up', {
                title: 'Sign-up' ,
                userDetail: user,
                errors: errors.array(),
            });
            return;
        } else {
            // Save user to database and redirect to home
            await user.save();
            res.redirect('/');
        }
    })
];

// Get log-in form
exports.log_in_get = asyncHandler(async(req, res, next) => {
    res.render('log-in', { title: 'Log In' });
});

// Redirect to home if successful, reload page if not
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

// Draw form for membership password
exports.confirm_get = asyncHandler(async(req, res, next) => {
    if (req.user && (req.user.is_member == false)) {
        res.render('confirm', { title: 'Confirm Membership' });
    } else {
        res.redirect('/');
    }
});

// If password matches, update user's membership status
exports.confirm_post = asyncHandler(async(req, res, next) => {
    if (req.body.password == process.env.CONFIRM_USER_PW) {
        let userId = req.user._id;
        await User.findByIdAndUpdate(userId, {is_member: true}, {});
        res.redirect("/");
    } else {
        res.render('confirm', { title: 'Confirm Membership' });
    } 
});

exports.admin_get = asyncHandler(async(req, res, next) => {
    if (req.user && (req.user.is_member == true)) {
        res.render('admin', { title: 'Confirm Admin Status' });
    } else {
        res.redirect('/');
    }
});

exports.admin_post = asyncHandler(async(req, res, next) => {
    if (req.body.password == process.env.CONFIRM_ADMIN_PW) {
        let userId = req.user._id;
        await User.findByIdAndUpdate(userId, {is_admin: true}, {});
        res.redirect("/");
    } else {
        res.render('confirm', { title: 'Confirm Membership' });
    }
});