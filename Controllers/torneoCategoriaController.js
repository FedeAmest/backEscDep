const { inscribirCategoriaModel, getCategoriasByTorneoModel, getTorneosByCategoriaModel, deleteRelacionModel} =require ('../Models/torneoCategorias');

const inscribirCategoria = async (req, res) => {
  try {
    const {payload} = req.body;
    const result = await inscribirCategoriaModel(payload);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoriasByTorneo = async (req, res) => {
  try {
    const { torneo_id } = req.params;
    const result = await getCategoriasByTorneoModel(torneo_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTorneosByCategoria = async (req, res) => {
  try {
    const { categoria_id } = req.params;
    const result = await getTorneosByCategoriaModel(categoria_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteRelacion = async (req, res) => {
  try {
    const { torneo_categoria_id } = req.params;
    const result = await deleteRelacionModel(torneo_categoria_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  inscribirCategoria,
  getCategoriasByTorneo,
  getTorneosByCategoria,
  deleteRelacion
};
