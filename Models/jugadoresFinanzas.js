const pool = require('../Utils/Pool');

/* =====================================================
 * PLAN BASE + PLAN AFILIACIÓN + DESCUENTO PERSONAL
 * ===================================================== */
async function getPlanFinancieroJugador(jugador_id) {
  const [[row]] = await pool.query(`
    SELECT
      COALESCE(pa.nombre, 'Plan Base')        AS plan_nombre,
      cfc.monto_base_plan                    AS plan_base,
      COALESCE(pa.porcentaje_aplicado, 100)  AS porcentaje_plan,
      IFNULL(dj.porcentaje_descuento, 0)     AS descuento_personal
    FROM jugadores j
    JOIN categorias c
      ON c.categoria_id = j.categoria_id
    JOIN configuracion_facturacion_club cfc
      ON cfc.club_id = c.club_id
    LEFT JOIN planes_afiliacion pa
      ON pa.plan_afiliacion_id = j.plan_afiliacion_id
    LEFT JOIN descuentos_jugadores dj
      ON dj.jugador_id = j.jugador_id
     AND dj.activo = 1
    WHERE j.jugador_id = ?
  `, [jugador_id]);

  return row;
}

/* =====================================================
 * ESTADO DE CUENTA (SUMAS)
 * ===================================================== */
async function getEstadoCuentaRaw(jugador_id) {
  const [[row]] = await pool.query(`
    SELECT
      COALESCE(SUM(CASE WHEN estado = 'pendiente' THEN monto ELSE 0 END),0) AS deuda,
      COALESCE(SUM(CASE WHEN estado = 'pagado' THEN monto ELSE 0 END),0)    AS pagado
    FROM cargos_jugadores
    WHERE jugador_id = ?
  `, [jugador_id]);

  return row;
}

/* =====================================================
 * LISTA DE CARGOS
 * ===================================================== */
async function getCargosJugador(jugador_id) {
  const [rows] = await pool.query(`
    SELECT
      cj.cargo_jugador_id,
      cf.nombre_default AS concepto,
      cj.monto,
      cj.estado,
      cj.creado_en
    FROM cargos_jugadores cj
    JOIN conceptos_facturacion cf
      ON cf.concepto_id = cj.concepto_id
    WHERE cj.jugador_id = ?
    ORDER BY cj.creado_en DESC
  `, [jugador_id]);

  return rows;
}

/* =====================================================
 * ÚLTIMOS PAGOS / INGRESOS
 * ===================================================== */
async function getUltimosPagosJugador(jugador_id) {
  const [rows] = await pool.query(`
    SELECT
      ingreso_id,
      fecha,
      monto,
      metodo_pago,
      referencia
    FROM ingresos
    WHERE jugador_id = ?
      AND activo = 1
    ORDER BY fecha DESC
    LIMIT 5
  `, [jugador_id]);

  return rows;
}

module.exports = {
  getPlanFinancieroJugador,
  getEstadoCuentaRaw,
  getCargosJugador,
  getUltimosPagosJugador
};