
const pool = require("../Utils/Pool");

const getUserClubContextModel = async (userId, clubId) => {
  const [rows] = await pool.query(
    `SELECT tipo 
     FROM usuarios_clubes 
     WHERE user_id = ? AND club_id = ? `,
    [userId, clubId]
  );
  return rows[0] || null;
};

module.exports = { getUserClubContextModel };