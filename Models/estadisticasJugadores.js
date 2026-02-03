const pool = require('../Utils/Pool');

/* =========================
   CRUD
========================= */

const getEstadisticasByEncuentroModel = async (encuentro_id) => {
  const [rows] = await pool.query(`
    SELECT
      ej.*,
      j.nombre AS jugador
    FROM estadisticas_jugadores ej
    JOIN jugadores j ON j.jugador_id = ej.jugador_id
    WHERE ej.encuentro_id = ?
  `, [encuentro_id]);

  return rows;
};

const createEstadisticaModel = async (data) => {
  const {
    encuentro_id,
    jugador_id,
    goles,
    asistencias,
    tarjeta_amarilla,
    tarjeta_roja,
    minutos_jugados,
    calificacion
  } = data;

  await pool.query(`
    INSERT INTO estadisticas_jugadores
    (encuentro_id, jugador_id, goles, asistencias, tarjeta_amarilla, tarjeta_roja, minutos_jugados, calificacion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    encuentro_id,
    jugador_id,
    goles,
    asistencias,
    tarjeta_amarilla,
    tarjeta_roja,
    minutos_jugados,
    calificacion
  ]);
};

const deleteEstadisticasByEncuentroModel = async (encuentro_id) => {
  await pool.query(
    `DELETE FROM estadisticas_jugadores WHERE encuentro_id = ?`,
    [encuentro_id]
  );
};

module.exports = {
  getEstadisticasByEncuentroModel,
  createEstadisticaModel,
  deleteEstadisticasByEncuentroModel
};