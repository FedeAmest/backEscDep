const {
  getEncuentroByIdModel,
  createEncuentroModel,
  updateEncuentroModel,
  deleteEncuentroModel,
  getUltimosEncuentrosByClubModel,
  getDetalleEncuentroModel
} = require('../Models/encuentros');

const { getClubByIdModel } = require('../Models/clubes');

/* =========================
   CREATE (lógica central)
========================= */

const createEncuentro = async (req, res) => {
  const {
    torneo_categoria_id,
    fecha,
    condicion,
    rival,
    goles_local,
    goles_visitante
  } = req.body;

  const club = await getClubByIdModel(req.auth.club_id);
  const nombreClub = club.nombre;

  let equipo_local, equipo_visitante;
  let gl, gv;

  if (condicion === 'local') {
    equipo_local = nombreClub;
    equipo_visitante = rival;
    gl = goles_local;
    gv = goles_visitante;
  } else {
    equipo_local = rival;
    equipo_visitante = nombreClub;
    gl = goles_visitante;
    gv = goles_local;
  }

  let resultado = 'empate';
  if (gl !== gv) {
    const ganoLocal = gl > gv;
    const clubEsLocal = equipo_local === nombreClub;
    resultado =
      (ganoLocal && clubEsLocal) || (!ganoLocal && !clubEsLocal)
        ? 'victoria'
        : 'derrota';
  }

  const encuentro = await createEncuentroModel({
    torneo_categoria_id,
    fecha,
    equipo_local,
    equipo_visitante,
    goles_local: gl,
    goles_visitante: gv,
    resultado
  });

  res.status(201).json(encuentro);
};

/* =========================
   GETs
========================= */

const getEncuentroById = async (req, res) => {
  const encuentro = await getDetalleEncuentroModel(req.params.encuentro_id);
  res.json(encuentro);
};

const getUltimosEncuentrosByClub = async (req, res) => {
  const encuentros = await getUltimosEncuentrosByClubModel(req.auth.club_id);
  res.json(encuentros);
};

/* =========================
   UPDATE / DELETE
========================= */

const updateEncuentro = async (req, res) => {
  await updateEncuentroModel(req.params.encuentro_id, req.body);
  res.json({ updated: true });
};

const deleteEncuentro = async (req, res) => {
  await deleteEncuentroModel(req.params.encuentro_id);
  res.json({ deleted: true });
};

module.exports = {
  createEncuentro,
  getEncuentroById,
  getUltimosEncuentrosByClub,
  updateEncuentro,
  deleteEncuentro
};