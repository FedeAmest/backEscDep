const pool = require('../Utils/Pool');

const getAllUsersModel = async () => {
  const [rows] = await pool.query(
    'SELECT user_id, club_id, nombre, username, email, role, activo FROM usuarios ORDER BY user_id DESC'
  );
  return rows;
};

const getUserByClubIdModel = async (club_id) => {
  const [rows] = await pool.query(
    'SELECT user_id, club_id, nombre, username, email, role FROM usuarios WHERE club_id = ?',
    [club_id]
  );
  return rows;
};

const getUserByIdModel = async (user_id) => {
  const [rows] = await pool.query(
    'SELECT user_id, club_id, nombre, username, email, role FROM usuarios WHERE user_id = ?',
    [user_id]
  );
  return rows[0] || null;
};

const createUserModel = async (userData) => {
  const { club_id, nombre, username, email, password } = userData;
  const [res] = await pool.query(
    'INSERT INTO usuarios (club_id, nombre, username, email, password) VALUES (?, ?, ?, ?, ?)',
    [club_id, nombre, username, email, password]
  );
  return { user_id: res.insertId, ...userData };
};

const updateUserModel = async (user_id, userData) => {
  const { nombre, username } = userData;
  await pool.query(
    'UPDATE usuarios SET nombre = ?, username = ? WHERE user_id = ?',
    [nombre, username, user_id]
  );
  return getUserByIdModel(user_id);
};

const updateUserMailModel = async (user_id, newEmail) => {
  await pool.query(
    'UPDATE usuarios SET email = ? WHERE user_id = ?',
    [newEmail, user_id]
  );
  return getUserByIdModel(user_id);
};

const updateUserPasswordModel = async (user_id, newPassword) => {
  await pool.query(
    'UPDATE usuarios SET password = ? WHERE user_id = ?',
    [newPassword, user_id]
  );
  return true;
};

const deleteUserModel = async (user_id) => {
  const [res] = await pool.query(
    'UPDATE usuarios SET activo = 0 WHERE user_id = ?',
    [user_id]
  );
  return { ok: res.affectedRows > 0 };
};

const findUserByEmailModel = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
  return rows[0] || null;
};

const findUserByUsernameModel = async (username) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE username = ?',
    [username]
  );
  return rows[0] || null;
};

module.exports = {
  getUserByClubIdModel,
  getAllUsersModel,
  getUserByIdModel,
  createUserModel,
  updateUserModel,
  updateUserPasswordModel,
  updateUserMailModel,
  deleteUserModel,
  findUserByEmailModel,
  findUserByUsernameModel
};
