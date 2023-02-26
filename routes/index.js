var express = require('express');
var router = express.Router();
const db = require('../db/setup_db'); 

/* GET home page. */
router.get('/', function (req, res, next) {
  const user = req.cookies['user'];
  res.render('index', { user: user ?? null });
});

router.get('/login', function (req, res, next) {
  res.render('login', { user: null });
});

router.get('/logout', function (req, res, next) {
  res.clearCookie('user');
  res.render('index', { user: null });
});

router.post('/login/password', async function (req, res, next) {
  // console.log(req.body.username);
  const user = await db.authenticate(req.body.username, req.body.password);
  if(user){
    res.cookie('user', user);
    res.render('index', { user: user });
  } else {
    res.status(401).send('Invalid username or password');   
    res.render('login', { user: null });
  }  
});

router.get('/signup', function (req, res, next) {
  res.render('signup', { user: null });
});

router.post('/signup/newuser', function (req, res, next) {
  // console.log(req);
  db.addUser(req.body.username, req.body.firstname + req.body.lastname , req.body.password );
  res.render('login', { user: null });
});
module.exports = router;

// console.log(req.body.username);
//   db.addUser(req.body.username, req.body.firstname + req.body.lastname , req.body.password )
//   res.render('login');