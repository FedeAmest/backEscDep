const pool = require('../Utils/Pool');

/**
 * Estado de cuenta completo
 */
async function getEstadoCuentaJugador(jugador_id) {
  const [rows] = await pool.query(`
    SELECT
      cj.cargo_jugador_id,
      cf.nombre_default AS concepto,
      cf.concepto_key,
      cfc.periodo,
      cj.monto,
      cj.estado,
      cj.cuota_numero,
      cj.cuotas_totales,
      cj.creado_en
    FROM cargos_jugadores cj
    JOIN conceptos_facturacion cf
      ON cf.concepto_id = cj.concepto_id
    JOIN ciclos_facturacion cfc
      ON cfc.ciclo_id = cj.ciclo_id
    WHERE cj.jugador_id = ?
    ORDER BY cfc.fecha_inicio DESC, cj.creado_en DESC
  `, [jugador_id]);

  return rows;
}

/**
 * Resumen económico (tarjeta)
 */
async function getResumenEconomicoJugador(jugador_id) {
  const [[row]] = await pool.query(`
    SELECT
      IFNULL(SUM(cj.monto), 0) AS total_facturado,
      IFNULL(SUM(CASE WHEN cj.estado = 'pagado' THEN cj.monto ELSE 0 END), 0) AS total_pagado,
      IFNULL(SUM(CASE WHEN cj.estado != 'pagado' THEN cj.monto ELSE 0 END), 0) AS total_deuda
    FROM cargos_jugadores cj
    WHERE cj.jugador_id = ?
  `, [jugador_id]);

  return row;
}

/**
 * Deuda actual
 */
async function getDeudaActualJugador(jugador_id) {
  const [rows] = await pool.query(`
    SELECT
      cj.cargo_jugador_id,
      cf.nombre_default AS concepto,
      cfc.periodo,
      cj.monto,
      cj.estado
    FROM cargos_jugadores cj
    JOIN conceptos_facturacion cf
      ON cf.concepto_id = cj.concepto_id
    JOIN ciclos_facturacion cfc
      ON cfc.ciclo_id = cj.ciclo_id
    WHERE cj.jugador_id = ?
      AND cj.estado IN ('pendiente', 'parcial')
    ORDER BY cfc.fecha_inicio
  `, [jugador_id]);

  return rows;
}

module.exports = {
  getEstadoCuentaJugador,
  getResumenEconomicoJugador,
  getDeudaActualJugador
};