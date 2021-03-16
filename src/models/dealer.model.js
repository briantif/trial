var conexion = require('../database/dbCon');
const localStorage = require("localStorage");

var vehiculo = function(vehiculo){
    this.nombre = vehiculo.nombre;
    this.color = vehiculo.color
    this.fecha = vehiculo.fecha;
    this.usuario = vehiculo.usuario;
    this.fecha_creacion  = vehiculo.fecha_creacion;
    this.idDealer  = vehiculo.idDealer;
  };

  vehiculo.create = function (newVehiculo, result) {
        

        conexion.query("INSERT INTO vehiculos set ?", newVehiculo, function (err, res) {
        if(err) {
        
        result(err, null);
        }
        else{
        
        result(null, res.insertId);
        }
        });
    };
    vehiculo.findById = function (id, result) {
        conexion.query("Select * from vehiculos where id = ? ", id, function (err, res) {
        if(err) {
          
          result(err, null);
        }
        else{
          result(null, res);
        }
        });
    };
    vehiculo.findAll = function (result) {
      var idDealer = parseInt(localStorage.getItem("idUser"))

        conexion.query(`SELECT vehiculos.id, vehiculos.nombre,vehiculos.usuario, vehiculos.color,vehiculos.fecha, vehiculos.fecha_creacion,vehiculos.usuario, vehiculos.idDealer  FROM vehiculos WHERE vehiculos.idDealer = ${idDealer}`, function (err, res) {
        if(err) {
          result(null, err);
        }
        else{
          result(null, res);
        }
        });
    };
    vehiculo.update = function(id, vehiculo, result){
        
        conexion.query("UPDATE vehiculos SET nombre = ?,color = ?,fecha=?, usuario = ? WHERE id = ?", [vehiculo.nombre,vehiculo.color,vehiculo.fecha,vehiculo.usuario, id], function (err, res) {
        if(err) {
          result(null, err);
        }else{
          result(null, res);
        }
        });
    };
    vehiculo.delete = function(id, result){
        conexion.query("DELETE FROM vehiculos WHERE id = ?", [id], function (err, res) {
        if(err) {
          result(null, err);
        }
        else{
          result(null, res);
        }
        });
    };
    
module.exports= vehiculo;