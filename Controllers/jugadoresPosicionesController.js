const {
  createJugadorPosicionModel,
  createManyJugadorPosicionesModel,
  deleteJugadorPosicionModel,
  deleteAllJugadorPosicionesModel
} = require('../Models/jugadoresPosiciones');

/**
 * Crear UNA relación
 */
const createJugadorPosicion = async (req, res) => {
  try {
    const id = await createJugadorPosicionModel(req.body);
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creando posición del jugador' });
  }
};

/**
 * Crear MUCHAS relaciones
 */
const createManyJugadorPosiciones = async (req, res) => {
  try {
    const { jugador_id, posiciones } = req.body;
    await createManyJugadorPosicionesModel(jugador_id, posiciones);
    res.status(201).json({ created: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creando posiciones del jugador' });
  }
};

/**
 * Borrar UNA relación
 */
const deleteJugadorPosicion = async (req, res) => {
  try {
    const { jugador_id, posicion_id } = req.params;
    const deleted = await deleteJugadorPosicionModel(jugador_id, posicion_id);

    if (!deleted) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error eliminando posición del jugador' });
  }
};

/**
 * Borrar TODAS las posiciones del jugador
 */
const deleteAllJugadorPosiciones = async (req, res) => {
  try {
    const { jugador_id } = req.params;
    await deleteAllJugadorPosicionesModel(jugador_id);
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error eliminando posiciones del jugador' });
  }
};

module.exports = {
  createJugadorPosicion,
  createManyJugadorPosiciones,
  deleteJugadorPosicion,
  deleteAllJugadorPosiciones
};
