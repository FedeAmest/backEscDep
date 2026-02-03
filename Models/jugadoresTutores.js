const pool = require('../Utils/Pool');

/**
 * Obtener relaciones por jugador
 */
const getRelacionesByJugadorIdModel = async (jugador_id) => {
  const [rows] = await pool.query(`
    SELECT 
      jt.id,
      jt.parentesco,
      t.tutor_id,
      t.nombre,
      t.dni,
      t.email,
      t.telefono,
      t.direccion
    FROM jugadores_tutores jt
    INNER JOIN tutores t ON t.tutor_id = jt.tutor_id
    WHERE jt.jugador_id = ?
    ORDER BY jt.id DESC
  `, [jugador_id]);

  return rows;
};

/**
 * Obtener relaciones por tutor
 */
const getRelacionesByTutorIdModel = async (tutor_id) => {
  const [rows] = await pool.query(`
    SELECT 
      jt.id,
      jt.parentesco,
      j.jugador_id,
      j.nombre,
      j.apellido,
      j.dni
    FROM jugadores_tutores jt
    INNER JOIN jugadores j ON j.jugador_id = jt.jugador_id
    WHERE jt.tutor_id = ?
    ORDER BY jt.id DESC
  `, [tutor_id]);

  return rows;
};

/**
 * Obtener relación puntual jugador–tutor
 */
const getRelacionByIdsModel = async (jugador_id, tutor_id) => {
  const [rows] = await pool.query(`
    SELECT *
    FROM jugadores_tutores
    WHERE jugador_id = ? AND tutor_id = ?
    LIMIT 1
  `, [jugador_id, tutor_id]);

  return rows[0] || null;
};

module.exports = {
  getRelacionesByJugadorIdModel,
  getRelacionesByTutorIdModel,
  getRelacionByIdsModel
};