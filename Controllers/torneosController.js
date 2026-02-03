const {
  getTorneosByClubModel,
  getTorneoByIdModel,
  createTorneoModel,
  updateTorneoModel,
  deleteTorneoModel
  } = require('../Models/torneos');

const {
  addCategoriaToTorneoModel,
  getCategoriasByTorneoModel,
  removeCategoriaFromTorneoModel,
  getTorneosByCategoriaModel
} = require('../Models/torneoCategorias');

const getTorneosByClub = async (req, res) => {
  const { club_id } = req.auth;
  const torneos = await getTorneosByClubModel(club_id);
  res.json(torneos);
};

const getTorneosByCategoria = async (req, res) => {
    const { categoria_id } = req.params;
    const torneos = await getTorneosByCategoriaModel(categoria_id);
    res.json(torneos);
  };

const getTorneoById = async (req, res) => {
  const { club_id } = req.auth;
  const { torneo_id } = req.params;

  const torneo = await getTorneoByIdModel(torneo_id, club_id);
  if (!torneo) {
    return res.status(404).json({ message: 'Torneo no encontrado' });
  }

  res.json(torneo);
};

const createTorneo = async (req, res) => {
  const { club_id } = req.auth;
  const torneo = await createTorneoModel({ ...req.body, club_id });
  res.status(201).json(torneo);
};

const updateTorneo = async (req, res) => {
  const { club_id } = req.auth;
  const { torneo_id } = req.params;

  await updateTorneoModel(torneo_id, club_id, req.body);
  res.json({ message: 'Torneo actualizado' });
};

const deleteTorneo = async (req, res) => {
  const { club_id } = req.auth;
  const { torneo_id } = req.params;

  await deleteTorneoModel(torneo_id, club_id);
  res.json({ message: 'Torneo eliminado' });
};

/* === Categorías por torneo === */

const addCategoriaToTorneo = async (req, res) => {
  const { torneo_id, categoria_id } = req.body;
  await addCategoriaToTorneoModel(torneo_id, categoria_id);
  res.status(201).json({ message: 'Categoría vinculada al torneo' });
};

const getCategoriasByTorneo = async (req, res) => {
  const { torneo_id } = req.params;
  const categorias = await getCategoriasByTorneoModel(torneo_id);
  res.json(categorias);
};

const removeCategoriaFromTorneo = async (req, res) => {
  const { torneo_id, categoria_id } = req.params;
  await removeCategoriaFromTorneoModel(torneo_id, categoria_id);
  res.json({ message: 'Categoría desvinculada del torneo' });
};

module.exports = {
    getTorneosByClub,
    getTorneoById,
    getTorneosByCategoria,
    createTorneo,
    updateTorneo,
    deleteTorneo,
    addCategoriaToTorneo,
    getCategoriasByTorneo,
    removeCategoriaFromTorneo
};