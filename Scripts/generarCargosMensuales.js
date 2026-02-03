const pool = require('../Utils/Pool');
async function generarCargosMensuales(club_id) {
  console.log('▶ Generando cargos mensuales...');

  /* 1️⃣ Ciclo abierto */
  const [[ciclo]] = await pool.query(`
    SELECT ciclo_id
    FROM ciclos_facturacion
    WHERE club_id = ?
      AND estado = 'abierto'
  `, [club_id]);

  if (!ciclo) throw new Error('No hay ciclo abierto');
  const ciclo_id = ciclo.ciclo_id;

  /* 2️⃣ Cargo mensual */
  const [[cargo]] = await pool.query(`
    SELECT cargo_id, concepto_id, monto_base
    FROM cargos
    WHERE club_id = ?
      AND activo = 1
    LIMIT 1
  `, [club_id]);

  if (!cargo) throw new Error('No hay cargo configurado');

  /* 3️⃣ Jugadores + planes */
  const [jugadores] = await pool.query(`
    SELECT
      j.jugador_id,
      COALESCE(pa.porcentaje_aplicado, 100) AS porcentaje_plan,
      COALESCE(dj.porcentaje_descuento, 0) AS descuento_personal
    FROM jugadores j
    LEFT JOIN planes_afiliacion pa
      ON pa.plan_afiliacion_id = j.plan_afiliacion_id
    LEFT JOIN descuentos_jugadores dj
      ON dj.jugador_id = j.jugador_id
     AND dj.activo = 1
    WHERE j.activo = 1
  `);

  for (const j of jugadores) {
    const planBase = Number(cargo.monto_base);
    const porcentajePlan = Number(j.porcentaje_plan);
    const descuentoPersonal = Number(j.descuento_personal);

    // ✔️ cálculo correcto
    const montoPlan = planBase * (porcentajePlan / 100);
    const montoFinal = Math.max(
      Math.round(montoPlan * (1 - descuentoPersonal / 100)),
      0
    );

    const estado = montoFinal === 0 ? 'pagado' : 'pendiente';

    // evitar duplicados
    const [[exists]] = await pool.query(`
      SELECT 1
      FROM cargos_jugadores
      WHERE jugador_id = ?
        AND cargo_id = ?
        AND ciclo_id = ?
    `, [j.jugador_id, cargo.cargo_id, ciclo_id]);

    if (exists) continue;

    await pool.query(`
      INSERT INTO cargos_jugadores
        (jugador_id, cargo_id, concepto_id, ciclo_id, monto, estado)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      j.jugador_id,
      cargo.cargo_id,
      cargo.concepto_id,
      ciclo_id,
      montoFinal,
      estado
    ]);
  }

  console.log('✅ Cargos generados correctamente');
}
module.exports = {
  generarCargosMensuales
};