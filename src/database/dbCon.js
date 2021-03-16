var mysql = require('mysql');

var conexion =  mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    port: 3306,
    database : 'trial'
})

conexion.connect((err) =>{
    if(err) throw err;
    
    console.log('Conexion  Exitosa!!!!')
})

module.exports = conexion;