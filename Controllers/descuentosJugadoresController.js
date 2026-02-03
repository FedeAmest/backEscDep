const {
  getDescuentoByJugadorIdModel,
  createDescuentoModel,
  updateDescuentoModel,
  deleteDescuentoModel
} = require('../Models/descuentosJugadores');

const getDescuentoByJugador = async (req, res) => {
  const { jugador_id } = req.params;
  const descuento = await getDescuentoByJugadorIdModel(jugador_id);
  res.json(descuento);
};

const createDescuento = async (req, res) => {
  const id = await createDescuentoModel(req.body);
  res.status(201).json({ descuento_jugador_id: id });
};

const updateDescuento = async (req, res) => {
  const { id } = req.params;
  await updateDescuentoModel(id, req.body);
  res.json({ message: 'Descuento actualizado' });
};

const deleteDescuento = async (req, res) => {
  const { id } = req.params;
  await deleteDescuentoModel(id);
  res.json({ message: 'Descuento desactivado' });
};

module.exports = {
  getDescuentoByJugador,
  createDescuento,
  updateDescuento,
  deleteDescuento
};