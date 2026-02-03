const bcrypt = require("bcrypt");
const { generateToken } = require("../Services/authService.js");

const { findUserByEmailModel, findUserByUsernameModel } = require("../Models/usuarios.js");

const login = async (identifier, password) => {
    let user;
    if(!identifier.includes('@')){
        user = await findUserByUsernameModel(identifier)
    }else{
        user = await findUserByEmailModel(identifier);
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
        const error = new Error("Credenciales inválidas");
        error.status = 401;
        throw error;
    }
    const club_id = user.club_id || null;
    // Modelo a futuro : 
    // const club_id = resolveClubFromSubdomain(req);
    
    return generateToken({ user_id: user.user_id,club_id });
};



module.exports = {
    login
};