const pool = require('../Utils/Pool');

async function registrarPago(req, res) {
  try {
    const { cargo_jugador_id } = req.body;

    await pool.query(`
      UPDATE cargos_jugadores
      SET estado = 'pagado'
      WHERE cargo_jugador_id = ?
    `, [cargo_jugador_id]);

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar pago' });
  }
}

module.exports = {
  registrarPago
};