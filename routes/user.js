const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Bring in User Model
let User= require('../models/user');

// Register Form
router.get('/register', (req, res) => {
    res.render('register');
});

// Register Process
router.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirm_password', 'Confirm Password is required').notEmpty();
    req.checkBody('confirm_password', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        let user = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });

        bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(user.password, salt, (err, hash) => {
               if (err) {
                   console.log(err);
               }
               user.password = hash;
               user.save(err => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'You are not registered and can log in');
                        res.redirect('/user/login');
                    }
               });
           });
        });
    }
});

router.get('/login', (req, res) => {
   res.render('login');
});

module.exports = router;





