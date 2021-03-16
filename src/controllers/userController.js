var user = require('../models/user.model');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
const localStorage = require('localStorage');

//All
exports.findAll = function(req, res){
    user.findAll(function(err, user) {
        console.log(user);
        
        if (err){
        res.send(err);
        }
        
        res.render('user', {
            data: user
        })
        
      });
};
exports.dataProfile = function(req, res){

  user.dataProfile(function(err, user) {
   
    
    if (err){
    res.send(err);
    }
    
    res.render('profile', {
        data: user
    })
    
  });
}
//create 
exports.create = function(req, res) {
    const new_user = new user(req.body);

    new_user.password = bcrypt.hashSync(new_user.password, 10);

    console.log(new_user);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        user.create(new_user, function(err, user) {
      if (err)
      res.send(err);
      res.redirect('/user')
    });
    }
};
//findById
exports.findById = function(req, res) {
    user.findById(req.params.id, function(err, user) {
      if (err)
      res.send(err);
      res.render('user-edit', {
        data: user[0]
    })
    });
};
exports.findOneById = function(req, res) {
    var idProfile =  parseInt(localStorage.getItem("idUser"))
    user.findOneById(idProfile, function(err, user) {
      console.log(user[0])
      if (err)
      res.send(err);
      res.render('edit-profile', {
        data: user[0]
    })
    });
};


//update
exports.update = function(req, res) {
    console.log(req.body);
    
  req.body.password = bcrypt.hashSync(req.body.password, 10);

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        user.update(req.params.id, new user(req.body), function(err, user) {
     if (err)
     res.send(err);
     res.redirect('/user')
  });
  }

};
//one-update
exports.oneUpdate = function(req, res) {

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        user.oneUpdate(req.params.id, new user(req.body), function(err, profile) {
     if (err)
     res.send(err);
     res.redirect('/profile')
  });
  }

};
//delete
exports.delete = function(req, res) {
    user.delete( req.params.id, function(err, user) {
      if (err)
      res.send(err);

      res.redirect('/user');

    });
};
    