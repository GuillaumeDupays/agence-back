const express = require('express');
const router = express();
const Article = require('../models/article');

router.get('/articles', (req, res) => {
   Article.find()
       .sort({ 'created on': -1 })
       .exec()
       .then( articles => res.status(200).json(articles))
       .catch( err => res.status(500).json({
           message: 'articles non trouvés',
           error: err
       }));
});

router.post('/articles', (req, res) => {
   console.log('req.body', req.body);
   const article = new Article(req.body);
   article.save((err, article) => {
      if(err) {
          return res.status(500).json(err);
      }
      res.status(201).json(article);
   });
});

router.delete('/articles/:id', (req, res) => {
    const id = req.params.id;
    Article.findByIdAndDelete(id, (err, article) => {
        if(err) {
            return res.status(500).json(err)
        }
        res.status(202).json({ msg: `message ${article._id} supprimé`});
    });
});

module.exports = router;
