const pool = require('../Utils/Pool');

/* ===============================
   LISTAR CARGOS POR JUGADOR
================================ */
const getCargosByJugadorModel = async (jugador_id) => {
  const [rows] = await pool.query(`
    SELECT *
    FROM cargos_jugadores
    WHERE jugador_id = ?
    ORDER BY creado_en DESC
  `, [jugador_id]);

  return rows;
};

/* ===============================
   LISTAR CARGOS POR CLUB
================================ */
const getCargosByClubModel = async (club_id) => {
  const [rows] = await pool.query(`
    SELECT cj.*, j.nombre AS jugador_nombre
    FROM cargos_jugadores cj
    JOIN jugadores j ON j.jugador_id = cj.jugador_id
    JOIN categorias c ON c.categoria_id = j.categoria_id
    WHERE c.club_id = ?
    ORDER BY cj.creado_en DESC
  `, [club_id]);

  return rows;
};

/* ===============================
   CREAR CARGO
================================ */
const createCargoModel = async (data) => {
  const {
    jugador_id,
    concepto_id,
    ciclo_id,
    monto,
    cuota_numero = null,
    cuotas_totales = null,
    estado = 'pendiente'
  } = data;

  const [res] = await pool.query(`
    INSERT INTO cargos_jugadores
      (jugador_id, concepto_id, ciclo_id, monto,
       cuota_numero, cuotas_totales, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
    jugador_id,
    concepto_id,
    ciclo_id,
    monto,
    cuota_numero,
    cuotas_totales,
    estado
  ]);

  return { cargo_id: res.insertId };
};

/* ===============================
   ACTUALIZAR ESTADO CARGO
================================ */
const updateCargoEstadoModel = async (cargo_id, estado) => {
  const [res] = await pool.query(`
    UPDATE cargos_jugadores
    SET estado = ?
    WHERE cargo_id = ?
  `, [estado, cargo_id]);

  return res.affectedRows > 0;
};

/* ===============================
   ELIMINAR CARGO (SOFT)
================================ */
const deleteCargoModel = async (cargo_id) => {
  const [res] = await pool.query(`
    UPDATE cargos_jugadores
    SET estado = 'anulado'
    WHERE cargo_id = ?
  `, [cargo_id]);

  return res.affectedRows > 0;
};

/* ===============================
  OBTENER CARGO POR ID
================================ */
const getCargoByIdModel = async (cargo_jugador_id) => {
  const [rows] = await pool.query(`
    SELECT
      cj.cargo_jugador_id,
      cj.jugador_id,
      j.nombre AS jugador_nombre,
      cj.monto AS monto_original,
      IFNULL(p.total_pagado, 0) AS pagado_total,
      (cj.monto - IFNULL(p.total_pagado, 0)) AS saldo_pendiente,
      cj.estado,
      cj.creado_en,
      cf.nombre_default AS concepto

    FROM cargos_jugadores cj

    JOIN conceptos_facturacion cf
      ON cf.concepto_id = cj.concepto_id
    JOIN jugadores j
      ON j.jugador_id = cj.jugador_id
    JOIN categorias c
      ON c.categoria_id = j.categoria_id
    LEFT JOIN (
      SELECT
        cargo_jugador_id,
        SUM(monto_aplicado) AS total_pagado
      FROM ingresos_cargos
      GROUP BY cargo_jugador_id
    ) p ON p.cargo_jugador_id = cj.cargo_jugador_id

    WHERE cj.cargo_jugador_id = ?
  `, [cargo_jugador_id]);

  return rows[0];
};

module.exports = {
  getCargoByIdModel,
  getCargosByJugadorModel,
  getCargosByClubModel,
  createCargoModel,
  updateCargoEstadoModel,
  deleteCargoModel
};