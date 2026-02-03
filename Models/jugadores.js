const { get } = require('http');
const pool = require('../Utils/Pool');

/**
 * Jugadores por club (club inferido por categoría)
 */
const getJugadoresByClubModel = async (club_id) => {
  const [rows] = await pool.query(`
    SELECT j.*
    FROM jugadores j
    JOIN categorias c ON c.categoria_id = j.categoria_id
    WHERE c.club_id = ?
    ORDER BY j.jugador_id DESC
  `, [club_id]);

  return rows;
};


/* ===============================
   MAIN PLAYER CARDS POR CLUB
================================ */
const getPlayersMainCardDataByClubIdModel = async (club_id) => {
  const [rows] = await pool.query(`
    SELECT
      j.jugador_id,
      j.nombre,
      j.foto_url,

      TIMESTAMPDIFF(YEAR, j.fecha_nacimiento, CURDATE()) AS edad,

      c.nombre AS categoria_nombre,

      pa.nombre AS plan_nombre,
      ROUND(
        cfc.monto_base_plan * (pa.porcentaje_aplicado / 100),
        2
      ) AS monto_plan,

      pos.categoria_posicion AS posicionTag,
      pos.color AS colorTag

    FROM jugadores j

    JOIN categorias c
      ON c.categoria_id = j.categoria_id
     AND c.club_id = ?

    JOIN configuracion_facturacion_club cfc
      ON cfc.club_id = c.club_id

    LEFT JOIN planes_afiliacion pa
      ON pa.plan_afiliacion_id = j.plan_afiliacion_id

    LEFT JOIN jugadores_posiciones jp
      ON jp.jugador_id = j.jugador_id
     AND jp.orden = 1

    LEFT JOIN posiciones pos
      ON pos.posicion_id = jp.posicion_id

    WHERE j.activo = 1

    ORDER BY j.jugador_id DESC
  `, [club_id]);

  return rows;
};



const searchJugadoresModel = async (club_id, q) => {
  const like = `%${q}%`;

  const [rows] = await pool.query(`
    SELECT j.jugador_id,
     j.nombre,
    j.foto_url, 
    TIMESTAMPDIFF(YEAR, j.fecha_nacimiento, CURDATE()) AS edad,
    c.nombre AS categoria_nombre,
    p.nombre AS plan_nombre,  
    pos.categoria_posicion AS posicionTag,
    pos.color AS colorTag
    

    FROM jugadores j
    JOIN categorias c ON c.categoria_id = j.categoria_id
    LEFT JOIN planes_afiliacion p
      ON p.plan_afiliacion_id = j.plan_afiliacion_id
    LEFT JOIN jugadores_posiciones jp
      ON jp.jugador_id = j.jugador_id
      AND jp.orden = 1
    LEFT JOIN posiciones pos
      ON pos.posicion_id = jp.posicion_id

    WHERE c.club_id = ?
      AND (
        j.nombre LIKE ?
        OR j.dni LIKE ?
      )
    ORDER BY j.nombre ASC, j.jugador_id ASC
    LIMIT 20
  `, [club_id, like, like]);

  return rows;
};

const getJugadoresByPosicionModel = async (club_id, categoria_posicion) => {
  const [rows] = await pool.query(`
    SELECT DISTINCT
      j.jugador_id,
      j.nombre,
      p.categoria_posicion,
      p.color
    FROM jugadores j
    JOIN categorias c ON c.categoria_id = j.categoria_id
    JOIN jugadores_posiciones jp
      ON jp.jugador_id = j.jugador_id
     AND jp.orden = 1
    JOIN posiciones p ON p.posicion_id = jp.posicion_id
    WHERE c.club_id = ?
      AND p.categoria_posicion = ?
    ORDER BY j.nombre ASC, j.jugador_id ASC
  `, [club_id, categoria_posicion]);

  return rows;
};

