const express = require("express");
const router = express.Router();
const { login, validateSession ,registerFromInvite} = require("../Controllers/authController");


(async () => {
  const jose = await import("jose");
  SignJWT = jose.SignJWT;
  jwtVerify = jose.jwtVerify;
})();

const { JWT_SECRET } = require("../Utils/jwtConfig.js");
const testeo = (req,res)=>{
    data = req.body

    const user = jwtVerify(data, JWT_SECRET)
    console.log(user)
    res.send("ok")
}



router.get("/validate-session", validateSession);
router.get("/test",testeo)
router.post("/register-from-invite", registerFromInvite);
router.post("/login", login);
module.exports = router;