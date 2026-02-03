const {
  getJugadorEstadoCuentaModel,
  getJugadorContactoModel,
  getJugadorDeportivoModel,
  getPlayersMainCardDataByClubIdModel,
  getJugadoresByPosicionModel,
  getJugadoresOrdenadosModel,
  searchJugadoresModel,
  getJugadoresByClubModel,
  getJugadoresByCategoriaModel,
  getJugadorByIdModel,
  getMainPlayerCardDataModel,
  createJugadorModel,
  updateJugadorModel,
  deleteJugadorModel

} = require('../Models/jugadores');

const {
  getPosicionesByJugadorModel,
  getPosicionPrincipalModel
} = require('../Models/jugadoresPosiciones');

const getJugadoresByClub = async (req, res) => {
  const { club_id } = req.auth;
  const jugadores = await getJugadoresByClubModel(club_id);
  res.json(jugadores);
};


const searchJugadores = async (req, res) => {
  console.log('searchJugadores called');
  console.log('searchJugadores called with query:', req.query);
  const { q = '' } = req.query;
  const { club_id } = req.auth;

  if (!q.trim()) return res.json([]);

  const jugadores = await searchJugadoresModel(club_id, q.trim());
  res.json(jugadores);
};

const getJugadoresByPosicion = async (req, res) => {
  const { categoria_posicion } = req.params;
  const { club_id } = req.auth;

  const jugadores = await getJugadoresByPosicionModel(
    club_id,
    categoria_posicion
  );

  res.json(jugadores);
};

const getJugadoresOrdenados = async (req, res) => {
  const { dir = 'ASC' } = req.query;
  const { club_id } = req.auth;

  const jugadores = await getJugadoresOrdenadosModel(club_id, dir);
  res.json(jugadores);
};


const getPlayersMainCardsByClub = async (req, res) => {
  const { club_id } = req.auth;

  const players = await getPlayersMainCardDataByClubIdModel(club_id);
  res.json(players);
};


const getJugadoresByCategoria = async (req, res) => {
  const { categoria_id } = req.params;
  const jugadores = await getJugadoresByCategoriaModel(categoria_id);
  res.json(jugadores);
};

const getJugadorById = async (req, res) => {
  const { jugador_id } = req.params;
  const jugador = await getJugadorByIdModel(jugador_id);
  res.json(jugador);
};

const getJugadorConPosiciones = async (req, res) => {
  const { jugador_id } = req.params;

  const jugador = await getJugadorByIdModel(jugador_id);
  const posiciones = await getPosicionesByJugadorModel(jugador_id);
  const posicion_principal = await getPosicionPrincipalModel(jugador_id);

  res.json({
    ...jugador,
    posiciones,
    posicion_principal
  });
};

const getMainPlayerCardData = async (req, res) => {
  const { jugador_id } = req.params;
  const jugador = await getMainPlayerCardDataModel(jugador_id);
  res.status(201).json(jugador);
}

const createJugador = async (req, res) => {
  const jugador = await createJugadorModel(req.body);
  res.status(201).json(jugador);
};

const updateJugador = async (req, res) => {
  const { jugador_id } = req.params;
  const jugador = await updateJugadorModel(jugador_id, req.body);
  res.json(jugador);
};

const deleteJugador = async (req, res) => {
  const { jugador_id } = req.params;
  const deleted = await deleteJugadorModel(jugador_id);
  res.json({ deleted });
};



async function getJugadorDeportivo(req, res) {
  try {
    const { jugador_id } = req.params;

    const data = await getJugadorDeportivoModel(jugador_id);
    if (!data) {
      return res.status(404).json({ error: 'Jugador no encontrado' });
    }

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener información deportiva' });
  }
}

async function getJugadorContacto(req, res) {
  try {
    const { jugador_id } = req.params;

    const data = await getJugadorContactoModel(jugador_id);

    if (!data) {
      return res.status(404).json({
        error: 'Jugador no encontrado'
      });
    }

    res.json(data);

  } catch (error) {
    console.error('Error getJugadorContacto:', error);
    res.status(500).json({
      error: 'Error al obtener contacto del jugador'
    });
  }
}


async function getJugadorEstadoCuenta(req, res) {
  try {
    console.log('getJugadorEstadoCuenta called');
    console.log('Params:', req.params);
    const { jugador_id } = req.params;

    
    const data = await getJugadorEstadoCuentaModel(jugador_id);

    if (!data) {
      return res.status(404).json({
        error: 'Estado de cuenta no encontrado'
      });
    }

    res.json(data);

  } catch (error) {
    console.error('Error estado de cuenta:', error);
    res.status(500).json({
      error: 'Error al obtener estado de cuenta'
    });
  }
}



module.exports = {
  getJugadorEstadoCuenta,
  getJugadorContacto,
  getJugadorDeportivo,
  getPlayersMainCardsByClub,
  getJugadoresByPosicion,
  getJugadoresOrdenados,
  searchJugadores,
  getJugadoresByClub,
  getJugadoresByCategoria,
  getJugadorById,
  getMainPlayerCardData,
  getJugadorConPosiciones,
  createJugador,
  updateJugador,
  deleteJugador

};