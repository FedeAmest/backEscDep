const { getUserByIdModel } = require("../Models/user");

const userContext = async (req, res, next) => {
  
  
  try {
    const user = await getUserByIdModel(req.userData.userId);
    

    if (!user) {
      return res.status(401).json({ error: "Usuario inexistente" });
    }
    
    req.userData.club_id = user.club_id;
    req.userData.role = user.role;

    return next();
  } catch (error) {
    return res.status(500).json({ error: "Error cargando contexto de usuario" });
  }
};

module.exports = userContext;