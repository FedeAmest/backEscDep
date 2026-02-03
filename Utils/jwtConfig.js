const { TextEncoder } = require('util');

const JWT_SECRET = new TextEncoder().encode(process.env.jwt_Secret);
const JWT_EXPIRATION = "8h"; //Duración del token
const JWT_SLIDING_THRESHOLD = 10 * 60; // Tiempo para renovar el token y evitar cierre de sesión en caso de estar activo (10 minutos)

module.exports = {
    JWT_SECRET,
    JWT_EXPIRATION,
    JWT_SLIDING_THRESHOLD
};
