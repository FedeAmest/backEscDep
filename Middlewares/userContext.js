const { getUserClubContextModel } = require("../Models/usuarioClubContext");

const userContext = async (req, res, next) => {
  console.log('--- userContext Middleware ---');
  console.log('userContext middleware triggered');
  console.log('req.auth:', req.auth);
  
  try {
    const { user_id, club_id } = req.auth;
    const context = await getUserClubContextModel(user_id, club_id);

    if (!context) {
      return res.status(403).json({
        message: 'El usuario no pertenece al club'
      });
    }

    req.tipo = context.tipo;

    next();
  } catch (error) {
    console.error('userContext error:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
module.exports = { userContext };