const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth')
router.get('/notes/add', (req,res) => {
    res.render('notes/new_note')
});

router.post('/notes/new_note', isAuthenticated, async (req,res) => {
    const { title, description } = req.body
    const errors = [];
    if (!title){
        errors.push({text: 'Por favor ingrese un titulo'})
    }
    if(!description){
        errors.push({text: 'Por favor ingrese una descripción'})
    }
    if(errors.length > 0){
        res.render('notes/new_note',  {
            errors, 
            title,
            description
        });
    }else{
        const newNote = new Note({ title, description });
        //enlaza pa nota con el id de usuario que la crea
        newNote.user = req.user.id; 
        // console.log(newNote);
        await newNote.save();
        req.flash('success_msg', 'Note added successfully!');
        res.redirect('/notes');
    }
});

router.get('/notes', isAuthenticated, async (req,res) => {   
    // find -> solo busca las notas del user.id 
    const notes = await Note.find({users: req.user.id}).sort({date: 'desc'});
    res.render('notes/all_notes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req,res) => {
    const note = await Note.findById(req.params.id)
    res.render('notes/edit_note', { note });
});

router.put('/notes/edit_note/:id', isAuthenticated, async (req, res) => {
    const { title, description } = req.body
    // this method find id and update the date{} 
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Note updated successfully!');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note deleted successfully!');
    res.redirect('/notes');
    
});

module.exports = router;