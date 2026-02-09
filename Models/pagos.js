/* =========================================
   INGRESOS
========================================= */
async function crearIngreso(db, {
  club_id,
  jugador_id,
  cargo_id,
  concepto,
  monto,
  metodo_pago,
  referencia,
  creado_por
}) {
  const [result] = await db.query(`
    INSERT INTO ingresos
      (
        club_id,
        jugador_id,
        cargo_id,
        tipo,
        concepto,
        fecha,
        monto,
        metodo_pago,
        referencia,
        activo,
        creado_por
      )
    VALUES (?, ?, ?, NULL, ?, NOW(), ?, ?, ?, 1, ?)
  `, [
    club_id,
    jugador_id,
    cargo_id,
    concepto,
    monto,
    metodo_pago,
    referencia,
    creado_por
  ]);

  return result.insertId;
}

/* =========================================
   IMPUTAR INGRESO A CARGO
========================================= */
async function imputarIngresoACargo(db, {
  ingreso_id,
  cargo_jugador_id,
  monto_aplicado
}) {
  await db.query(`
    INSERT INTO ingresos_cargos
      (ingreso_id, cargo_jugador_id, monto_aplicado)
    VALUES (?, ?, ?)
  `, [ingreso_id, cargo_jugador_id, monto_aplicado]);
}

/* =========================================
   TOTAL PAGADO DE UN CARGO
========================================= */
async function getTotalPagadoCargo(db, cargo_jugador_id) {
  const [[row]] = await db.query(`
    SELECT COALESCE(SUM(monto_aplicado),0) AS total_pagado
    FROM ingresos_cargos
    WHERE cargo_jugador_id = ?
  `, [cargo_jugador_id]);

  return Number(row.total_pagado);
}

/* =========================================
   DATOS DEL CARGO
========================================= */
async function getCargo(db, cargo_jugador_id) {
  const [[row]] = await db.query(`
    SELECT
      cj.cargo_jugador_id,
      cj.monto,
      cj.estado,
      j.jugador_id,
      c.club_id,
      cf.nombre_default AS concepto
    FROM cargos_jugadores cj
    JOIN jugadores j ON j.jugador_id = cj.jugador_id
    JOIN categorias c ON c.categoria_id = j.categoria_id
    JOIN conceptos_facturacion cf ON cf.concepto_id = cj.concepto_id
    WHERE cj.cargo_jugador_id = ?
  `, [cargo_jugador_id]);

  return row;
}

/* =========================================
   ACTUALIZAR ESTADO DEL CARGO
========================================= */
async function actualizarEstadoCargo(db, cargo_jugador_id, estado) {
  await db.query(`
    UPDATE cargos_jugadores
    SET estado = ?
    WHERE cargo_jugador_id = ?
  `, [estado, cargo_jugador_id]);
}

module.exports = {
  crearIngreso,
  imputarIngresoACargo,
  getTotalPagadoCargo,
  getCargo,
  actualizarEstadoCargo
};