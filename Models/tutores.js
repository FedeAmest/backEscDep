const pool = require('../Utils/Pool');

/**
 * Buscar tutor por DNI dentro de un club (autocompletado)
 */
const getTutorByDniModel = async (club_id, dni) => {
  const [rows] = await pool.query(`
    SELECT *
    FROM tutores
    WHERE club_id = ? AND dni = ?
    LIMIT 1
  `, [club_id, dni]);

  return rows[0] || null;
};

/**
 * Obtener tutor por ID
 */
const getTutorByIdModel = async (tutor_id) => {
  const [rows] = await pool.query(
    'SELECT * FROM tutores WHERE tutor_id = ?',
    [tutor_id]
  );
  return rows[0] || null;
};

/**
 * Obtener tutores de un jugador
 */
const getTutoresByJugadorIdModel = async (jugador_id) => {
  const [rows] = await pool.query(`
    SELECT t.*, jt.parentesco
    FROM jugadores_tutores jt
    INNER JOIN tutores t ON t.tutor_id = jt.tutor_id
    WHERE jt.jugador_id = ?
    ORDER BY t.tutor_id DESC
  `, [jugador_id]);

  return rows;
};

/**
 * Crear tutor
 */
const createTutorModel = async (data) => {
  console.log(data)
  const { club_id, dni, nombre, email, telefono, direccion } = data;

  const [res] = await pool.query(`
    INSERT INTO tutores ( club_id,dni, nombre, email, telefono, direccion)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [club_id, dni, nombre, email, telefono, direccion]);

  return { tutor_id: res.insertId, ...data };
};

/**
 * Vincular tutor con jugador
 */
const linkTutorJugadorModel = async ({ jugador_id, tutor_id, parentesco }) => {
  await pool.query(`
    INSERT INTO jugadores_tutores (jugador_id, tutor_id, parentesco)
    VALUES (?, ?, ?)
  `, [jugador_id, tutor_id, parentesco]);
};

/**
 * Actualizar tutor
 */
const updateTutorModel = async (tutor_id, data) => {
  const { nombre, email, telefono, direccion } = data;

  await pool.query(`
    UPDATE tutores
    SET nombre = ?, email = ?, telefono = ?, direccion = ?
    WHERE tutor_id = ?
  `, [nombre, email, telefono, direccion, tutor_id]);

  return getTutorByIdModel(tutor_id);
};

/**
 * Eliminar tutor (solo si no tiene relaciones)
 */
const deleteTutorModel = async (tutor_id) => {
  const [res] = await pool.query(
    'DELETE FROM tutores WHERE tutor_id = ?',
    [tutor_id]
  );
  return res.affectedRows > 0;
};

module.exports = {
  getTutorByDniModel,
  getTutorByIdModel,
  getTutoresByJugadorIdModel,
  createTutorModel,
  linkTutorJugadorModel,
  updateTutorModel,
  deleteTutorModel
};
