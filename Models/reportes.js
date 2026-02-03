
const pool = require('../Utils/Pool');

module.exports = {
  // 1) Encuentro + torneo + (categorías y club vía inscripción) + estadísticas de jugadores
  async encuentroCompleto(encuentro_id) {
    const [rows] = await pool.query(`
      SELECT 
        e.encuentro_id, e.fecha, e.equipo_local, e.equipo_visitante, e.resultado,
        t.torneo_id, t.nombre AS torneo_nombre,
        c.categoria_id, c.nombre AS categoria_nombre,
        cl.club_id, cl.nombre AS club_nombre
      FROM encuentros e
      JOIN torneos t ON t.torneo_id = e.torneo_id
      JOIN torneos_categorias tc ON tc.torneo_id = t.torneo_id
      JOIN categorias c ON c.categoria_id = tc.categoria_id
      JOIN clubes cl ON cl.club_id = c.club_id
      WHERE e.encuentro_id = ?
    `, [encuentro_id]);

    const [stats] = await pool.query(`
      SELECT es.*, j.nombre AS jugador_nombre
      FROM estadisticas_jugadores es
      JOIN jugadores j ON j.jugador_id = es.jugador_id
      WHERE es.encuentro_id = ?
      ORDER BY es.estadistica_id DESC
    `, [encuentro_id]);

    return { encuentro: rows[0] || null, estadisticas: stats };
  },

  // 2) Todos los encuentros de un club (por cualquiera de sus categorías inscriptas en ese torneo)
  async encuentrosPorClub(club_id) {
    const [rows] = await pool.query(`
      SELECT DISTINCT e.*
      FROM encuentros e
      JOIN torneos t ON t.torneo_id = e.torneo_id
      JOIN torneos_categorias tc ON tc.torneo_id = t.torneo_id
      JOIN categorias c ON c.categoria_id = tc.categoria_id
      WHERE c.club_id = ?
      ORDER BY e.fecha DESC, e.encuentro_id DESC
    `, [club_id]);
    return rows;
  },

  // 3) Estadísticas por club, con contexto del encuentro y torneo
  async estadisticasPorClub(club_id) {
    const [rows] = await pool.query(`
      SELECT es.*, 
             e.fecha, e.equipo_local, e.equipo_visitante, e.resultado,
             t.nombre AS torneo_nombre,
             j.nombre AS jugador_nombre,
             c.nombre AS categoria_nombre,
             cl.nombre AS club_nombre
      FROM estadisticas_jugadores es
      JOIN encuentros e ON e.encuentro_id = es.encuentro_id
      JOIN torneos t ON t.torneo_id = e.torneo_id
      JOIN jugadores j ON j.jugador_id = es.jugador_id
      JOIN categorias c ON c.categoria_id = j.categoria_id
      JOIN clubes cl ON cl.club_id = c.club_id
      WHERE cl.club_id = ?
      ORDER BY e.fecha DESC, es.estadistica_id DESC
    `, [club_id]);
    return rows;
  },
};
