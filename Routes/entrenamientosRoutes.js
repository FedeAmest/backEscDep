const { Router } = require('express');
const router = Router();

const {
  createEntrenamiento,
  getEntrenamientosByCategoria,
  deleteEntrenamiento
} = require('../Controllers/entrenamientosController');

const {authExtraction} = require('../Middlewares/authExtraction');
const {userContext} = require('../Middlewares/userContext');

router.post('/', authExtraction, userContext, createEntrenamiento);
router.get('/categoria/:categoria_id', authExtraction, userContext, getEntrenamientosByCategoria);
router.delete('/:entrenamiento_id', authExtraction, userContext, deleteEntrenamiento);

module.exports = router;
