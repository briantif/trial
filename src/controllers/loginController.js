var conexion = require('../database/dbCon');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
const localStorage = require("localStorage");

module.exports = {

    post: (req, res)=>{
      


      var email = req.body.email;
      var password = req.body.password;
      
      var sql = 'select * from user where email = ?;';
      
      conexion.query(sql, [email], function(err, result, fields){
        if(err) throw err; 

        if(result.length && bcrypt.compareSync(password, result[0].password)){
          localStorage.setItem('idUser',result[0].id)
          localStorage.setItem('idRol',result[0].idRol)
          
          if(result[0].idRol == 1){
          res.redirect('/admin-home');
          }else if(result[0].idRol == 2){
            res.redirect('/dealer-home');
          }
        }else{
          res.redirect('/');
        }
      });
  }
}