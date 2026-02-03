const { verifyTokenOnly } = require("../Services/authService");

const authExtraction = async (req, res, next) => {
  const authToken = req.cookies.authToken;
  

  if (!authToken) {
    return res.status(401).json({ error: "No hay token" });
  }

  const { valid, payload } = await verifyTokenOnly(authToken);
  

  if (!valid) {
    return res.status(401).json({ error: "Token no válido" });
  }

  // payload ya trae: userId, clubId
  req.auth = {
    user_id: payload.user_id,
    club_id: payload.club_id
  };
  

  next();
};

module.exports = { authExtraction };