const express = require('express');
const router = express.Router();
const { getAllCategories ,createCategory,deleteCategory,updateCategory } = require('../Controllers/categoriaController');
const { getAllAsistenciaByCategoria,createAsistencia,updateAsistencia,deleteAsistencia} = require('../Controllers/asistenciaController');
const { getAllClubs, getClubsByClient,createClub,updateClub,deleteClub} = require('../Controllers/clubesController');
const { getAllClientes, getClienteById, createCliente, updateCliente, deleteCliente } = require('../Controllers/clienteController');
const { getJugadorById,getJugadoresByCategoriaId,getJugadoresByClubId,getJugadoresFiltrados,createJugador,updateJugador,deleteJugador } = require('../Controllers/jugadorcontroller');
const { getAllTorneosByClub, createTorneo, updateTorneo, deleteTorneo, getTorneoById} = require('../Controllers/torneoController');
const { inscribirCategoria, getCategoriasByTorneo, getTorneosByCategoria, deleteRelacion } = require('../Controllers/torneoCategoriaController');
const { getTutorById, getTutoresByJugadorId, createTutor, deleteTutor,updateTutor}= require('../Controllers/tutoresController');
const { getGastosByClubId,createGastos,deleteGastos,updateGastos,getGastosById }= require('../Controllers/gastosController');
const { getUserById,getAllUsers,createUser,updateUser,updateUserPassword,deleteUser, updateUserMail} = require('../Controllers/userController');
const { getAllEntrenamientosByCategoriaId, getEntrenamientosById, createEntrenamientos, updateEntrenamientos, deleteEntrenamientos } = require('../Controllers/entrenamientosController');
const { getAllPagosByClub,createPago,updatePago,deletePago} = require('../Controllers/pagosController');
const { getAllEncuentrosByTorneoCategoriaId,getEncuentroById,createEncuentro,deleteEncuentro,updateEncuentro}=require('../Controllers/encuentroController');
const { getEstadisticaByTorneoId,getEstadisticaByJugadorId,createEstadistica,updateEstadistica,deleteEstadistica} = require('../Controllers/estadisticaController');
const { getAllEncuentrosByJugadorId,getAllJugadoresByEncuentroId,createEncuentroJugador,deleteEncuentroJugador,updateEncuentroJugador} =require('../Controllers/encuentroJugadorController');



// Rutas para asistencia 

router.get('/asistencias/categoria/:categoria_id', getAllAsistenciaByCategoria);
router.post('/asistencias', createAsistencia);
router.put('/asistencias/:id_asistencia', updateAsistencia);
router.delete('/asistencias/:id_asistencia', deleteAsistencia);

// Rutas para clientes
router.get('/clientes', getAllClientes);
router.get('/clientes/:id', getClienteById);
router.post('/clientes', createCliente);
router.put('/clientes/:id', updateCliente);
router.delete('/clientes/:id', deleteCliente);

// Rutas para categorias
router.get('/categorias/:clubID', getAllCategories);
router.post('/categorias', createCategory);
router.put('/categorias/:id', updateCategory);
router.delete('/categorias/:id', deleteCategory);


// Rutas para clubes
router.get('/clubes', getAllClubs);
router.get('/clubes/:cliente_id', getClubsByClient);
router.post('/clubes', createClub);
router.put('/clubes/:club_id', updateClub);
router.delete('/clubes/:club_id', deleteClub);

// Rutas Para Jugadores
router.get('/jugadores/:club_id', getJugadoresByClubId);
router.get('/jugadores/categoria/:categoria_id', getJugadoresByCategoriaId);
router.get('/jugadores/jugador/:jugador_id', getJugadorById);
router.post('/jugadores', createJugador);
router.put('/jugadores/:jugador_id', updateJugador);
router.delete('/jugadores/:jugador_id', deleteJugador);
router.post('/jugadores/filtros', getJugadoresFiltrados);

// Rutas para torneos
    
router.get('/torneos/:club_id', getAllTorneosByClub);
router.get('/torneos/:torneo_id', getTorneoById);
router.post('/torneos', createTorneo);
router.put('/torneos/:torneo_id', updateTorneo);
router.delete('/torneos/:torneo_id', deleteTorneo);

//Rutas para torneo-categoria
router.post('/torneos-categorias', inscribirCategoria);
router.get('/torneos-categorias/:torneo_id', getCategoriasByTorneo);
router.get('/torneos-categorias/:categoria_id', getTorneosByCategoria);
router.delete('/torneos-categorias/:torneo_categoria_id', deleteRelacion);

// Rutas para tutores
router.get('/tutores/:id', getTutorById);
router.get('/tutores/jugador/:id', getTutoresByJugadorId);
router.post('/tutores', createTutor);
router.put('/tutores/:id', updateTutor);
router.delete('/tutores/:id', deleteTutor);

// Rutas para gastos

router.get('/gastos/club/:club_id', getGastosByClubId);
router.get('/gastos/:gastos_id', getGastosById);
router.post('/gastos', createGastos);
router.put('/gastos/:gastos_id', updateGastos);
router.delete('/gastos/:gastos_id', deleteGastos);

// Rutas para usuarios

router.get('/usuarios', getAllUsers);
router.get('/usuarios/:id', getUserById);
router.post('/usuarios', createUser);
router.put('/usuarios/:id', updateUser);
router.patch('/usuarios/:id/password', updateUserPassword);
router.delete('/usuarios/:id', deleteUser);
router.patch('/usuarios/:id/email', updateUserMail);

//Rutas para entrenamientos

router.get('/entrenamientos/categoria/:categoria_id', getAllEntrenamientosByCategoriaId);
router.get('/entrenamientos/:id_horario', getEntrenamientosById);
router.post('/entrenamientos', createEntrenamientos);
router.put('/entrenamientos/:id_horario', updateEntrenamientos);
router.delete('/entrenamientos/:id_horario', deleteEntrenamientos);

// Rutas para pagos
router.get('/pagos/club/:club_id', getAllPagosByClub);
router.post('/pagos', createPago);
router.put('/pagos/:pago_id', updatePago);
router.delete('/pagos/:pago_id', deletePago);

// Rutas para encuentros
router.get('/encuentros/:torneo_id/:categoria_id', getAllEncuentrosByTorneoCategoriaId);
router.get('/encuentros/:encuentro_id', getEncuentroById);
router.post('/encuentros', createEncuentro);
router.put('/encuentros/:encuentro_id', updateEncuentro);
router.delete('/encuentros/:encuentro_id', deleteEncuentro);

//---------rutas para estadisticas
router.get('/estadisticas/torneo/:torneo_id', getEstadisticaByTorneoId);
router.get('/estadisticas/jugador/:jugador_id', getEstadisticaByJugadorId);
router.post('/estadisticas', createEstadistica);
router.put('/estadisticas/:id', updateEstadistica);
router.delete('/estadisticas/:id', deleteEstadistica);


//Rutas para encuentroJugador
router.get('/encuentro-jugador/:encuentro_id', getAllJugadoresByEncuentroId);
router.get('/encuentro-jugador/jugador/:jugador_id', getAllEncuentrosByJugadorId);
router.post('/encuentro-jugador', createEncuentroJugador);
router.put('/encuentro-jugador/:encuentro_jugador_id', updateEncuentroJugador);
router.delete('/encuentro-jugador/:encuentro_jugador_id', deleteEncuentroJugador);

module.exports = router;