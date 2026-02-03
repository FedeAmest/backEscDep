const pool = require('../Utils/Pool');


const getAllHorariosByCategoriaIdModel = async (categoria_id, club_id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM horarios_entrenamiento
    WHERE categoria_id = ?
      AND club_id = ?
    ORDER BY FIELD(dia_semana,
      'lunes','martes','miercoles','jueves','viernes','sabado','domingo'
    ), hora_inicio
    `,
    [categoria_id, club_id]
  );
  return rows;
};


const getHorarioByIdModel = async (horario_id, club_id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM horarios_entrenamiento
    WHERE id = ?
      AND club_id = ?
    `,
    [horario_id, club_id]
  );
  return rows[0];
};


const createHorarioModel = async (data) => {
  const {
    categoria_id,
    dia_semana,
    hora_inicio,
  } = data;

  const [result] = await pool.query(
    `
    INSERT INTO horarios_entrenamiento
    (categoria_id, club_id, dia_semana, hora_inicio)
    VALUES (?, ?, ?, ?)
    `,
    [categoria_id, club_id, dia_semana, hora_inicio]
  );

  return result.insertId;

};

const updateHorarioModel = async (horario_id, data) => {
  const {
    dia_semana,
    hora_inicio,
    hora_fin
  } = data;

  await pool.query(
    `
    UPDATE horarios_entrenamiento
    SET
      dia_semana = ?,
      hora_inicio = ?,
      hora_fin = ?
    WHERE id = ?
    `,
    [dia_semana, hora_inicio, hora_fin, horario_id]
  );
};


const deleteHorarioModel = async (horario_id) => {
  await pool.query(
    `
    DELETE FROM horarios_entrenamiento
    WHERE id = ?
    `,
    [horario_id]
  );
};

const createManyHorariosModel = async ({ categoria_id, horarios }) => {
  const values = horarios.map(h => ([
    categoria_id,
    h.day,
    h.time
  ]));

  const [result] = await pool.query(
    `
    INSERT INTO horarios_entrenamiento
    (categoria_id, dia_semana, hora_inicio)
    VALUES ?
    `,
    [values]
  );

  return result.affectedRows;
};
module.exports = {
  getAllHorariosByCategoriaIdModel,
  getHorarioByIdModel,
  createHorarioModel,
  updateHorarioModel,
  deleteHorarioModel,
  createManyHorariosModel
};