const clubUsersModel = require("../Models/usuariosClubes");

const VALID_ROLES = ["admin", "colaborador", "administrativo", "deportivo"];

/* ===============================
   LISTAR USUARIOS DEL CLUB
================================ */
const listClubUsers = async (req, res) => {
  try {
    const { club_id } = req.auth;

    const users = await clubUsersModel.getUsuariosByClubModel(club_id);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al listar usuarios del club" });
  }
};

/* ===============================
   ASIGNAR USUARIO AL CLUB
================================ */
const createClubUser = async (req, res) => {
  try {
    const { club_id } = req.auth;
    const { user_id, tipo } = req.body;

    if (!user_id || !VALID_ROLES.includes(tipo)) {
      return res.status(400).json({ error: "Datos inválidos" });
    }

    const result = await clubUsersModel.assignUserToClub(
      user_id,
      club_id,
      tipo
    );

    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ error: "Error al asignar usuario" });
  }
};

/* ===============================
   ACTUALIZAR ROL
================================ */
const updateRoleClubUser = async (req, res) => {
  try {
    const { club_id } = req.auth;
    const { usuario_club_id } = req.params;
    const { tipo } = req.body;

    if (!VALID_ROLES.includes(tipo)) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    const updated = await clubUsersModel.updateRole(
      usuario_club_id,
      club_id,
      tipo
    );

    if (!updated) {
      return res.status(404).json({ error: "Relación no encontrada" });
    }

    res.json({ message: "Rol actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar rol" });
  }
};

/* ===============================
   DESACTIVAR USUARIO
================================ */
const removeClubUser = async (req, res) => {
  try {
    const { club_id } = req.auth;
    const { usuario_club_id } = req.params;

    const removed = await clubUsersModel.deactivate(
      usuario_club_id,
      club_id
    );

    if (!removed) {
      return res.status(404).json({ error: "Relación no encontrada" });
    }

    res.json({ message: "Usuario removido del club" });
  } catch (error) {
    res.status(500).json({ error: "Error al remover usuario" });
  }
};

const { getUserClubContextModel } = require("../Models/usuarioClubContext");
 const getMyClubContext = async (req, res) => {
  try {
    console.log("entrando a controller getMyClubContext");
    const { user_id, club_id } = req.auth;

    const context = await getUserClubContextModel(user_id, club_id);
    console.log('User club context:', context);
    if (!context) {
      return res.status(403).json({
        message: 'El usuario no pertenece a este club'
      });
    }
    console.log("saliendo bien del controller getMyClubContext");
    console.log(user_id, club_id, context.tipo);
    res.json({
      user_id,
      club_id,
      tipo: context.tipo
    });

  } catch (error) {
    console.error('getMyClubContext error:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getMyClubContext,
  listClubUsers,
  createClubUser,
  updateRoleClubUser,
  removeClubUser
};
