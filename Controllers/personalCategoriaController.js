const {
  getCategoriasByUsuarioModel,
  getUsuariosByCategoriaModel,
  createCategoriaUsuarioModel,
  updatePersonalCategoriaModel,
  deletePersonalCategoriaModel
} = require('../Models/personalCategoria');

const { getPersonalDeportivoByClubModel } = require('../Models/usuariosClubes');

/* ===============================
   GET personal deportivo del club
   (para asignar a categoria)
================================ */
const getPersonalByClub = async (req, res) => {
  try {
    const { club_id } = req.auth;

    const personal = await getPersonalDeportivoByClubModel(club_id);
    res.json(personal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


/* ===============================
   GET categorias por usuario
================================ */
const getCategoriasByUsuario = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { club_id } = req.auth;

    const categorias = await getCategoriasByUsuarioModel(user_id, club_id);
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/* ===============================
   GET usuarios por categoria
================================ */
const getUsuariosByCategoria = async (req, res) => {
  try {
    const { categoria_id } = req.params;
    const { club_id } = req.auth;

    const usuarios = await getUsuariosByCategoriaModel(categoria_id, club_id);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/* ===============================
   CREATE
================================ */
const createCategoriaUsuario = async (req, res) => {
  try {
    console.log("reqBody recibido",req.body);
    console.log(req.auth);
    const { categoria_id, user_id, role } = req.body;
    const { club_id } = req.auth;

    const created = await createCategoriaUsuarioModel({
      categoria_id,
      user_id,
      club_id,
      role
    });

    if (created === null) {
      return res.status(403).json({ error: 'El usuario no pertenece al club' });
    }

    if (created === false) {
      return res.status(409).json({ error: 'Ya existe la asignación' });
    }

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/* ===============================
   UPDATE ROLE
================================ */
const updatePersonalCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const ok = await updatePersonalCategoriaModel(id, role);

    if (!ok) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }

    res.json({ message: 'Rol actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/* ===============================
   DELETE
================================ */
const deletePersonalCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deletePersonalCategoriaModel(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }

    res.json({ message: 'Asignación eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getCategoriasByUsuario,
  getUsuariosByCategoria,
  getPersonalByClub,
  createCategoriaUsuario,
  updatePersonalCategoria,
  deletePersonalCategoria
};