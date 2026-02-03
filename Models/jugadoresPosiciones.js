const { get } = require('http');
const pool = require('../Utils/Pool');

/**
 * Crear UNA relación jugador–posición
 */
const createJugadorPosicionModel = async ({ jugador_id, posicion_id, orden }) => {
  const [res] = await pool.query(`
    INSERT INTO jugadores_posiciones (jugador_id, posicion_id, orden)
    VALUES (?, ?, ?)
  `, [jugador_id, posicion_id, orden]);

  return res.insertId;
};

/**
 * Crear MUCHAS relaciones jugador–posición (bulk)
 */
const createManyJugadorPosicionesModel = async (jugador_id, posiciones) => {
  // posiciones: [{ posicion_id, orden }]
  const values = posiciones.map(p => [
    jugador_id,
    p.posicion_id,
    p.orden
  ]);

  await pool.query(`
    INSERT INTO jugadores_posiciones (jugador_id, posicion_id, orden)
    VALUES ?
  `, [values]);

  return true;
};

/**
 * Borrar UNA relación jugador–posición
 */
const deleteJugadorPosicionModel = async (jugador_id, posicion_id) => {
  const [res] = await pool.query(`
    DELETE FROM jugadores_posiciones
    WHERE jugador_id = ? AND posicion_id = ?
  `, [jugador_id, posicion_id]);

  return res.affectedRows > 0;
};

/**
 * Borrar TODAS las posiciones de un jugador
 * (útil para replace)
 */
const deleteAllJugadorPosicionesModel = async (jugador_id) => {
  await pool.query(`
    DELETE FROM jugadores_posiciones
    WHERE jugador_id = ?
  `, [jugador_id]);

  return true;
};

/**
 * Todas las posiciones del jugador
 */
const getPosicionesByJugadorModel = async (jugador_id) => {
  const [rows] = await pool.query(`
    SELECT jp.posicion_id, p.nombre, p.sigla, p.color, jp.orden
    FROM jugadores_posiciones jp
    JOIN posiciones p ON p.posicion_id = jp.posicion_id
    WHERE jp.jugador_id = ?
    ORDER BY jp.orden ASC
  `, [jugador_id]);

  return rows;
};

/**
 * Posición principal (orden = 1)
 */
const getPosicionPrincipalModel = async (jugador_id) => {
  const [rows] = await pool.query(`
    SELECT p.*
    FROM jugadores_posiciones jp
    JOIN posiciones p ON p.posicion_id = jp.posicion_id
    WHERE jp.jugador_id = ? AND jp.orden = 1
  `, [jugador_id]);

  return rows[0] || null;
};

module.exports = {
  getPosicionesByJugadorModel,
  getPosicionPrincipalModel
};

module.exports = {
  createJugadorPosicionModel,
  createManyJugadorPosicionesModel,
  deleteJugadorPosicionModel,
  deleteAllJugadorPosicionesModel,
  getPosicionesByJugadorModel,
  getPosicionPrincipalModel
};