const getJugadoresOrdenadosModel = async (club_id, dir = 'ASC') => {
  const order =
    dir === 'DESC'
      ? `'delantero','mediocampista','defensor','arquero'`
      : `'arquero','defensor','mediocampista','delantero'`;

  const [rows] = await pool.query(`
    SELECT DISTINCT
      j.jugador_id,
      j.nombre,
      p.categoria_posicion,
      p.color
    FROM jugadores j
    JOIN categorias c ON c.categoria_id = j.categoria_id
    LEFT JOIN jugadores_posiciones jp
      ON jp.jugador_id = j.jugador_id
     AND jp.orden = 1
    LEFT JOIN posiciones p ON p.posicion_id = jp.posicion_id
    WHERE c.club_id = ?
    ORDER BY
      FIELD(p.categoria_posicion, ${order}),
      j.nombre,
      j.jugador_id
  `, [club_id]);

  return rows;
};




//  * Jugadores por categoría
 
const getJugadoresByCategoriaModel = async (categoria_id) => {
  const [rows] = await pool.query(`
    SELECT *
    FROM jugadores
    WHERE categoria_id = ?
    ORDER BY jugador_id DESC
  `, [categoria_id]);

  return rows;
};

/**
 * Jugador por ID (sin club explícito)
 */
const getJugadorByIdModel = async (jugador_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM jugadores WHERE jugador_id = ?`,
    [jugador_id]
  );
  return rows[0] || null;
};

/**
 * Crear jugador
 */
const createJugadorModel = async (data) => {
  const {
    categoria_id,
    dni,
    nombre,
    fecha_nacimiento,
    genero,
    pie_habil,
    mail,
    telefono,
    direccion,
    plan_afiliacion_id,
    foto_url
  } = data;

  const [res] = await pool.query(`
    INSERT INTO jugadores
      (categoria_id, dni, nombre, fecha_nacimiento, genero, pie_habil,
       mail, telefono, direccion, plan_afiliacion_id, foto_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    categoria_id, dni, nombre, fecha_nacimiento, genero,
    pie_habil, mail, telefono, direccion, plan_afiliacion_id, foto_url
  ]);

  return { jugador_id: res.insertId };
};


const updateJugadorModel = async (jugador_id, data) => {
  const {
    categoria_id,
    dni,
    nombre,
    fecha_nacimiento,
    genero,
    pie_habil,
    mail,
    telefono,
    direccion,
    plan_afiliacion_id,
    foto_url,
    activo
  } = data;

  await pool.query(`
    UPDATE jugadores
    SET categoria_id = ?, dni = ?, nombre = ?, fecha_nacimiento = ?,
        genero = ?, pie_habil = ?, mail = ?, telefono = ?, direccion = ?,
        plan_afiliacion_id = ?, foto_url = ?, activo = ?
    WHERE jugador_id = ?
  `, [
    categoria_id, dni, nombre, fecha_nacimiento, genero,
    pie_habil, mail, telefono, direccion,
    plan_afiliacion_id, foto_url, activo, jugador_id
  ]);

  return getJugadorByIdModel(jugador_id);
};


const deleteJugadorModel = async (jugador_id) => {
  const [res] = await pool.query(
    `DELETE FROM jugadores WHERE jugador_id = ?`,
    [jugador_id]
  );
  return res.affectedRows > 0;
};

const getMainPlayerCardDataModel = async (jugador_id) => {
  const [rows] = await pool.query(`
    SELECT
      j.jugador_id,
      j.nombre,
      j.foto_url,

      TIMESTAMPDIFF(YEAR, j.fecha_nacimiento, CURDATE()) AS edad,

      c.nombre AS categoria_nombre,

      pa.nombre AS plan_nombre,
      ROUND(
        cfc.monto_base_plan * (pa.porcentaje_aplicado / 100),
        2
      ) AS monto_plan,

      pos.categoria_posicion AS posicionTag,
      pos.color AS colorTag

    FROM jugadores j

    JOIN categorias c
      ON c.categoria_id = j.categoria_id

    JOIN configuracion_facturacion_club cfc
      ON cfc.club_id = c.club_id

    LEFT JOIN planes_afiliacion pa
      ON pa.plan_afiliacion_id = j.plan_afiliacion_id

    LEFT JOIN jugadores_posiciones jp
      ON jp.jugador_id = j.jugador_id
     AND jp.orden = 1

    LEFT JOIN posiciones pos
      ON pos.posicion_id = jp.posicion_id

    WHERE j.jugador_id = ?
  `, [jugador_id]);

  return rows[0] || null;
};

