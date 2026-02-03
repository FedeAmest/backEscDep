const { Router } = require('express');
const router = Router();

const {
  getEstadisticasByEncuentro,
  createEstadisticas
} = require('../Controllers/estadisticasJugadoresController');

const {authExtraction} = require('../Middlewares/authExtraction');
const {userContext} = require('../Middlewares/userContext');

router.get('/encuentro/:encuentro_id', authExtraction, userContext, getEstadisticasByEncuentro);
router.post('/', authExtraction, userContext, createEstadisticas);

module.exports = router;
