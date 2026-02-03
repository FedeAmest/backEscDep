const {
  createEntrenamientoModel,
  getEntrenamientosByCategoriaModel,
  deleteEntrenamientoModel
} = require('../Models/entrenamientos');

const createEntrenamiento = async (req, res) => {
  const { categoria_id, fecha } = req.body;

  const entrenamiento = await createEntrenamientoModel({
    categoria_id,
    fecha
  });

  res.status(201).json(entrenamiento);
};

const getEntrenamientosByCategoria = async (req, res) => {
  const { categoria_id } = req.params;
  const entrenamientos = await getEntrenamientosByCategoriaModel(categoria_id);
  res.json(entrenamientos);
};

const deleteEntrenamiento = async (req, res) => {
  await deleteEntrenamientoModel(req.params.entrenamiento_id);
  res.json({ deleted: true });
};

module.exports = {
  createEntrenamiento,
  getEntrenamientosByCategoria,
  deleteEntrenamiento
};