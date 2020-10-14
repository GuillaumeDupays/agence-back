const express = require('express');
const router = express.Router();



router.get('/ping', (req, res) => {
    res.status(200).json({ msg: 'pong', date: new Date()});
});

router.get('/contacts', (req, res) => {
    res.send('Pour récupérer tous les contacts');
});

 module.exports = router;