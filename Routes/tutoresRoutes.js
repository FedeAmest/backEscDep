const express = require('express');
const router = express.Router();

const {  getTutorByDni,  getTutorById,  getTutoresByJugadorId,  createTutor,  linkTutorJugador,  updateTutor,  deleteTutor } = require('../Controllers/tutoresController');
const { authExtraction } = require('../Middlewares/authExtraction');

// 🔍 Autocompletar por DNI
router.get('/dni/:dni', getTutorByDni);

// Relaciones
router.get('/jugador/:id', getTutoresByJugadorId);
router.post('/link', linkTutorJugador);

// CRUD
router.get('/:id',authExtraction,getTutorById);
router.post('/', authExtraction, createTutor);
router.put('/:id', authExtraction, updateTutor);
router.delete('/:id', authExtraction, deleteTutor);

module.exports = router;