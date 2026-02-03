const {
  getPlanFinancieroJugador,
  getEstadoCuentaRaw,
  getCargosJugador,
  getUltimosPagosJugador
} = require('../Models/jugadoresFinanzas');

async function getFinanzasJugador(req, res) {
  try {
    const { jugador_id } = req.params;

    /* =========================
     * 1️⃣ PLAN + DESCUENTOS
     * ========================= */
    const planData = await getPlanFinancieroJugador(jugador_id);

    if (!planData) {
      return res.status(404).json({
        message: 'Jugador sin configuración financiera'
      });
    }

    const plan_base = Number(planData.plan_base);
    const porcentaje_plan = Number(planData.porcentaje_plan); // % que paga
    const descuento_personal = Number(planData.descuento_personal);

    // aplicar plan
    const monto_plan = plan_base * (porcentaje_plan / 100);

    // aplicar descuento personal
    const monto_final = Math.max(
      Math.round(monto_plan * (1 - descuento_personal / 100)),
      0
    );

    /* =========================
 * 2️⃣ ESTADO DE CUENTA
 * ========================= */
const estadoRaw = await getEstadoCuentaRaw(jugador_id);

const deuda = Number(estadoRaw.deuda);
const pagado = Number(estadoRaw.pagado);

let estado;

if (deuda === 0) {
  estado = 'al_dia';
} else if (pagado > 0) {
  estado = 'parcial';
} else {
  estado = 'pendiente';
}
    /* =========================
     * 3️⃣ CARGOS + PAGOS
     * ========================= */
    const cargos = await getCargosJugador(jugador_id);
    const ultimos_pagos = await getUltimosPagosJugador(jugador_id);

    /* =========================
     * 4️⃣ RESPUESTA FINAL
     * ========================= */
    res.json({
      plan: {
        nombre: planData.plan_nombre,
        plan_base,
        porcentaje_plan,
        descuento_personal,
        monto_final
      },
      estado_cuenta: {
        estado,   // al_dia | parcial | pendiente
        deuda,
        pagado
      },
      cargos,
      ultimos_pagos
    });

  } catch (error) {
    console.error('❌ Error finanzas jugador:', error);
    res.status(500).json({
      message: 'Error al obtener finanzas del jugador'
    });
  }
}
module.exports = {
  getFinanzasJugador
};