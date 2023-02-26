var express = require('express');
var router = express.Router();
const db = require('../db/setup_db'); 

router.get('/', async function (req, res, next) {
    species = await db.getSpecies();
    const user = req.cookies['user'];
    res.render("species", {user: user ?? null, species: species})
})

router.post('/update', async function (req,res,next){
    db.updateSpecie(req.body.id, req.body.name);
    res.render('species');
})

router.post('/delete', async function (req,res,next){
    const response = await db.deleteSpecie(req.body.id);
    response? res.render('species') : res.status(403).send({ statusText: 'error!' });   

})

router.post('/insert', async function (req,res,next){
    db.addSpecie(req.body.name);
    res.render('species');
})

module.exports = router;