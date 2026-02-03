
const pool = require('../Utils/Pool');

const getGastosByClubIdModel = async(club_id)=>{
  const [res] = await pool.query(`SELECT * FROM gastos WHERE club_id = ? ORDER BY gasto_id DESC`, [club_id]);
  return res;
}

const getGastosByIdModel = async (gastos_id) => {
  const [res] = await pool.query(`SELECT * FROM gastos WHERE gasto_id = ?`, [gastos_id]);
  return res[0];
};

const createGastosModel = async (data) => {
  const {club_id,descripcion,monto,fecha,tipo} = data;
  const [res] = await pool.query('INSERT INTO gastos (club_id, descripcion, monto, fecha, tipo) VALUES (?, ?, ?, ?, ?)', [club_id, descripcion, monto, fecha, tipo]);
  return { gastos_id: res.insertId, ...data };
};

const updateGastosModel = async (gastos_id, data) => {
  const {descripcion,monto,tipo}= data
  await pool.query('UPDATE gastos SET descripcion = ?, monto = ?, tipo = ? WHERE gasto_id = ?', [descripcion, monto, tipo, gastos_id]);
  return getGastosByIdModel(gastos_id);
};

const deleteGastosModel = async (gastos_id) => {
  await pool.query('DELETE FROM gastos WHERE gasto_id = ?', [gastos_id]);
  return { deleted: true };
};


module.exports = {
  getGastosByClubIdModel,
  getGastosByIdModel,
  createGastosModel,
  updateGastosModel,
  deleteGastosModel
};