const express = require('express');
const router = express();
const MsgContact = require('../models/msg-contact');
router.get('/ping', (req, res) => {
    res.status(200).json({ msg: 'pong', date: new Date()});
});//localhost:3000/ping

router.get('/msg-contacts', (req, res) => {
    MsgContact.find()
        .sort({ 'createdOn': -1 })
        .exec()
        .then(msgContacts => res.status(200).json(msgContacts))
        .catch(err => res.status(500).json({
            message: 'contacts non trouvés',
            error: err
        }));
});

router.post('/msg-contacts', (req, res) => {
    console.log('req.body', req.body);
    const msgContact = new MsgContact(req.body);
    msgContact.save((err, msg) => {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(201).json(msg);
    });
});

module.exports = router;
