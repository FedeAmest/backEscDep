const {
  getAllIngresosByClubModel,
  createIngresoModel,
  updateIngresoModel,
  deleteIngresoModel
} = require('../Models/ingresos');

const getAllIngresosByClub = async (req, res) => {
  try {
    const { club_id } = req.auth;
    const ingresos = await getAllIngresosByClubModel(club_id);
    res.json(ingresos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  }
};

const createIngreso = async (req, res) => {
  try {
    const { club_id, user_id } = req.auth;

    const ingreso = await createIngresoModel({
      ...req.body,
      club_id,
      creado_por: user_id
    });

    res.status(201).json(ingreso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear ingreso' });
  }
};

const updateIngreso = async (req, res) => {
  try {
    const { ingreso_id } = req.params;
    await updateIngresoModel(ingreso_id, req.body);
    res.json({ message: 'Ingreso actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar ingreso' });
  }
};

const deleteIngreso = async (req, res) => {
  try {
    const { ingreso_id } = req.params;
    const ok = await deleteIngresoModel(ingreso_id);
    if (!ok) return res.status(404).json({ error: 'Ingreso no encontrado' });
    res.json({ message: 'Ingreso eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar ingreso' });
  }
};

module.exports = {
  getAllIngresosByClub,
  createIngreso,
  updateIngreso,
  deleteIngreso
};