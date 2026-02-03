const pool = require('../Utils/Pool');

/* =========================
   CRUD BÁSICO
========================= */

const getEncuentroByIdModel = async (encuentro_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM encuentros WHERE encuentro_id = ?`,
    [encuentro_id]
  );
  return rows[0] || null;
};

const createEncuentroModel = async (data) => {
  const {
    torneo_categoria_id,
    fecha,
    equipo_local,
    equipo_visitante,
    goles_local,
    goles_visitante,
    resultado
  } = data;

  const [res] = await pool.query(`
    INSERT INTO encuentros
    (torneo_categoria_id, fecha, equipo_local, equipo_visitante, goles_local, goles_visitante, resultado)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
    torneo_categoria_id,
    fecha,
    equipo_local,
    equipo_visitante,
    goles_local,
    goles_visitante,
    resultado
  ]);

  return { encuentro_id: res.insertId, ...data };
};

const updateEncuentroModel = async (encuentro_id, data) => {
  const {
    fecha,
    equipo_local,
    equipo_visitante,
    goles_local,
    goles_visitante,
    resultado
  } = data;

  await pool.query(`
    UPDATE encuentros
    SET fecha = ?, equipo_local = ?, equipo_visitante = ?,
        goles_local = ?, goles_visitante = ?, resultado = ?
    WHERE encuentro_id = ?
  `, [
    fecha,
    equipo_local,
    equipo_visitante,
    goles_local,
    goles_visitante,
    resultado,
    encuentro_id
  ]);
};

const deleteEncuentroModel = async (encuentro_id) => {
  await pool.query(`DELETE FROM encuentros WHERE encuentro_id = ?`, [encuentro_id]);
};

/* =========================
   CONSULTAS PARA VISTAS
========================= */

/**
 * Últimos encuentros del club (tabla tipo "Últimos Resultados")
 */
const getUltimosEncuentrosByClubModel = async (club_id, limit = 5) => {
  const [rows] = await pool.query(`
    SELECT
      e.encuentro_id,
      e.fecha,
      e.equipo_local,
      e.equipo_visitante,
      e.goles_local,
      e.goles_visitante,
      e.resultado,
      t.nombre AS torneo
    FROM encuentros e
    JOIN torneos_categorias tc ON tc.torneo_categoria_id = e.torneo_categoria_id
    JOIN torneos t ON t.torneo_id = tc.torneo_id
    JOIN categorias c ON c.categoria_id = tc.categoria_id
    WHERE c.club_id = ?
    ORDER BY e.fecha DESC
    LIMIT ?
  `, [club_id, limit]);

  return rows;
};

/**
 * Detalle completo del encuentro (cabecera)
 */
const getDetalleEncuentroModel = async (encuentro_id) => {
  const [rows] = await pool.query(`
    SELECT
      e.*,
      t.nombre AS torneo,
      c.nombre AS categoria
    FROM encuentros e
    JOIN torneos_categorias tc ON tc.torneo_categoria_id = e.torneo_categoria_id
    JOIN torneos t ON t.torneo_id = tc.torneo_id
    JOIN categorias c ON c.categoria_id = tc.categoria_id
    WHERE e.encuentro_id = ?
  `, [encuentro_id]);

  return rows[0] || null;
};

module.exports = {
  getEncuentroByIdModel,
  createEncuentroModel,
  updateEncuentroModel,
  deleteEncuentroModel,
  getUltimosEncuentrosByClubModel,
  getDetalleEncuentroModel
};