const pool = require('../Utils/Pool');

/* =========================
   CRUD
========================= */

const createAsistenciasModel = async ({ entrenamiento_id, jugadores, fecha }) => {
  for (const jugador_id of jugadores) {
    await pool.query(`
      INSERT INTO asistencias_entrenamiento (jugador_id, entrenamiento_id, fecha)
      VALUES (?, ?, ?)
    `, [jugador_id, entrenamiento_id, fecha]);
  }
};

const getAsistenciasByEntrenamientoModel = async (entrenamiento_id) => {
  const [rows] = await pool.query(`
    SELECT ae.*, j.nombre
    FROM asistencias_entrenamiento ae
    JOIN jugadores j ON j.jugador_id = ae.jugador_id
    WHERE ae.entrenamiento_id = ?
  `, [entrenamiento_id]);

  return rows;
};

/* =========================
   MÉTRICA CLAVE
========================= */

/**
 * Presencias por jugador en una categoría
 */
const getPresenciasByJugadorCategoriaModel = async (jugador_id, categoria_id) => {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS presencias
    FROM asistencias_entrenamiento ae
    JOIN entrenamientos e ON e.entrenamiento_id = ae.entrenamiento_id
    WHERE ae.jugador_id = ?
      AND e.categoria_id = ?
  `, [jugador_id, categoria_id]);

  return rows[0].presencias;
};

module.exports = {
  createAsistenciasModel,
  getAsistenciasByEntrenamientoModel,
  getPresenciasByJugadorCategoriaModel
};