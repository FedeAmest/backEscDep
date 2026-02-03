const pool = require('../Utils/Pool');

/* ===============================
   GET planes por club
================================ */
const getAllPlanesByClubModel = async (club_id) => {
  const [rows] = await pool.query(
    `
    SELECT
      pa.plan_afiliacion_id,
      pa.nombre,
      pa.descripcion,
      pa.porcentaje_aplicado,
      pa.es_plan_base,
      pa.activo,

      cfc.monto_base_plan,

      ROUND(
        cfc.monto_base_plan * (pa.porcentaje_aplicado / 100),
        2
      ) AS monto_calculado

    FROM planes_afiliacion pa

    JOIN configuracion_facturacion_club cfc
      ON cfc.club_id = pa.club_id

    WHERE pa.club_id = ?
      AND pa.activo = 1

    ORDER BY pa.es_plan_base DESC, pa.porcentaje_aplicado DESC
    `,
    [club_id]
  );

  return rows;
};
/* ===============================
   GET plan por ID
================================ */
const getPlanByIdModel = async (plan_afiliacion_id, club_id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM planes_afiliacion
    WHERE plan_afiliacion_id = ? AND club_id = ?
    `,
    [plan_afiliacion_id, club_id]
  );
  return rows[0] || null;
};

/* ===============================
   CREATE plan (NO base)
================================ */
const createPlanModel = async (data) => {
  const {
    club_id,
    nombre,
    descripcion,
    porcentaje_aplicado,
    es_plan_base
  } = data;

  const [res] = await pool.query(
    `
    INSERT INTO planes_afiliacion
      (club_id, nombre, descripcion, porcentaje_aplicado, es_plan_base)
    VALUES (?, ?, ?, ?, ?)
    `,
    [club_id, nombre, descripcion, porcentaje_aplicado, es_plan_base]
  );

  return res.insertId;
};

/* ===============================
   UPDATE plan
================================ */
const updatePlanModel = async (plan_afiliacion_id, club_id, data) => {
  const { nombre, descripcion, porcentaje_aplicado, activo } = data;

  await pool.query(
    `
    UPDATE planes_afiliacion
    SET nombre = ?,
        descripcion = ?,
        porcentaje_aplicado = ?,
        activo = ?
    WHERE plan_afiliacion_id = ?
      AND club_id = ?
      AND es_plan_base = 0
    `,
    [
      nombre,
      descripcion,
      porcentaje_aplicado,
      activo,
      plan_afiliacion_id,
      club_id
    ]
  );
};

/* ===============================
   DELETE plan (lógico)
================================ */
const deletePlanModel = async (plan_afiliacion_id, club_id) => {
  await pool.query(
    `
    UPDATE planes_afiliacion
    SET activo = 0
    WHERE plan_afiliacion_id = ?
      AND club_id = ?
      AND es_plan_base = 0
    `,
    [plan_afiliacion_id, club_id]
  );
};

const existsPlanBaseByClubModel = async (club_id) => {
  const [rows] = await pool.query(
    `
    SELECT 1
    FROM planes_afiliacion
    WHERE club_id = ?
      AND es_plan_base = 1
      AND activo = 1
    LIMIT 1
    `,
    [club_id]
  );

  return rows.length > 0;
};


module.exports = {
  getAllPlanesByClubModel,
  getPlanByIdModel,
  createPlanModel,
  updatePlanModel,
  deletePlanModel,
  existsPlanBaseByClubModel
};