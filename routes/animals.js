var express = require('express');
var router = express.Router();
const db = require('../db/setup_db'); 

router.get('/', async function (req, res, next) {
  const animals = await db.getAnimals();
  const user = req.cookies['user'];
  res.render('animals', { user: user ?? null, animals: animals });
});


router.post('/update', async function (req, res, next) {
   const user = req.cookies['user'];
  db.updateAnimals(req.body.id, user.userId, req.body.value);
  res.render('animals');
});

module.exports = router;

