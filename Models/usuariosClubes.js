const pool = require("../Utils/Pool");




/* ===============================
   PERSONAL DEPORTIVO POR CLUB
================================ */
const getPersonalDeportivoByClubModel = async (club_id) => {
  const [rows] = await pool.query(`
    SELECT
      u.user_id,
      u.nombre,
      u.email
    FROM usuarios_clubes uc
    JOIN usuarios u ON u.user_id = uc.user_id
    WHERE uc.club_id = ?
      AND uc.tipo = 'deportivo'
      AND uc.activo = 1
    ORDER BY u.nombre
  `, [club_id]);

  return rows;
};


/* ===============================
   CONTEXTO USUARIO / CLUB
================================ */
const getUsuarioClubByUserIdModel = async (user_id, club_id) => {
  const [rows] = await pool.query(`
    SELECT usuario_club_id, user_id, club_id, tipo, activo
    FROM usuarios_clubes
    WHERE user_id = ?
      AND club_id = ?
      AND activo = 1
  `, [user_id, club_id]);

  return rows[0] || null;
};

/* ===============================
   USUARIOS POR CLUB
================================ */
const getUsuariosByClubModel = async (club_id) => {
  const [rows] = await pool.query(`
    SELECT
      uc.usuario_club_id,
      u.user_id,
      u.nombre,
      u.email,
      uc.tipo,
      uc.activo,
      uc.fecha_asignacion
    FROM usuarios_clubes uc
    JOIN usuarios u ON u.user_id = uc.user_id
    WHERE uc.club_id = ?
      AND uc.activo = 1
  `, [club_id]);

  return rows;
};

/* ===============================
   ASIGNAR / REACTIVAR USUARIO
================================ */
const assignUserToClub = async (userId, clubId, tipo) => {
  const [existing] = await pool.query(`
    SELECT usuario_club_id, activo
    FROM usuarios_clubes
    WHERE user_id = ? AND club_id = ?
  `, [userId, clubId]);

  if (existing.length > 0) {
    if (existing[0].activo) {
      return {
        status: 409,
        message: "El usuario ya pertenece al club"
      };
    }

    await pool.query(`
      UPDATE usuarios_clubes
      SET tipo = ?, activo = 1
      WHERE user_id = ? AND club_id = ?
    `, [tipo, userId, clubId]);

    return {
      status: 200,
      message: "Usuario reactivado en el club"
    };
  }

  await pool.query(`
    INSERT INTO usuarios_clubes
      (user_id, club_id, tipo, activo, fecha_asignacion)
    VALUES (?, ?, ?, 1, NOW())
  `, [userId, clubId, tipo]);

  return {
    status: 201,
    message: "Usuario asignado al club"
  };
};

/* ===============================
   ACTUALIZAR ROL
================================ */
const updateRole = async (usuarioClubId, clubId, tipo) => {
  const [res] = await pool.query(`
    UPDATE usuarios_clubes
    SET tipo = ?
    WHERE usuario_club_id = ?
      AND club_id = ?
  `, [tipo, usuarioClubId, clubId]);

  return res.affectedRows > 0;
};

/* ===============================
   DESACTIVAR (DELETE LOGICO)
================================ */
const deactivate = async (usuarioClubId, clubId) => {
  const [res] = await pool.query(`
    UPDATE usuarios_clubes
    SET activo = 0
    WHERE usuario_club_id = ?
      AND club_id = ?
  `, [usuarioClubId, clubId]);

  return res.affectedRows > 0;
};

module.exports = {
  getPersonalDeportivoByClubModel,
  getUsuarioClubByUserIdModel,
  getUsuariosByClubModel,
  assignUserToClub,
  updateRole,
  deactivate
};
