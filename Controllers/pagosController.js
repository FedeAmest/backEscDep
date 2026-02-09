const pool = require('../Utils/Pool');
const {
  crearIngreso,
  imputarIngresoACargo,
  getTotalPagadoCargo,
  getCargo,
  actualizarEstadoCargo
} = require('../Models/pagos');

async function registrarPago(req, res) {
  const {
    cargo_jugador_id,
    monto,
    metodo_pago,
    referencia
  } = req.body;
console.log('🔍 registrarPago - cargo_jugador_id:', cargo_jugador_id, 'monto:', monto); // Debug log
console.log('🔍 registrarPago - req.body:', req.body); // Debug lo
console.log('🔍 registrarPago - req.auth:', req.auth); // Debug log
  const usuario_id = req.auth.user_id;
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const cargo = await getCargo(conn, cargo_jugador_id);
    console.log('🔍 registrarPago - cargo obtenido:', cargo); // Debug log
    if (!cargo) throw new Error('Cargo inexistente');

    const ingreso_id = await crearIngreso(conn, {
  club_id: cargo.club_id,
  jugador_id: cargo.jugador_id,
  cargo_id: cargo.cargo_jugador_id,
  concepto: cargo.concepto,
  monto,
  metodo_pago,
  referencia,
  creado_por: usuario_id
});

    await imputarIngresoACargo(conn, {
      ingreso_id,
      cargo_jugador_id,
      monto_aplicado: monto
    });

    const totalPagado = await getTotalPagadoCargo(conn, cargo_jugador_id);

    let nuevoEstado = 'pendiente';
    if (totalPagado >= cargo.monto) nuevoEstado = 'pagado';
    else if (totalPagado > 0) nuevoEstado = 'parcial';

    await actualizarEstadoCargo(conn, cargo_jugador_id, nuevoEstado);

    await conn.commit();

    res.json({ ok: true, ingreso_id, estado_cargo: nuevoEstado });

  } catch (err) {
    console.log('Error en registrarPago:', err); // Debug log
    await conn.rollback();
    res.status(500).json({ message: err.message });
  } finally {
    conn.release();
  }
}

module.exports = {
  registrarPago
};