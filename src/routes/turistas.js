const express = require('express');
const router = express.Router();
const controllers = require('../controllers/turistasController');

// Ruta para el registro de turistas
router.post('/registro', controllers.registrarTurista);
router.post('/eliminar', controllers.eliminarTurista);
//router.post('/autenticar', turistasController.autenticarUsuario);
module.exports = router;
