const {
  getEstadisticasByEncuentroModel,
  createEstadisticaModel,
  deleteEstadisticasByEncuentroModel
} = require('../Models/estadisticasJugadores');

const getEstadisticasByEncuentro = async (req, res) => {
  const stats = await getEstadisticasByEncuentroModel(req.params.encuentro_id);
  res.json(stats);
};

const createEstadisticas = async (req, res) => {
  const { encuentro_id, estadisticas } = req.body;

  // borra y vuelve a insertar (snapshot del partido)
  await deleteEstadisticasByEncuentroModel(encuentro_id);

  for (const stat of estadisticas) {
    await createEstadisticaModel({
      encuentro_id,
      ...stat
    });
  }

  res.status(201).json({ created: true });
};

module.exports = {
  getEstadisticasByEncuentro,
  createEstadisticas
};