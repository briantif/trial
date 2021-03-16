const express = require ('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const dealerController = require('../controllers/dealerController');
const localStorage = require("localStorage");

router.get('/', function(req, res, next) {
    res.render('login');
  });
router.post('/auth_login', loginController.post);



// middlewares for dealer
router.use('/user', function(req, res, next) {
  if(localStorage.getItem("idRol") == "1"){
    next();
  }else{
  res.redirect('/')
  }
});
router.use('/delete/:id', function(req, res, next) {
  if(localStorage.getItem("idRol") == "1"){
    next();
  }else{
  res.redirect('/')
  }
});
router.use('/update/:id', function(req, res, next) {
  if(localStorage.getItem("idRol") == "1"){
    next();
  }else{
  res.redirect('/')
  }
});
router.use('/create', function(req, res, next) {
  if(localStorage.getItem("idRol") == "1"){
    next();
  }else{
  res.redirect('/')
  }
});
router.use('/profile', function(req, res, next) {
  if(localStorage.getItem("idRol") == "2"){
    next();
  }else{
  res.redirect('/')
  }
});
router.use('/profile', function(req, res, next) {
  if(localStorage.getItem("idRol") == "2"){
    next();
  }else{
  res.redirect('/')
  }
});
router.use('/update-profile/:id', function(req, res, next) {
  if(localStorage.getItem("idRol") == "2"){
    next();
  }else{
  res.redirect('/')
  }
});
router.use('/car', function(req, res, next) {
  if(localStorage.getItem("idRol") == "2"){
    next();
  }else{
  res.redirect('/')
  }
});
router.use('/car-delete/:id', function(req, res, next) {
  if(localStorage.getItem("idRol") == "2"){
    next();
  }else{
  res.redirect('/')
  }
});
router.use('/car-update/:id', function(req, res, next) {
  if(localStorage.getItem("idRol") == "2"){
    next();
  }else{
  res.redirect('/')
  }
});
router.use('/car-create', function(req, res, next) {
  if(localStorage.getItem("idRol") == "2"){
    next();
  }else{
  res.redirect('/')
  }
});



router.get('/admin-home', function(req, res, next) {
  var dat = this;
  if(localStorage.getItem("idRol") == "1"){

        next();
        res.render('admin-home');
      }else{
      res.redirect('/');
      }
});

router.get('/dealer-home', function(req, res, next) {
  if(localStorage.getItem("idRol") == "2"){
    next();
    res.render('dealer-home');
  }
  res.redirect('/');
  
});

// user
router.get('/create',function(req, res, next) {
  if(localStorage.getItem("idRol") == "1"){
    next();
    res.render('user-create');
  }
  res.redirect('/');
 
 });

 

router.get('/user', userController.findAll);

router.get('/delete/:id', userController.delete);
router.get('/profile', userController.dataProfile);
router.get('/update/:id', userController.findById);
router.get('/update-profile/:id', userController.findOneById);

router.post('/update/:id', userController.update);
router.post('/update-profile/:id', userController.oneUpdate);
router.post('/create', userController.create);




//vehiculos
router.get('/car-create', function(req, res, next) {
  res.render('car-create');
});

router.get('/car', dealerController.findAll);
router.get('/car-delete/:id', dealerController.delete);
router.get('/car-update/:id', dealerController.findById);
router.post('/car-update/:id', dealerController.update);
router.post('/car-create', dealerController.create);




module.exports = router;