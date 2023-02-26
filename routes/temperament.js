var express = require('express');
var router = express.Router();
const db = require('../db/setup_db');

router.get('/', async function (req, res, next) {
    temperament = await db.getTemperaments();   
    const user = req.cookies['user'];
    res.render("temperament", {user: user ?? null, temperament: temperament})
})

router.post('/update', async function (req,res,next){
    db.updateTemperaments(req.body.id, req.body.name);
    res.render("temperament")
})

router.post('/delete', async function (req,res,next){
    const response = await db.deleteTemperaments(req.body.id);    
    response? res.render("temperament") : res.status(403).send({ statusText: 'error!' });
   
})

router.post('/insert', async function (req,res,next){
    db.addTemperaments(req.body.name);
    res.render("temperament")
})

module.exports = router;