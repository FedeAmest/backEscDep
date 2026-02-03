const pool = require('../Utils/Pool');

/* =========================
   CRUD
========================= */

const createEntrenamientoModel = async ({ categoria_id, fecha }) => {
  const [res] = await pool.query(`
    INSERT INTO entrenamientos (categoria_id, fecha)
    VALUES (?, ?)
  `, [categoria_id, fecha]);

  return { entrenamiento_id: res.insertId, categoria_id, fecha };
};

const getEntrenamientosByCategoriaModel = async (categoria_id) => {
  const [rows] = await pool.query(`
    SELECT *
    FROM entrenamientos
    WHERE categoria_id = ?
    ORDER BY fecha DESC
  `, [categoria_id]);

  return rows;
};

const deleteEntrenamientoModel = async (entrenamiento_id) => {
  await pool.query(
    `DELETE FROM entrenamientos WHERE entrenamiento_id = ?`,
    [entrenamiento_id]
  );
};

/* =========================
   MÉTRICAS FUTURAS
========================= */

/**
 * Total de entrenamientos de una categoría
 */
const getTotalEntrenamientosCategoriaModel = async (categoria_id) => {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total
    FROM entrenamientos
    WHERE categoria_id = ?
  `, [categoria_id]);

  return rows[0].total;
};

module.exports = {
  createEntrenamientoModel,
  getEntrenamientosByCategoriaModel,
  deleteEntrenamientoModel,
  getTotalEntrenamientosCategoriaModel
};