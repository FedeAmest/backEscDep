
const express = require('express');
const router = express.Router();
const { inscribirCategoria, getCategoriasByTorneo, getTorneosByCategoria, deleteRelacion } = require('../Controllers/torneoCategoriaController');


//Rutas para torneo-categoria
router.post('/', inscribirCategoria);
router.get('/:torneo_id', getCategoriasByTorneo);
router.get('/categorias/:categoria_id', getTorneosByCategoria);
router.delete('/:torneo_categoria_id', deleteRelacion);
module.exports = router;