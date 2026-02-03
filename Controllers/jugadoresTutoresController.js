const {
  getRelacionesByJugadorIdModel,
  getRelacionesByTutorIdModel,
  getRelacionByIdsModel
} = require('../Models/jugadoresTutores');

/**
 * Relaciones de un jugador
 */
const getRelacionesByJugadorId = async (req, res) => {
  const { id } = req.params;
  const relaciones = await getRelacionesByJugadorIdModel(id);
  res.json(relaciones);
};

/**
 * Relaciones de un tutor
 */
const getRelacionesByTutorId = async (req, res) => {
  const { id } = req.params;
  const relaciones = await getRelacionesByTutorIdModel(id);
  res.json(relaciones);
};

/**
 * Relación puntual jugador–tutor
 */
const getRelacionByIds = async (req, res) => {
  const { jugador_id, tutor_id } = req.params;

  const relacion = await getRelacionByIdsModel(jugador_id, tutor_id);

  if (!relacion) {
    return res.status(404).json({ message: 'Relación no encontrada' });
  }

  res.json(relacion);
};

module.exports = {
  getRelacionesByJugadorId,
  getRelacionesByTutorId,
  getRelacionByIds
};
