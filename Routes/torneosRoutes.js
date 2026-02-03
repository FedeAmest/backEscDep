const { Router } = require('express');
const router = Router();

const {authExtraction} = require('../Middlewares/authExtraction');
const {userContext} = require('../Middlewares/userContext');
const {requireRole} = require('../Middlewares/requireRole');

const {
  getTorneosByClub,
  getTorneoById,
  getTorneosByCategoria,
  createTorneo,
  updateTorneo,
  deleteTorneo,
  addCategoriaToTorneo,
  getCategoriasByTorneo,
  removeCategoriaFromTorneo

} = require('../Controllers/torneosController');

router.get('/', authExtraction, userContext, getTorneosByClub);
router.get('/:torneo_id', authExtraction, userContext, getTorneoById);
router.post('/', authExtraction, userContext, requireRole(['admin']), createTorneo);
router.put('/:torneo_id', authExtraction, userContext, requireRole(['admin']), updateTorneo);
router.delete('/:torneo_id', authExtraction, userContext, requireRole(['admin']), deleteTorneo);

/* Relación torneo - categoría */

router.post('/categorias', authExtraction, userContext, requireRole(['admin']), addCategoriaToTorneo);
router.get('/:torneo_id/categorias', authExtraction, userContext, getCategoriasByTorneo);
router.delete('/:torneo_id/categorias/:categoria_id', authExtraction, userContext, requireRole(['admin']), removeCategoriaFromTorneo);
router.get('/categoria/:categoria_id', authExtraction, userContext, getTorneosByCategoria);
module.exports = router;