const {
  getTutorByDniModel,
  getTutorByIdModel,
  getTutoresByJugadorIdModel,
  createTutorModel,
  linkTutorJugadorModel,
  updateTutorModel,
  deleteTutorModel
} = require('../Models/tutores');

/**
 * Buscar tutor por DNI (autocompletar formulario)
 */
const getTutorByDni = async (req, res) => {
  const { dni } = req.params;
  const { club_id } = req.auth; // asumido desde middleware auth

  const tutor = await getTutorByDniModel(club_id, dni);

  if (!tutor) {
    return res.status(404).json({ exists: false });
  }

  res.json({ exists: true, tutor });
};

/**
 * Obtener tutor por ID
 */
const getTutorById = async (req, res) => {
  const tutor = await getTutorByIdModel(req.params.id);
  if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
  res.json(tutor);
};

/**
 * Obtener tutores de un jugador
 */
const getTutoresByJugadorId = async (req, res) => {
  const tutores = await getTutoresByJugadorIdModel(req.params.id);
  res.json(tutores);
};

/**
 * Crear tutor y vincularlo a jugador
 */
const createTutor = async (req, res) => {
  const { jugador_id, parentesco, ...tutorData } = req.body;

  
  tutorData.club_id = req.auth.club_id;

  const newTutor = await createTutorModel(tutorData);

  await linkTutorJugadorModel({
    jugador_id,
    tutor_id: newTutor.tutor_id,
    parentesco
  });

  res.status(201).json(newTutor);
};

/**
 * Vincular tutor existente a jugador
 */
const linkTutorJugador = async (req, res) => {
  const { jugador_id, tutor_id, parentesco } = req.body;

  await linkTutorJugadorModel({ jugador_id, tutor_id, parentesco });

  res.status(201).json({ linked: true });
};

const updateTutor = async (req, res) => {
  const tutor = await updateTutorModel(req.params.id, req.body);
  if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
  res.json(tutor);
};

const deleteTutor = async (req, res) => {
  const deleted = await deleteTutorModel(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Tutor not found' });
  res.json({ deleted: true });
};


module.exports = {
  getTutorByDni,
  getTutorById,
  getTutoresByJugadorId,
  createTutor,
  linkTutorJugador,
  updateTutor,
  deleteTutor
};