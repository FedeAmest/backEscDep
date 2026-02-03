const {
  getAllPlanesByClubModel,
  getPlanByIdModel,
  createPlanModel,
  updatePlanModel,
  deletePlanModel
} = require('../Models/planesAfiliacion');

/* ===============================
   GET all
================================ */
const getAllPlanes = async (req, res) => {
  const { club_id } = req.auth;
  const planes = await getAllPlanesByClubModel(club_id);
  res.json(planes);
};

/* ===============================
   GET by ID
================================ */
const getPlanById = async (req, res) => {
  const { club_id } = req.auth;
  const { id } = req.params;

  const plan = await getPlanByIdModel(id, club_id);
  if (!plan) {
    return res.status(404).json({ message: 'Plan no encontrado' });
  }

  res.json(plan);
};

/* ===============================
   CREATE
================================ */
const createPlan = async (req, res) => {
  const { club_id } = req.auth;
  const {
    nombre,
    descripcion,
    porcentaje_aplicado,
    es_plan_base = 0
  } = req.body;

  // Validar porcentaje
  if (porcentaje_aplicado < 0 || porcentaje_aplicado > 100) {
    return res.status(400).json({
      message: 'El porcentaje debe estar entre 0 y 100'
    });
  }

  // 🔒 Regla: solo un plan base por club
  if (es_plan_base) {
    const alreadyExists = await existsPlanBaseByClubModel(club_id);

    if (alreadyExists) {
      return res.status(409).json({
        message: 'El club ya tiene un plan base'
      });
    }
  }

  const id = await createPlanModel({
    club_id,
    nombre,
    descripcion,
    porcentaje_aplicado,
    es_plan_base
  });

  res.status(201).json({ plan_afiliacion_id: id });
};

/* ===============================
   UPDATE
================================ */
const updatePlan = async (req, res) => {
  const { club_id } = req.auth;
  const { id } = req.params;

  const plan = await getPlanByIdModel(id, club_id);
  if (!plan) {
    return res.status(404).json({ message: 'Plan no encontrado' });
  }

  if (plan.es_plan_base) {
    return res.status(403).json({
      message: 'El plan base no puede modificarse desde aquí'
    });
  }

  await updatePlanModel(id, club_id, req.body);
  res.json({ message: 'Plan actualizado' });
};

/* ===============================
   DELETE
================================ */
const deletePlan = async (req, res) => {
  const { club_id } = req.auth;
  const { id } = req.params;

  const plan = await getPlanByIdModel(id, club_id);
  if (!plan) {
    return res.status(404).json({ message: 'Plan no encontrado' });
  }

  if (plan.es_plan_base) {
    return res.status(403).json({
      message: 'El plan base no puede eliminarse'
    });
  }

  await deletePlanModel(id, club_id);
  res.json({ message: 'Plan desactivado' });
};

module.exports = {
  getAllPlanes,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
};