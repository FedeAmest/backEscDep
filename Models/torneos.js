const pool = require('../Utils/Pool');

/**
 * Obtener todos los torneos del club
 */
const getTorneosByClubModel = async (club_id) => {
  const [rows] = await pool.query(`
    SELECT
      t.torneo_id,
      t.nombre,
      t.formato,
      t.fecha_inicio,
      t.fecha_fin,
      COUNT(tc.categoria_id) AS total_categorias
    FROM torneos t
    LEFT JOIN torneos_categorias tc
      ON tc.torneo_id = t.torneo_id
    WHERE t.club_id = ?
    GROUP BY t.torneo_id
    ORDER BY t.fecha_inicio DESC
  `, [club_id]);

  return rows;
};

/**
 * Obtener torneo por ID
 */
const getTorneoByIdModel = async (torneo_id, club_id) => {
  const [rows] = await pool.query(`
    SELECT *
    FROM torneos
    WHERE torneo_id = ? AND club_id = ?
  `, [torneo_id, club_id]);

  return rows[0] || null;
};

/**
 * Crear torneo
 */
const createTorneoModel = async (data) => {
  const { club_id, nombre, formato, fecha_inicio } = data;

  const [res] = await pool.query(`
    INSERT INTO torneos
      (club_id, nombre, formato, fecha_inicio)
    VALUES (?, ?, ?, ?)
  `, [club_id, nombre, formato, fecha_inicio]);

  return { torneo_id: res.insertId };
};

/**
 * Actualizar torneo
 */
const updateTorneoModel = async (torneo_id, club_id, data) => {
  const { nombre, formato, fecha_inicio, fecha_fin } = data;

  await pool.query(`
    UPDATE torneos
    SET nombre = ?, formato = ?, fecha_inicio = ?, fecha_fin = ?
    WHERE torneo_id = ? AND club_id = ?
  `, [nombre, formato, fecha_inicio, fecha_fin, torneo_id, club_id]);
};

/**
 * Eliminar torneo
 */
const deleteTorneoModel = async (torneo_id, club_id) => {
  await pool.query(`
    DELETE FROM torneos
    WHERE torneo_id = ? AND club_id = ?
  `, [torneo_id, club_id]);
};

module.exports = {
  getTorneosByClubModel,
  getTorneoByIdModel,
  createTorneoModel,
  updateTorneoModel,
  deleteTorneoModel
};
