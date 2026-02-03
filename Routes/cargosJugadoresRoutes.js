const express = require('express');
const router = express.Router();

const { authExtraction } = require('../Middlewares/authExtraction');
const { userContext } = require('../Middlewares/userContext');
const { requireRole } = require('../Middlewares/requireRole');

const {
  getCargosByJugador,
  getCargosByClub,
  createCargo,
  updateCargoEstado,
  deleteCargo
} = require('../Controllers/cargosJugadoresController');

router.get(
  '/club',
  authExtraction,
  userContext,
  requireRole(['admin']),
  getCargosByClub
);

router.get(
  '/jugador/:jugador_id',
  authExtraction,
  userContext,
  getCargosByJugador
);

router.post(
  '/',
  authExtraction,
  userContext,
  requireRole(['admin']),
  createCargo
);

router.put(
  '/:cargo_id/estado',
  authExtraction,
  userContext,
  requireRole(['admin']),
  updateCargoEstado
);

router.delete(
  '/:cargo_id',
  authExtraction,
  userContext,
  requireRole(['admin']),
  deleteCargo
);

module.exports = router;