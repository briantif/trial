var dealer = require('../models/dealer.model');


const localStorage = require("localStorage");

//All
exports.findAll = function(req, res){
    dealer.findAll(function(err, car) {
        console.log(car);
        
        if (err){
        res.send(err);
        }
        
        res.render('car', {
            data: car
        })
        
      });
};
//create 
exports.create = function(req, res) {
    const new_car = new dealer(req.body);
    const Created_at = Date.now();
    var date_obt = new Date(Created_at);
    new_car.idDealer = localStorage.getItem('idUser');
  
    new_car.fecha_creacion = date_obt.toDateString();

    
    console.log(new_car);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
      dealer.create(new_car, function(err, car) {
      if (err)
      res.send(err);
      res.redirect('/car')
    });
    }
};
//findOne
exports.findById = function(req, res) {
  dealer.findById(req.params.id, function(err, car) {
      if (err)
      res.send(err);
      res.render('car-edit', {
        data: car[0]
    })
    });
};


//update
exports.update = function(req, res) {
    console.log(req.body);
    
  

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        dealer.update(req.params.id, new dealer(req.body), function(err, car) {
     if (err)
     res.send(err);
     res.redirect('/car')
  });
  }

};
//delete
exports.delete = function(req, res) {
    dealer.delete( req.params.id, function(err, car) {
      if (err)
      res.send(err);

      res.redirect('/car');

    });
};
    