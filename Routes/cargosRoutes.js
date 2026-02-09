const express = require('express');
const router = express.Router();

const {
  getCargoById,
  getCargosByJugador,
  getCargosByClub,
  createCargo,
  updateCargoEstado,
  deleteCargo
} = require('../Controllers/cargosController');

// ===============================
// LISTAR CARGOS POR JUGADOR
// ===============================
router.get('/jugador/:jugador_id', getCargosByJugador);

// ===============================
// LISTAR CARGOS POR CLUB
// ===============================
router.get('/club', getCargosByClub);

// ===============================
// OBTENER CARGO POR ID
// ===============================
router.get('/:cargo_id', getCargoById);

// ===============================
// CREAR CARGO
// ===============================
router.post('/', createCargo);

// ===============================
// ACTUALIZAR ESTADO DE CARGO
// ===============================
router.patch('/:cargo_id/estado', updateCargoEstado);

// ===============================
// ANULAR CARGO (soft delete)
// ===============================
router.delete('/:cargo_id', deleteCargo);

module.exports = router;