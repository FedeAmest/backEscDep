
const { JWT_SECRET, JWT_EXPIRATION, JWT_SLIDING_THRESHOLD } = require("../Utils/jwtConfig.js");

(async () => {
  const jose = await import("jose");
  SignJWT = jose.SignJWT;
  jwtVerify = jose.jwtVerify;
})();

const secret = new TextEncoder().encode(JWT_SECRET);

const generateToken = async (payload) => {
    const token = await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRATION)
        .sign(secret);

    return token;
}

const verifyTokenOnly = async (token) => {
    try {
        const { payload } = await jwtVerify(token, secret);
        return { valid: true, payload };
    } catch (error) {
        return { valid: false, error };
    }
}

const verifyAndRefreshToken = async (token) => {

    try {

        const { payload } = await jwtVerify(token, secret);


        //calcular tiempo restante
        const exp = payload.exp * 1000
        const now = Date.now();
        const timeLeft = Math.floor((exp - now) / 1000);

        let newToken = null;

        //si queda menos del umbral, renovar token

        if (timeLeft < JWT_SLIDING_THRESHOLD) {
            newToken = await generateToken({ userId: payload.userId });

        }


        return {valid:true,payload, newToken};
    } catch (error) {
        return {valid:false, error};
    }
}
module.exports = {
    generateToken,
    verifyTokenOnly,
    verifyAndRefreshToken
};