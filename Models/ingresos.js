const pool = require('../Utils/Pool');

/* ===============================
   INGRESOS POR CLUB
================================ */
const getAllIngresosByClubModel = async (club_id) => {
  const [rows] = await pool.query(`
    SELECT
      i.ingreso_id,
      i.fecha,
      i.monto,
      i.metodo_pago,
      i.tipo,
      i.concepto,
      i.referencia,
      j.nombre AS jugador_nombre,
      c.nombre AS categoria_nombre
    FROM ingresos i
    LEFT JOIN jugadores j ON j.jugador_id = i.jugador_id
    LEFT JOIN categorias c ON c.categoria_id = j.categoria_id
    WHERE i.club_id = ?
      AND i.activo = 1
    ORDER BY i.ingreso_id DESC
  `, [club_id]);

  return rows;
};

/* ===============================
   CREATE
================================ */
const createIngresoModel = async (data) => {
  const {
    club_id,
    jugador_id = null,
    cargo_id = null,
    tipo,
    concepto,
    fecha,
    monto,
    metodo_pago,
    referencia
  } = data;

  const [res] = await pool.query(`
    INSERT INTO ingresos
      (club_id, jugador_id, cargo_id, tipo, concepto, fecha, monto, metodo_pago, referencia)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    club_id,
    jugador_id,
    cargo_id,
    tipo,
    concepto,
    fecha,
    monto,
    metodo_pago,
    referencia
  ]);

  return { ingreso_id: res.insertId };
};

/* ===============================
   UPDATE
================================ */
const updateIngresoModel = async (ingreso_id, data) => {
  const {
    concepto,
    fecha,
    monto,
    metodo_pago,
    referencia
  } = data;

  await pool.query(`
    UPDATE ingresos
    SET concepto = ?,
        fecha = ?,
        monto = ?,
        metodo_pago = ?,
        referencia = ?
    WHERE ingreso_id = ?
  `, [
    concepto,
    fecha,
    monto,
    metodo_pago,
    referencia,
    ingreso_id
  ]);

  return true;
};

/* ===============================
   DELETE (SOFT)
================================ */
const deleteIngresoModel = async (ingreso_id) => {
  const [res] = await pool.query(`
    UPDATE ingresos
    SET activo = 0
    WHERE ingreso_id = ?
  `, [ingreso_id]);

  return res.affectedRows > 0;
};

module.exports = {
  getAllIngresosByClubModel,
  createIngresoModel,
  updateIngresoModel,
  deleteIngresoModel
};