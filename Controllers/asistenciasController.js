const {
  createAsistenciasModel,
  getAsistenciasByEntrenamientoModel
} = require('../Models/asistencias');

const createAsistencias = async (req, res) => {
  const { entrenamiento_id, jugadores, fecha } = req.body;

  await createAsistenciasModel({
    entrenamiento_id,
    jugadores,
    fecha
  });

  res.status(201).json({ created: true });
};

const getAsistenciasByEntrenamiento = async (req, res) => {
  const asistencias = await getAsistenciasByEntrenamientoModel(
    req.params.entrenamiento_id
  );
  res.json(asistencias);
};

module.exports = {
  createAsistencias,
  getAsistenciasByEntrenamiento
};