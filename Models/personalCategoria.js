const pool = require('../Utils/Pool');

/* ===============================
   CATEGORIAS POR USUARIO (club-safe)
================================ */
const getCategoriasByUsuarioModel = async (user_id, club_id) => {
  const [rows] = await pool.query(`
    SELECT 
      pc.personal_categoria_id,
      c.categoria_id,
      c.nombre AS categoria,
      pc.role
    FROM personal_categoria pc
    JOIN categorias c 
      ON c.categoria_id = pc.categoria_id
    JOIN usuarios_clubes uc
      ON uc.user_id = pc.user_id
     AND uc.club_id = ?
     AND uc.activo = 1
    WHERE pc.user_id = ?
  `, [club_id, user_id]);

  return rows;
};

/* ===============================
   USUARIOS POR CATEGORIA (club-safe)
================================ */
const getUsuariosByCategoriaModel = async (categoria_id, club_id) => {
  const [rows] = await pool.query(`
    SELECT
      u.user_id,
      u.nombre,
      u.email,
      pc.role
    FROM personal_categoria pc
    JOIN usuarios u 
      ON u.user_id = pc.user_id
    JOIN usuarios_clubes uc
      ON uc.user_id = u.user_id
     AND uc.club_id = ?
     AND uc.activo = 1
    WHERE pc.categoria_id = ?
  `, [club_id, categoria_id]);

  return rows;
};

/* ===============================
   CREATE (valida club)
================================ */
const createCategoriaUsuarioModel = async ({ categoria_id, user_id, club_id, role }) => {
  // validar pertenencia al club
  const [belongs] = await pool.query(`
    SELECT 1 FROM usuarios_clubes
    WHERE user_id = ? AND club_id = ? AND activo = 1
  `, [user_id, club_id]);

  if (!belongs.length) return null;

  const [exists] = await pool.query(`
    SELECT personal_categoria_id
    FROM personal_categoria
    WHERE categoria_id = ? AND user_id = ?
  `, [categoria_id, user_id]);

  if (exists.length > 0) return false;

  const [res] = await pool.query(`
    INSERT INTO personal_categoria (categoria_id, user_id, role)
    VALUES (?, ?, ?)
  `, [categoria_id, user_id, role]);

  return {
    personal_categoria_id: res.insertId,
    categoria_id,
    user_id,
    role
  };
};

/* ===============================
   UPDATE ROLE
================================ */
const updatePersonalCategoriaModel = async (id, role) => {
  const [res] = await pool.query(`
    UPDATE personal_categoria
    SET role = ?
    WHERE personal_categoria_id = ?
  `, [role, id]);

  return res.affectedRows > 0;
};

/* ===============================
   DELETE
================================ */
const deletePersonalCategoriaModel = async (id) => {
  const [res] = await pool.query(`
    DELETE FROM personal_categoria
    WHERE personal_categoria_id = ?
  `, [id]);

  return res.affectedRows > 0;
};

module.exports = {
  getCategoriasByUsuarioModel,
  getUsuariosByCategoriaModel,
  createCategoriaUsuarioModel,
  updatePersonalCategoriaModel,
  deletePersonalCategoriaModel
};