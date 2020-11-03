const express = require('express');
const router = express();
const MsgContact = require('../models/msg-contact');
const multer = require('multer');

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

//configuration file upload
/*multer.diskStorage({
    destination: './uploads/',
    filename: function (req, files, callback) {

    }
});*/

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

router.delete('/msg-contacts/:id', (req, res) => {
    const id = req.params.id;
    MsgContact.findByIdAndDelete(id, (err, msgContact) => {
        if(err) {
            return res.status(500).json(err)
        }
        res.status(202).json({ msg: `message ${msgContact._id} supprimé`});
        });
});

module.exports = router;
