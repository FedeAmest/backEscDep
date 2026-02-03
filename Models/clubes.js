const pool = require('../Utils/Pool');



  // Detallado: clubes con su cliente
  const getAllClubsModel = async () => {
    const [rows] = await pool.query(`
      SELECT cl.*, cli.nombre AS cliente_nombre, cli.email AS cliente_email
      FROM clubes cl
      JOIN clientes cli ON cli.cliente_id = cl.cliente_id
      ORDER BY cl.club_id DESC
    `);
    return rows;
  }

  const getByClienteIdModel = async (cliente_id) =>{
    const [rows] = await pool.query(`SELECT * FROM clubes WHERE cliente_id = ? ORDER BY club_id DESC`, [cliente_id]);
    return rows;
  }

  const getClubByIdModel = async (club_id) => {
    const [rows] = await pool.query(`SELECT * FROM clubes WHERE club_id = ?`, [club_id]);
    return rows[0] || null;
  }


  const createClubModel = async (clubData) => {
    const { nombre, cliente_id, direccion, estado, fecha_alta } = clubData;
    const [result] = await pool.query(
      `INSERT INTO clubes (nombre, cliente_id, direccion, estado, fecha_alta) VALUES (?, ?, ?, ?, ?)`,
      [nombre, cliente_id, direccion, estado, fecha_alta]
    );
    return { club_id: result.insertId, ...clubData };
  };
  const updateClubModel = async (club_id, clubData) => {
    const { nombre, cliente_id, direccion, estado } = clubData;
    await pool.query(
      `UPDATE clubes SET nombre = ?, cliente_id = ?, direccion = ?, estado = ? WHERE club_id = ?`,
      [nombre, cliente_id, direccion, estado, club_id]
    );
    return { club_id, ...clubData };
  };

  const deleteClubModel = async (club_id) => {
    const [result] = await pool.query(`DELETE FROM clubes WHERE club_id = ?`, [club_id]);
    return result.affectedRows;
  };

module.exports = { getClubByIdModel, getAllClubsModel, getByClienteIdModel, createClubModel, updateClubModel, deleteClubModel};


