const express = require('express');
const router = express();
const Auteur = require('../models/auteur');

router.post('/auteurs', (req, res) => {
   const auteur = new Auteur(req.body);
   auteur.save((err, msg) => {
       if(err) {
           return res.status(500).json(err)
       }
       res.status(201).json(msg);
   });
});

router.get('/auteurs', (req, res) => {
   Auteur.find()
       .exec()
       .then(auteur => res.status(200).json(auteur))
       .catch(err => res.status(500).json({
           message: 'je ne trouve pas d\'auteur',
           err: err
       }))
});

/*Auteur
    .findOne({})
    .populate('articles')
    .then(auteur => {
        res.json(auteur)
    })*/


module.exports = router;
