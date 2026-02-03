const {
  getCargosByJugadorModel,
  getCargosByClubModel,
  createCargoModel,
  updateCargoEstadoModel,
  deleteCargoModel
} = require('../Models/cargosJugadores');

/* ===============================
   CARGOS POR JUGADOR
================================ */
const getCargosByJugador = async (req, res) => {
  const { jugador_id } = req.params;
  const cargos = await getCargosByJugadorModel(jugador_id);
  res.json(cargos);
};

/* ===============================
   CARGOS POR CLUB
================================ */
const getCargosByClub = async (req, res) => {
  const { club_id } = req.auth;
  const cargos = await getCargosByClubModel(club_id);
  res.json(cargos);
};

/* ===============================
   CREAR CARGO
================================ */
const createCargo = async (req, res) => {
  const cargo = await createCargoModel(req.body);
  res.status(201).json(cargo);
};

/* ===============================
   ACTUALIZAR ESTADO
================================ */
const updateCargoEstado = async (req, res) => {
  const { cargo_id } = req.params;
  const { estado } = req.body;

  const ok = await updateCargoEstadoModel(cargo_id, estado);
  if (!ok) return res.status(404).json({ error: 'Cargo no encontrado' });

  res.json({ message: 'Estado actualizado' });
};

/* ===============================
   ELIMINAR CARGO
================================ */
const deleteCargo = async (req, res) => {
  const { cargo_id } = req.params;
  const ok = await deleteCargoModel(cargo_id);

  if (!ok) return res.status(404).json({ error: 'Cargo no encontrado' });

  res.json({ message: 'Cargo anulado' });
};

module.exports = {
  getCargosByJugador,
  getCargosByClub,
  createCargo,
  updateCargoEstado,
  deleteCargo
};