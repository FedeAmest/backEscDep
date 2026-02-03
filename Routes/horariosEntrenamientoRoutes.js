const { Router } = require('express');
const router = Router();

const {
  getAllHorariosByCategoriaId,
  getHorarioById,
  createHorario,
  createManyHorarios,
  updateHorario,
  deleteHorario
} = require('../Controllers/horariosCategoriaController');

// GET por categoría
router.get('/categoria/:categoria_id', getAllHorariosByCategoriaId);

// CREATE uno
router.post('/categoria/:categoria_id', createHorario);

// 🆕 CREATE MANY
router.post('/categoria/:categoria_id/bulk', createManyHorarios);

// GET / PUT / DELETE por id
router.get('/:id_horario', getHorarioById);
router.put('/:id_horario', updateHorario);
router.delete('/:id_horario', deleteHorario);

module.exports = router;