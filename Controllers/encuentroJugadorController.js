const {  getAllJugadoresByEncuentroIdModel, getAllEncuentrosByJugadorIdModel, createEncuentroJugadorModel, updateEncuentroJugadorModel, deleteEncuentroJugadorModel } = require('../Models/encuentroJugadores');

const getAllJugadoresByEncuentroId = async (req, res) => {
  const { encuentro_id } = req.params;
  const jugadores = await getAllJugadoresByEncuentroIdModel(encuentro_id);
  res.json(jugadores);
};

const getAllEncuentrosByJugadorId = async (req, res) => {
  const { jugador_id } = req.params;
  const encuentros = await getAllEncuentrosByJugadorIdModel(jugador_id);
  res.json(encuentros);
};


const createEncuentroJugador = async (req, res) => {
  const data = req.body;
  const nuevoEncuentroJugador = await createEncuentroJugadorModel(data);
  res.status(201).json(nuevoEncuentroJugador);
};

const updateEncuentroJugador = async (req, res) => {
  const data = req.body;
  const updatedEncuentroJugador = await updateEncuentroJugadorModel(data);
  res.json(updatedEncuentroJugador);
};

const deleteEncuentroJugador = async (req, res) => {
  const { encuentro_id, jugador_id } = req.params;
  await deleteEncuentroJugadorModel(encuentro_id, jugador_id);
  res.sendStatus(204);
};

module.exports = {
  getAllJugadoresByEncuentroId,
  getAllEncuentrosByJugadorId,
  createEncuentroJugador,
  updateEncuentroJugador,
  deleteEncuentroJugador
};