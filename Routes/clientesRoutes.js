const { Router } = require('express');
const router = Router();
const {  getAllClientes,getClienteById, createCliente ,updateCliente ,deleteCliente } = require('../Controllers/clientesController');

router.get('/', getAllClientes);
router.get('/:cliente_id', getClienteById);
router.post('/', createCliente);
router.put('/:cliente_id', updateCliente);
router.delete('/:cliente_id', deleteCliente);

module.exports = router;