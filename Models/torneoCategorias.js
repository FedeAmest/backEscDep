const pool = require('../Utils/Pool');

/**
 * Vincular torneo con categoría
 */
const addCategoriaToTorneoModel = async (torneo_id, categoria_id) => {
  await pool.query(`
    INSERT INTO torneos_categorias (torneo_id, categoria_id)
    VALUES (?, ?)
  `, [torneo_id, categoria_id]);
};

/**
 * Obtener categorías de un torneo
 */
const getCategoriasByTorneoModel = async (torneo_id) => {
  const [rows] = await pool.query(`
    SELECT c.*
    FROM torneos_categorias tc
    JOIN categorias c ON c.categoria_id = tc.categoria_id
    WHERE tc.torneo_id = ?
  `, [torneo_id]);

  return rows;
};

/**
 * Quitar categoría de torneo
 */
const removeCategoriaFromTorneoModel = async (torneo_id, categoria_id) => {
  await pool.query(`
    DELETE FROM torneos_categorias
    WHERE torneo_id = ? AND categoria_id = ?
  `, [torneo_id, categoria_id]);
};



/**
 * Obtener torneos en los que participa una categoría
 * Devuelve TAMBIÉN el torneo_categoria_id
 */
const getTorneosByCategoriaModel = async (categoria_id) => {
  const [rows] = await pool.query(`
    SELECT
      tc.torneo_categoria_id,
      t.torneo_id,
      t.nombre,
      t.formato,
      t.fecha_inicio,
      t.fecha_fin
    FROM torneos_categorias tc
    JOIN torneos t
      ON t.torneo_id = tc.torneo_id
    WHERE tc.categoria_id = ?
    ORDER BY t.fecha_inicio DESC
  `, [categoria_id]);

  return rows;
};

module.exports = {
  getTorneosByCategoriaModel,
  addCategoriaToTorneoModel,
  getCategoriasByTorneoModel,
  removeCategoriaFromTorneoModel
};