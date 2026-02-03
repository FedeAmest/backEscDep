const express = require('express');
const router = express.Router();

const { authExtraction } = require('../Middlewares/authExtraction');
const { userContext } = require('../Middlewares/userContext');
const { requireRole } = require('../Middlewares/requireRole');

const {
  getAllIngresosByClub,
  createIngreso,
  updateIngreso,
  deleteIngreso
} = require('../Controllers/ingresosController');

router.get(
  '/',
  authExtraction,
  userContext,
  requireRole(['admin']),
  getAllIngresosByClub
);

router.post(
  '/',
  authExtraction,
  userContext,
  requireRole(['admin']),
  createIngreso
);

router.put(
  '/:ingreso_id',
  authExtraction,
  userContext,
  requireRole(['admin']),
  updateIngreso
);

router.delete(
  '/:ingreso_id',
  authExtraction,
  userContext,
  requireRole(['admin']),
  deleteIngreso
);

module.exports = router;