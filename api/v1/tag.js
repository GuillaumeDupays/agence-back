const express = require('express');
const router = express();
const Tag = require('../models/tag');

router.get('/tags', (req, res) => {
   Tag.find()
       .sort({ 'created on': -1 })
       .exec()
       .then( tags => res.status(200).json(tags))
       .catch( err => res.status(500).json({
           message: 'tags non trouvés',
           error: err
       }));
});



router.post('/tags', (req, res) => {
    console.log('req.body', req.body);
    const tag = new Tag(req.body);
    tag.save((err, tag) => {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(201).json(tag);
    });
});

module.exports = router;
