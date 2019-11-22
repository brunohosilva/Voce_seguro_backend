var mysql = require('mysql');
const results = [];

require('dotenv').config()

let host = process.env.HOST_DB
let user = process.env.USER_DB
let pass = process.env.PASSWORD_DB
let database = process.env.DATABASE_DB


exports.getLatLonPhoneSteal = function(req, res) {
  const con = mysql.createConnection({
    host: host,
    user: user,
    password: pass,
    database: database
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT latitude,longitude FROM crimes WHERE crime = 'furto de celular'", function(err, result, fields) {
      if (err) throw err;
      const resultLatLon = result.map((position) => {
        const latitude = position.latitude
        const longitude = position.longitude
        const latlon = {
          "title": "Furto de Celular",
          coordinates: {
            "latitude": parseFloat(latitude),
            "longitude": parseFloat(longitude)
          }
        }
        return latlon
      })
      res.send(resultLatLon);
    });
  });
}