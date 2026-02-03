const estadoCuentaModel = require('../Models/estadoCuenta');

async function obtenerEstadoCuenta(req, res) {
  try {
    const { jugador_id } = req.params;

    const movimientos = await estadoCuentaModel.getEstadoCuentaJugador(jugador_id);
    const resumen = await estadoCuentaModel.getResumenEconomicoJugador(jugador_id);
    const deuda = await estadoCuentaModel.getDeudaActualJugador(jugador_id);

    res.json({
      jugador_id,
      resumen,
      deuda,
      movimientos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener estado de cuenta' });
  }
}

module.exports = {
  obtenerEstadoCuenta
};