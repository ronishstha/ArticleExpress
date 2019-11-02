const express = require('express');
const router = express.Router();

// Bring in Article Model
let Article = require('../models/article');

// Add Route
router.get('/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    })
});

// Add Submit POST route
router.post('/add', (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is requird').notEmpty();

    // Get Errors
    let errors = req.validationErrors();

    if (errors) {
        res.render('add_article', {
            title: 'Add Article',
            errors: errors
        })
    } else {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;

        article.save(err => {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'Articles Added');
                res.redirect('/');
            }
        });
    }
});

// Get Single Article
router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('article', {
            article: article
        });
    });
});

// Load Edit Form
router.get('/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('edit_article', {
            title: 'Edit Article',
            article: article
        });
    });
});

// Update Submit Post Route
router.post('/edit/:id', (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is requird').notEmpty();

    // Get Errors
    let errors = req.validationErrors();

    if (errors) {
        Article.findById(req.params.id, (err, article) => {
            res.render('edit_article', {
                title: 'Edit Article',
                article: article,
                errors: errors
            });
        });
    } else {
        let article = {};
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;

        let query = {_id: req.params.id};

        Article.update(query, article, err => {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'Article Updated');
                res.redirect('/');
            }
        });
    }
});

// Delete Article
router.delete('/:id', (req, res) => {
    let query = {_id: req.params.id};

    Article.remove(query, err => {
        if (err) {
            console.log(err);
        }
        res.send('Success');
    });
});

module.exports = router;
