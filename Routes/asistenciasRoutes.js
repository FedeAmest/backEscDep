const { Router } = require('express');
const router = Router();

const {
  createAsistencias,
  getAsistenciasByEntrenamiento
} = require('../Controllers/asistenciasController');

const {authExtraction} = require('../Middlewares/authExtraction');
const {userContext} = require('../Middlewares/userContext');

router.post('/', authExtraction, userContext, createAsistencias);
router.get('/entrenamiento/:entrenamiento_id', authExtraction, userContext, getAsistenciasByEntrenamiento);

module.exports = router;