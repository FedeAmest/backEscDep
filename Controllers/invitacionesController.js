const crypto = require('crypto');
const invitacionesModel = require('../Models/invitaciones');

const createInvitacion = async (req, res) => {
    console.log('createInvitacion called with body:', req.body);
    console.log('req.auth:', req.auth);
    console.log('req.userContext:', req.userContext);   
  const { club_id } = req.auth;
  const { email, tipo } = req.body;

  const token = crypto.randomBytes(32).toString('hex');

  await invitacionesModel.createInvitacion({
    email,
    club_id,
    tipo,
    token
  });

  res.status(201).json({ message: 'Invitación creada', token });
};

const listInvitaciones = async (req, res) => {
  const { club_id } = req.userContext;
  const invitaciones = await invitacionesModel.listByClub(club_id);
  res.json(invitaciones);
};

const validateInvitacion = async (req, res) => {
    console.log('validateInvitacion called with params:', req.params);
  const { token } = req.params;
  const invitacion = await invitacionesModel.getByToken(token);
  console.log('Found invitacion:', invitacion);

  if (!invitacion) {
    return res.status(404).json({ error: 'Invitación inválida o expirada' });
  }

  res.json(invitacion);
};

const cancelInvitacion = async (req, res) => {
  const { club_id } = req.userContext;
  const { invitacion_id } = req.params;

  const ok = await invitacionesModel.cancelInvitacion(invitacion_id, club_id);
  if (!ok) {
    return res.status(404).json({ error: 'Invitación no encontrada' });
  }

  res.json({ message: 'Invitación cancelada' });
};

module.exports = {
  createInvitacion,
  listInvitaciones,
  validateInvitacion,
  cancelInvitacion
};