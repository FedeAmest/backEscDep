const pool = require('../Utils/Pool');

const getAllClientesModel = async () => {
  const [rows] = await pool.query(`SELECT * FROM clientes`);
  return rows;
};

const getClienteByIdModel = async (cliente_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM clientes WHERE cliente_id = ?`,
    [cliente_id]
  );
  return rows[0] || null;
};

const createClienteModel = async (data) => {
  const { nombre, email, telefono, plan } = data;
  const [res] = await pool.query(`
    INSERT INTO clientes (nombre, email, telefono, plan, estado)
    VALUES (?, ?, ?, ?, 'activo')
  `, [nombre, email, telefono, plan]);
  return { cliente_id: res.insertId, ...data };
};

const updateClienteModel = async (cliente_id, data) => {
  const { nombre, email, telefono, plan, estado } = data;
  await pool.query(`
    UPDATE clientes
    SET nombre = ?, email = ?, telefono = ?, plan = ?, estado = ?
    WHERE cliente_id = ?
  `, [nombre, email, telefono, plan, estado, cliente_id]);
  return getClienteByIdModel(cliente_id);
};

const deleteClienteModel = async (cliente_id) => {
  const [res] = await pool.query(
    `DELETE FROM clientes WHERE cliente_id = ?`,
    [cliente_id]
  );
  return res.affectedRows > 0;
};

module.exports = {
  getAllClientesModel,
  getClienteByIdModel,
  createClienteModel,
  updateClienteModel,
  deleteClienteModel
};