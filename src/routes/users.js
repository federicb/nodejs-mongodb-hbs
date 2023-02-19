const express = require('express');
const router = express.Router();

const User = require('../models/User');


router.get('/users/signin', (req,res) => {
    res.render('users/signin')
});

router.get('/users/signup', (req,res) => {
    res.render('users/signup')
});

router.post('/users/signup', async (req, res) => {
    // console.log(req.body)
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if(name.length <= 0){
        errors.push({text: 'Please insert your name.'})
    }
    if(password != confirm_password){
        errors.push({text: 'Password do not match.'})
    }
    if(password.length < 4 ){
        errors.push({text: 'Password must be at least 4 characters.'})
    }
    if(errors.length > 0 ){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else{
        // comprueba que no exista el email en db
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('success_msg', 'The email is already in use.')
            res.redirect('/users/signup')
        }
        //crea un objeto
        const newUser = new User({name, email, password});
        // cifra el password
        newUser.password = await newUser.encryptPassword(password);
        // guarda el pass
        await newUser.save();
        req.flash('success_msg', 'You are register')
        res.redirect('/users/signin')
    }

});



module.exports = router;