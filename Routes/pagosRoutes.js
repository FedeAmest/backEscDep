const express = require('express');
const router = express.Router();

const {
  registrarPago
} = require('../Controllers/pagosController');
const { authExtraction } = require('../Middlewares/authExtraction');

/*
POST /api/pagos
Body:
{
  jugador_id: 1,
  metodo_pago: "efectivo",
  referencia: "recibo 123",
  cargos: [
    { cargo_jugador_id: 10, monto: 50000 },
    { cargo_jugador_id: 12, monto: 30000 }
  ]
}
*/
router.post('/', authExtraction, registrarPago);

module.exports = router;