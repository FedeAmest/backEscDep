const express = require("express");
const router = express.Router();

const {authExtraction} = require("../Middlewares/authExtraction");
const {userContext} = require("../Middlewares/userContext");
const {requireRole} = require("../Middlewares/requireRole");

const {listClubUsers,createClubUser,updateRoleClubUser,removeClubUser,getMyClubContext} = require("../Controllers/usuariosClubesController");

router.get(
  "/",
  authExtraction,
  userContext,
  requireRole(["admin"]),
  listClubUsers
);

router.post(
  "/",
  authExtraction,
  userContext,
  requireRole(["admin"]),
  createClubUser
);

router.put(
  "/:usuario_club_id",
  authExtraction,
  userContext,
  requireRole(["admin"]),
  updateRoleClubUser
);

router.delete(
  "/:usuario_club_id",
  authExtraction,
  userContext,
  requireRole(["admin"]),
  removeClubUser
);

router.get(
  '/context',
  authExtraction,
  userContext,
  getMyClubContext
);

module.exports = router;
