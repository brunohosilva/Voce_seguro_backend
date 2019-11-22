var mysql = require('mysql');
const results = [];


exports.getLatLonPhoneSteal = function(req, res) {
  const con = mysql.createConnection({
    host: 'yousafe-db.cyob7khpg6i0.sa-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'yousafe123',
    database: 'YouSafe'
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