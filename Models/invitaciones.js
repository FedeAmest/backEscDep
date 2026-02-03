const pool = require('../Utils/Pool');

const createInvitacion = async ({ email, club_id, tipo, token }) => {
  const [res] = await pool.query(
    `INSERT INTO invitaciones (email, club_id, tipo, token)
     VALUES (?, ?, ?, ?)`,
    [email, club_id, tipo, token]
  );
  return { invitacion_id: res.insertId };
};

const getByToken = async (token) => {
  const [rows] = await pool.query(
    `SELECT * FROM invitaciones
     WHERE token = ? AND estado = 'pendiente'`,
    [token]
  );
  return rows[0] || null;
};

const getInviteByTokenModel = async (token) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM invitaciones
    WHERE token = ?
    `,
    [token]
  );
  return rows[0] || null;
};

const markInviteAsAcceptedModel = async (invitationId) => {
  await pool.query(
    `
    UPDATE invitaciones
    SET estado = 'aceptada',
        aceptada_en = NOW()
    WHERE invitacion_id = ?
    `,
    [invitationId]
  );
};


const listByClub = async (club_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM invitaciones
     WHERE club_id = ?
     ORDER BY creada_en DESC`,
    [club_id]
  );
  return rows;
};

const cancelInvitacion = async (invitacion_id, club_id) => {
  const [res] = await pool.query(
    `UPDATE invitaciones
     SET estado = 'cancelada'
     WHERE invitacion_id = ? AND club_id = ?`,
    [invitacion_id, club_id]
  );
  return res.affectedRows > 0;
};

module.exports = {

  createInvitacion,
  getByToken,
  getInviteByTokenModel,
  markInviteAsAcceptedModel,
  listByClub,
  cancelInvitacion
};