async function getJugadorDeportivoModel(jugador_id) {

  // 1️⃣ Datos base
  const [[jugador]] = await pool.query(`
    SELECT
      j.fecha_alta,
      j.jugador_id,
      j.nombre,
      j.activo AS estado,
      c.nombre AS categoria,
      j.fecha_nacimiento,
      TIMESTAMPDIFF(YEAR, j.fecha_nacimiento, CURDATE()) AS edad,
      j.pie_habil,
      j.altura,
      j.peso,
      j.fecha_alta,
      j.foto_url
    FROM jugadores j
    JOIN categorias c
      ON c.categoria_id = j.categoria_id
    WHERE j.jugador_id = ?
  `, [jugador_id]);

  if (!jugador) return null;

  // 2️⃣ Posiciones
  const [posiciones] = await pool.query(`
    SELECT
      p.sigla AS codigo,
      p.nombre,
      jp.orden
    FROM jugadores_posiciones jp
    JOIN posiciones p
      ON p.posicion_id = jp.posicion_id
    WHERE jp.jugador_id = ?
  `, [jugador_id]);

  // 3️⃣ Asistencia
  const [[posibles]] = await pool.query(`
    SELECT COUNT(*) AS posibles
    FROM entrenamientos
    WHERE fecha >= ?
  `, [jugador.fecha_alta]);

  const [[asistidos]] = await pool.query(`
    SELECT COUNT(*) AS asistidos
    FROM asistencias_entrenamiento
    WHERE jugador_id = ?
      AND fecha >= ?
  `, [jugador_id, jugador.fecha_alta]);

  // 4️⃣ Estadísticas
  const [[estadisticas]] = await pool.query(`
  SELECT
    COUNT(*)                               AS partidos,
    COALESCE(SUM(minutos_jugados), 0)      AS minutos,
    COALESCE(SUM(goles), 0)                AS goles,
    COALESCE(SUM(asistencias), 0)          AS asistencias,
    COALESCE(SUM(tarjeta_amarilla), 0)     AS tarjetas_amarillas,
    COALESCE(SUM(tarjeta_roja), 0)          AS tarjetas_rojas,
    COALESCE(AVG(calificacion), 0)         AS calificacion_promedio
  FROM estadisticas_jugadores
  WHERE jugador_id = ?
`, [jugador_id]);

  return {
    jugador: {
      fecha_alta: jugador.fecha_alta,
      jugador_id: jugador.jugador_id,
      nombre: jugador.nombre,
      estado: jugador.estado,
      categoria: jugador.categoria,
      fecha_nacimiento: jugador.fecha_nacimiento,
      edad: jugador.edad,
      pie_habil: jugador.pie_habil,
      altura: jugador.altura,
      peso: jugador.peso,
      foto_url: jugador.foto_url
    },
    posiciones: {
      principal: posiciones.find(p => p.orden === 1)?.codigo || null,
      secundarias: posiciones
        .filter(p => p.orden !== 1)
        .map(p => p.codigo)
    },
    asistencia: {
      asistidos: asistidos.asistidos,
      posibles: posibles.posibles
    },
    estadisticas
  };
}




async function getJugadorContactoModel(jugador_id) {
  const [[data]] = await pool.query(`
    SELECT
      j.jugador_id,

      /* ===== JUGADOR ===== */
      j.nombre        AS jugador_nombre,
      j.dni           AS jugador_dni,
      j.mail          AS jugador_email,
      j.telefono      AS jugador_telefono,
      j.direccion     AS jugador_direccion,
      j.fecha_alta    AS jugador_fecha_alta,

      /* ===== TUTOR (opcional) ===== */
      t.tutor_id,
      t.nombre        AS tutor_nombre,
      t.dni           AS tutor_dni,
      t.telefono      AS tutor_telefono,
      t.email         AS tutor_email,
      t.direccion     AS tutor_direccion,

      /* ===== RELACIÓN ===== */
      jt.parentesco   AS tutor_parentesco,

      /* ===== FLAG FRONT ===== */
      CASE
        WHEN t.tutor_id IS NULL THEN 0
        ELSE 1
      END AS tiene_tutor

    FROM jugadores j

    LEFT JOIN jugadores_tutores jt
      ON jt.jugador_id = j.jugador_id

    LEFT JOIN tutores t
      ON t.tutor_id = jt.tutor_id

    WHERE j.jugador_id = ?
  `, [jugador_id]);

  return data || null;
}


