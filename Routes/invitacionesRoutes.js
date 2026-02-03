const express = require('express');
const router = express.Router();

const { authExtraction } = require('../Middlewares/authExtraction');
const { userContext } = require('../Middlewares/userContext');
const { requireRole } = require('../Middlewares/requireRole');

const {  createInvitacion,  listInvitaciones,  validateInvitacion,  cancelInvitacion} = require('../Controllers/invitacionesController');

router.post(  '/',  authExtraction,  userContext,  requireRole(['admin']),  createInvitacion);

router.get(  '/',  authExtraction,  userContext,  requireRole(['admin']),  listInvitaciones);

router.get('/token/:token', validateInvitacion);

router.delete(  '/:invitacion_id',  authExtraction,  userContext,  requireRole(['admin']),  cancelInvitacion);

module.exports = router;