const { Router } = require('express');
const router = Router();

const {authExtraction} = require('../Middlewares/authExtraction');
const {userContext} = require('../Middlewares/userContext');

const { getJugadoresByClub,
    getJugadoresByPosicion,
    getJugadoresOrdenados,
    getPlayersMainCardsByClub,
    getJugadorContacto,
    searchJugadores,
    getJugadoresByCategoria,
    getJugadorById,
    getJugadorConPosiciones,
    getMainPlayerCardData,
    createJugador,
    updateJugador,
    deleteJugador ,
    getJugadorEstadoCuenta,
    getJugadorDeportivo} = require('../Controllers/jugadoresController');
    
// const estadoCuentaController = require('../Controllers/estadoCuentaController');
const pagosController = require('../Controllers/pagosController');

router.get('/main-cards', authExtraction, userContext, getPlayersMainCardsByClub);
router.get('/', authExtraction, userContext, getJugadoresByClub);
router.get('/search',authExtraction,userContext,searchJugadores);
router.get('/categoria/:categoria_id', authExtraction, userContext, getJugadoresByCategoria);
router.get('/:jugador_id', authExtraction, userContext, getJugadorById);
router.get('/:jugador_id/main-card', authExtraction, userContext, getMainPlayerCardData);
router.get('/:jugador_id/full', authExtraction, userContext, getJugadorConPosiciones);
router.post('/', authExtraction, userContext, createJugador);
router.put('/:jugador_id', authExtraction, userContext, updateJugador);
router.delete('/:jugador_id',authExtraction, userContext, deleteJugador);
router.get('/posicion/:categoria_posicion',authExtraction,userContext,getJugadoresByPosicion);
router.get('/orden',authExtraction,userContext,getJugadoresOrdenados);


// Info deportiva
router.get('/:jugador_id/deportivo',  getJugadorDeportivo);




/** * Registrar pago (MVP)*/
router.post('/pagos',  pagosController.registrarPago);

/** * 📞 Contacto jugador + tutor */
router.get(
'/:jugador_id/contacto',  getJugadorContacto);

const {
  getFinanzasJugador
} = require('../Controllers/jugadoresFinanzasController');

router.get('/:jugador_id/estado-cuenta', getFinanzasJugador);

module.exports = router;