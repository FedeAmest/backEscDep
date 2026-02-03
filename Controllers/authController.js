
const { login} = require("../Services/userServices.js");


const loginController = async (req, res) => {
  
  const { identifier, password } = req.body;
if (!identifier || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }
try {
  const token = await login(identifier, password);

  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 1000 * 60 * 60 * 10 // 10 horas
  });
  
  res.json({ message: "Login exitoso", token });
} catch (error) {

  res.status(error.status || 500).json({ error: error.message + " lalalala" });
}
}


const { verifyAndRefreshToken } = require("../Services/authService");

const validateSession = async (req, res) => {
  const token = req.cookies.authToken;



  if (!token) {
    return res.status(401).json({ error: "No hay token" });
  }

  const { valid, payload, newToken } = await verifyAndRefreshToken(token);


  if (!valid) {
    return res.status(401).json({ error: "Token invalido" });
  }

  // opcional: renovar la cookie si hay sliding session
  if (newToken) {
    res.cookie("authToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 1000 * 60 * 60 * 10
    });
  }
  res.json({payload});
};



// ------------------------------------------------------NUEVO MODULO PARA CREAR USUARIOS DESDE INVITACION ------------------------------------------------------


const bcrypt = require("bcrypt");
const {
  getInviteByTokenModel,
  markInviteAsAcceptedModel
} = require("../Models/invitaciones");

const { createUserModel } = require("../Models/usuarios");
const { assignUserToClub } = require("../Models/usuariosClubes");

const registerFromInvite = async (req, res) => {
  try {
    const { token, nombre, username, password } = req.body;

    if (!token || !nombre || !username || !password) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const invite = await getInviteByTokenModel(token);

    if (!invite) {
      return res.status(404).json({ error: "Invitación inválida" });
    }

    if (invite.estado !== "pendiente") {
      return res.status(409).json({ error: "La invitación ya fue utilizada" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUserModel({
      club_id: invite.club_id,// eliminar luego de la migracion a nueva estructura
      nombre,
      username,
      email: invite.email,
      password: hashedPassword,
    });

    await assignUserToClub(
      newUser.user_id,
      invite.club_id,
      invite.tipo
    );

    await markInviteAsAcceptedModel(invite.invitacion_id);

    res.status(201).json({
      message: "Usuario creado correctamente",
      user_id: newUser.user_id
    });

  } catch (error) {
    console.error("registerFromInvite error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};



module.exports = {
  login: loginController,
  registerFromInvite: registerFromInvite,
  validateSession: validateSession
};