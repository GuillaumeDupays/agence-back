const express = require('express');
const router = express();
const Article = require('../models/article');
const multer = require('multer');
const db = require('mongoose');

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

router.get('/articles/:id', (req, res) => {
    console.log('req.body', req.body);
    const id = req.params.id;
    Article.findById(id)
        .then( article => res.status(200).json(article))
        .catch(err => res.status(500).json({
            message: `article avec l\'id ${id} non trouvé`,
            error: err
        }));
});

//configuration file upload
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, callback) {
        uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix);
        console.log('uniqueSuffix', uniqueSuffix);
        callback(null, uniqueSuffix)
    }
});

/*Article.aggregate([
    { $lookup:
            {
                from: 'tags',
                localField: 'tag',
                foreignField: 'tagNom',
                as: 'tags'
            }
    },
]).exec((err, result) => {
    if(err) {
        console.log('erreur', err)
    }
    else {
        console.log(result);
    }
});*/

let uniqueSuffix = '';

const upload = multer({storage: storage});

router.post('/articles/images', upload.single('image'), (req, res) => {
    if (!req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return res.status(400).json({ msg: 'Seules les images sont acceptées'});
    }
    res.status(201).send({ filename: req.file.filename, file: req.file });
});

router.post('/articles', (req, res) => {
   console.log('req.body', req.body);
   const article = new Article({...req.body, image: uniqueSuffix});
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


router.get('/images/:image', (req, res) => {
    const image = req.params.image;
    res.sendFile(path.join(__dirname, `./uploads/${image}`));
});




module.exports = router;
