const { Router } = require('express');

const categorias = require('./categoriasRoutes');
const clientes = require('./clientesRoutes');
const clubes = require('./clubesRoutes');
const asistencia = require('./asistenciasRoutes');
const usuarios = require('./usuariosRoutes')
const gastos = require('./gastosRoutes')
const jugadores = require('./jugadoresRoutes')
const entrenamientos = require('./entrenamientosRoutes')
const torneoCategoria = require('./torneoCategoriaRoutes')
const torneo = require('./torneosRoutes')
const tutores = require('./tutoresRoutes')
const encuentros = require('./encuentrosRoutes')
const encuentroJugador = require('./encuentroJugadorRoutes')
const estadistica = require('./estadisticasRoutes')
const auth = require('./authRoutes.js');
const personalCategoria = require('./personalCategoriaRoutes');
const usuariosClubes = require('./usuarioClubesRoutes');
const horariosEntrenamiento = require('./horariosEntrenamientoRoutes.js');
const jugadoresTutores = require('./jugadoresTutoresRoutes.js');
const jugadoresPosiciones = require('./jugadoresPosicionesRoutes.js');
const planesAfiliacion = require('./planesAfiliacionRoutes.js');
const descuentosJugadores = require('./descuentosJugadoresRoutes.js');
const invitaciones = require('./invitacionesRoutes.js');
const ingresos = require('./ingresosRoutes.js');

const router = Router();

router.use('/personal-categoria', personalCategoria);
router.use('/categorias', categorias);
router.use('/clientes', clientes);
router.use('/clubes', clubes);
router.use('/asistencias', asistencia);
router.use('/usuarios', usuarios);
router.use('/gastos', gastos);
router.use('/ingresos', ingresos);
router.use('/jugadores', jugadores);
router.use('/entrenamientos', entrenamientos);
router.use('/torneos-categorias', torneoCategoria);
router.use('/torneos', torneo);
router.use('/tutores', tutores);
router.use('/encuentros', encuentros);
router.use('/encuentro-jugador', encuentroJugador);
router.use('/estadisticas', estadistica);
router.use('/auth', auth);
router.use('/usuarios-clubes', usuariosClubes);
router.use('/horarios-entrenamiento', horariosEntrenamiento);
router.use('/jugadores-tutores', jugadoresTutores);
router.use('/jugadores-posiciones', jugadoresPosiciones);
router.use('/planes-afiliacion', planesAfiliacion);
router.use('/descuentos-jugadores', descuentosJugadores);
router.use('/invitaciones', invitaciones);

module.exports = router;