async function getJugadorEstadoCuentaModel(jugador_id) {

/* =========================
 * 1️⃣ PLAN + DESCUENTOS
 * ========================= */
const [[plan]] = await pool.query(`
  SELECT
    pa.nombre AS plan_nombre,

    cfc.monto_base_plan AS monto_base,

    IFNULL(pa.porcentaje_aplicado, 0) AS descuento_plan,
    IFNULL(dj.porcentaje_descuento, 0) AS descuento_jugador

  FROM jugadores j

  JOIN categorias cat
    ON cat.categoria_id = j.categoria_id

  JOIN configuracion_facturacion_club cfc
    ON cfc.club_id = cat.club_id
   AND cfc.activo = 1

  JOIN planes_afiliacion pa
    ON pa.plan_afiliacion_id = j.plan_afiliacion_id

  LEFT JOIN descuentos_jugadores dj
    ON dj.jugador_id = j.jugador_id
   AND dj.activo = 1

  WHERE j.jugador_id = ?
`, [jugador_id]);

if (!plan) return null;

const descuento_total =
  plan.descuento_plan + plan.descuento_jugador;

const monto_final =
  Math.max(
    plan.monto_base * (1 - descuento_total / 100),
    0
  );

/* =========================
 * 2️⃣ ESTADO GENERAL DE CUENTA
 * ========================= */
const [[estadoCuenta]] = await pool.query(`
  SELECT
    SUM(CASE WHEN cj.estado = 'pendiente' THEN cj.monto ELSE 0 END) AS deuda,
    SUM(CASE WHEN cj.estado = 'pagado' THEN cj.monto ELSE 0 END)    AS pagado
  FROM cargos_jugadores cj
  WHERE cj.jugador_id = ?
`, [jugador_id]);

/* =========================
 * 3️⃣ ÚLTIMOS INGRESOS (PAGOS)
 * ========================= */
const [pagos] = await pool.query(`
  SELECT
    i.ingreso_id,
    i.fecha,
    i.monto,
    i.metodo_pago,
    i.referencia
  FROM ingresos i
  WHERE i.jugador_id = ?
    AND i.activo = 1
  ORDER BY i.fecha DESC
  LIMIT 5
`, [jugador_id]);

/* =========================
 * 4️⃣ LISTA DE CARGOS
 * ========================= */
const [cargos] = await pool.query(`
  SELECT
    cj.cargo_jugador_id,
    c.nombre              AS concepto,
    cj.monto,
    cj.estado,
    cj.cuota_numero,
    cj.cuotas_totales,
    cj.creado_en
  FROM cargos_jugadores cj
  JOIN cargos c
    ON c.cargo_id = cj.cargo_id
  WHERE cj.jugador_id = ?
  ORDER BY cj.creado_en DESC
`, [jugador_id]);

return {
  plan: {
    nombre: plan.plan_nombre,
    monto_base: plan.monto_base,
    descuento_total,
    monto_final
  },
  estado_cuenta: {
    deuda: estadoCuenta.deuda || 0,
    pagado: estadoCuenta.pagado || 0
  },
  ultimos_pagos: pagos,
  cargos
};
}


module.exports = {
  getJugadorEstadoCuentaModel,
  getJugadorContactoModel,
  getJugadorDeportivoModel,
  getJugadoresByPosicionModel,
  getJugadoresByClubModel,
  getJugadoresOrdenadosModel,
  getPlayersMainCardDataByClubIdModel,
  searchJugadoresModel,
  getJugadoresByCategoriaModel,
  getJugadorByIdModel,
  getMainPlayerCardDataModel,
  createJugadorModel,
  updateJugadorModel,
  deleteJugadorModel
};