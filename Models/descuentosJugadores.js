const pool = require('../Utils/Pool');

const getDescuentoByJugadorIdModel = async (jugador_id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM descuentos_jugadores
     WHERE jugador_id = ? AND activo = 1`,
    [jugador_id]
  );
  return rows[0] || null;
};

const createDescuentoModel = async (data) => {
  const { jugador_id, porcentaje_descuento, motivo } = data;

  const [res] = await pool.query(
    `INSERT INTO descuentos_jugadores
      (jugador_id, porcentaje_descuento, motivo)
     VALUES (?, ?, ?)`,
    [jugador_id, porcentaje_descuento, motivo]
  );

  return res.insertId;
};

const updateDescuentoModel = async (descuento_jugador_id, data) => {
  const { porcentaje_descuento, motivo, activo } = data;

  await pool.query(
    `UPDATE descuentos_jugadores
     SET porcentaje_descuento = ?, motivo = ?, activo = ?
     WHERE descuento_jugador_id = ?`,
    [porcentaje_descuento, motivo, activo, descuento_jugador_id]
  );
};

const deleteDescuentoModel = async (descuento_jugador_id) => {
  await pool.query(
    `UPDATE descuentos_jugadores
     SET activo = 0
     WHERE descuento_jugador_id = ?`,
    [descuento_jugador_id]
  );
};

module.exports = {
  getDescuentoByJugadorIdModel,
  createDescuentoModel,
  updateDescuentoModel,
  deleteDescuentoModel
};