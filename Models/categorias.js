const pool = require('../Utils/Pool');


const getAllModel = async (club_id) => {
  const [rows] = await pool.query(`
    SELECT
      c.categoria_id,
      c.nombre AS nombre,
      c.profesor,
      c.genero,
      club.nombre AS club,
      GROUP_CONCAT(
        CONCAT(h.dia_semana, ' ', h.hora_inicio)
        ORDER BY
          FIELD(
            h.dia_semana,
            'lunes','martes','miercoles','jueves','viernes','sabado','domingo'
          ),
          h.hora_inicio
        SEPARATOR ', '
      ) AS entrenamientos,
      COALESCE(j.jugadores, 0) AS jugadores,
      COALESCE(t.torneos, 0) AS torneos

    FROM categorias c
    JOIN clubes club
      ON club.club_id = c.club_id
    LEFT JOIN horarios_entrenamiento h
      ON h.categoria_id = c.categoria_id
    LEFT JOIN (
      SELECT categoria_id, COUNT(*) AS jugadores
      FROM jugadores
      GROUP BY categoria_id
    ) j
      ON j.categoria_id = c.categoria_id
    LEFT JOIN (
      SELECT categoria_id, COUNT(*) AS torneos
      FROM torneos_categorias
      GROUP BY categoria_id
    ) t
      ON t.categoria_id = c.categoria_id
    WHERE c.club_id = ?
    GROUP BY
      c.categoria_id,
      c.nombre,
      c.profesor,
      c.genero,
      club.nombre
  `, [club_id]);

  return rows;
};


// CREAR CATEGORIA RELACIONADA A UN CLUB
const createCategoryModel = async (data) => {
  const { nombre, profesor, genero, club_id } = data;
  console.log("data recibida", data);
  const [result] = await pool.query(`INSERT INTO categorias (nombre, profesor, genero, club_id)
                                      VALUES (?, ?, ?, ?)`, [nombre, profesor, genero, club_id]);
  return result.insertId;
}


// MODIFICAR CATEGORIA SELECCIONADA (NO REQUIERE CLUB_ID YA QUE SE USA EL ID DE CATEGORIA QUE ESTA VINCULADO MEDIANTE FK A CLUB_ID)
const updateCategoryModel = async (id, data) => {
  const { nombre, profesor, horarios } = data;
  const [result] = await pool.query(`UPDATE categorias
                                      SET nombre = ?, profesor = ?, horarios = ?
                                      WHERE categoria_id = ?`, [nombre, profesor, horarios, id]);
  return result.affectedRows;
}

//ELIMINA LA CATEGORIA SELECCIONADA (MISMA EXPLICACION QUE PARA MODIFICAR)
const deleteCategoryModel = async (id) => {
  const [result] = await pool.query(`DELETE FROM categorias WHERE categoria_id = ?`, [id]);
  return result.affectedRows;
}

module.exports = { getAllModel, createCategoryModel, updateCategoryModel, deleteCategoryModel };
