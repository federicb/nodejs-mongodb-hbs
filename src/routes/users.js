const express = require('express');
const router = express.Router();


router.get('/users/signin', (req,res) => {
    res.send('signIn')
});

router.get('/users/signup', (req,res) => {
    res.send('signUp')
});


module.exports = router;