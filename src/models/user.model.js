var conexion = require('../database/dbCon');
const localStorage = require("localStorage");


var user = function(user){
    this.nombre = user.nombre;
    this.edad = user.edad;
    this.dealer = user.dealer;
    this.idRol = user.idRol;
    this.email = user.email;
    this.password  = user.password;
  };

    user.create = function (newUser, result) {
        

        conexion.query("INSERT INTO user set ?", newUser, function (err, res) {
        if(err) {
        console.log("error: ", err);
        result(err, null);
        }
        else{
        console.log(res.insertId);
        result(null, res.insertId);
        }
        });
    };
    user.findById = function (id, result) {
        conexion.query("Select * from user where id = ? ", id, function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(err, null);
        }
        else{
          result(null, res);
        }
        });
    };
    user.findOneById = function (id, result) {
      var idProfile =  parseInt(localStorage.getItem("idUser"))
      
        conexion.query("Select * from user where id = ?  ", id, function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(err, null);
        }
        else{
          result(null, res);
        }
        });
    };
    user.findAll = function (result) {
        conexion.query("Select * from user", function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          
          result(null, res);
        }
        });
    };
    user.dataProfile = function (result) {
        conexion.query("Select * from user", function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          
          result(null, res);
        }
        });
    };

    user.update = function(id, user, result){
        
        conexion.query("UPDATE user SET nombre = ?,edad = ?, dealer = ?,idRol=?, email = ?,password = ? WHERE id = ?", [user.nombre,user.edad,user.dealer,user.idRol,user.email,user.password, id], function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }else{
          result(null, res);
        }
        });
    };
    user.oneUpdate = function(id, user, result){
        
        conexion.query("UPDATE user SET nombre = ?,edad = ? WHERE id = ?", [user.nombre,user.edad, id], function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }else{
          result(null, res);
        }
        });
    };
    user.delete = function(id, result){
        conexion.query("DELETE FROM user WHERE id = ?", [id], function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          result(null, res);
        }
        });
    };
    
module.exports= user;