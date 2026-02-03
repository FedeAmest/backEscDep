const { Router } = require('express');
const router = Router();

const {authExtraction} = require('../Middlewares/authExtraction');
const {userContext} = require('../Middlewares/userContext');
const {requireRole} = require('../Middlewares/requireRole');

const {
  getDescuentoByJugador,
  createDescuento,
  updateDescuento,
  deleteDescuento
} = require('../Controllers/descuentosJugadoresController');

router.get('/jugador/:jugador_id', authExtraction, userContext, getDescuentoByJugador);
router.post('/', authExtraction, userContext, requireRole(['admin']), createDescuento);
router.put('/:id', authExtraction, userContext, requireRole(['admin']), updateDescuento);
router.delete('/:id', authExtraction, userContext, requireRole(['admin']), deleteDescuento);

module.exports = router;