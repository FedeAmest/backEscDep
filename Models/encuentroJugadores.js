const pool = require('../Utils/Pool');

const getAllJugadoresByEncuentroIdModel = async (encuentro_id) => {
  const [rows] = await pool.query(`
    SELECT 
      j.*,
      e.*,
      ej.*
    FROM jugadores j
    JOIN encuentros_jugadores ej ON j.jugador_id = ej.jugador_id
    JOIN encuentros e ON ej.encuentro_id = e.encuentro_id
    WHERE e.encuentro_id = ?
  `, [encuentro_id]);
  return rows;
};

const getAllEncuentrosByJugadorIdModel = async (jugador_id) => {
  const [rows] = await pool.query(`
    SELECT 
      e.*,
      ej.*
    FROM encuentros e
    JOIN encuentros_jugadores ej ON e.encuentro_id = ej.encuentro_id
    WHERE ej.jugador_id = ?
  `, [jugador_id]);
  return rows;
};

const createEncuentroJugadorModel = async (data) => {
  const { encuentro_id, jugador_id } = data;
  const [result] = await pool.query(`
    INSERT INTO encuentros_jugadores (encuentro_id, jugador_id)
    VALUES (?, ?)
  `, [encuentro_id, jugador_id]);
  return { id: result.insertId, ...data };
};

const updateEncuentroJugadorModel = async (data) => {
  const { encuentro_jugador_id ,jugador_id } = data;
  await pool.query(`
    UPDATE encuentros_jugadores
    SET jugador_id = ?
    WHERE encuentro_jugador_id = ?
  `, [jugador_id, encuentro_jugador_id]);
  return { ...data };
};

const deleteEncuentroJugadorModel = async (encuentro_jugador_id) => {
  await pool.query(`
    DELETE FROM encuentros_jugadores
    WHERE encuentro_jugador_id = ?
  `, [encuentro_jugador_id]);
};

module.exports = {
  getAllJugadoresByEncuentroIdModel,
  getAllEncuentrosByJugadorIdModel,
  createEncuentroJugadorModel,
  updateEncuentroJugadorModel,
  deleteEncuentroJugadorModel
};