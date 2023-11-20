const mysql = require('mysql');
// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '120manies',
  database: 'AD_SISTEMAS'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
// Controlador para registrar un nuevo turista
const registrarTurista = async (req, res, next) => {

  const turista = req.body;
  const sql = `
    INSERT INTO Turista (
      Nombre,
      A_Paterno,
      A_Materno,
      Correo,
      Telefono,
      Usuario,
      pass
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    turista.Nombre,
    turista.A_paterno,
    turista.A_materno,
    turista.Correo,
    turista.Telefono,
    turista.Usuario,
    turista.pass,
  ];

  try {
    await new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error('Error al insertar turista:', error);
          reject(error);
        } else {
          console.log('Turista registrado con éxito');
          resolve(results);
        }
      });
    });

    res.status(201).json({ message: 'Turista registrado con éxito' });
  } catch (error) {
    console.error('Error en la conexión con la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


//CONTROLADOR PARA BORRAR UN TURISTA
// Controlador para registrar un nuevo turista
const eliminarTurista = async (req, res, next) => {
  const turistaId = req.body.id;
  console.log(turistaId);
  const sql = `
    DELETE FROM Turista
    WHERE Id_Turista = ?
  `;

  try {
    await new Promise((resolve, reject) => {
      connection.query(sql, [turistaId], (error, results) => {
        if (error) {
          console.error('Error al eliminar turista:', error);
          reject(error);
        } else {
          console.log('Turista eliminado con éxito');
          resolve(results);
        }
      });
    });

    res.status(200).json({ message: 'Turista eliminado con éxito' });
  } catch (error) {
    console.error('Error en la conexión con la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/*
//AUTENTICACION DE USUARIO(LOGIN)
app.post('/', encoder, function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  
  connection.query("SELECT * FROM Turista WHERE Correo = ? AND Contraseña = ?", [username, password], function(error, results, fields){
      if(results.length > 0){
          res.redirect("/pantallaPrincipal");
      } else{
          res.redirect("/");
      }
      res.end();
  });
});
 
 
app.get("/pantallaPrincipal", function(req,res){
  res.sendFile(__dirname + "/pantallaPrincipal.html");
})
*/



module.exports = {
  registrarTurista, eliminarTurista
};
