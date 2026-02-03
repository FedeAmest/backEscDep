const express = require('express');
const router = express.Router();

const { authExtraction } = require('../Middlewares/authExtraction');
const { userContext } = require('../Middlewares/userContext');
const { requireRole } = require('../Middlewares/requireRole');

const {
  getCategoriasByUsuario,
  getUsuariosByCategoria,
  createCategoriaUsuario,
  updatePersonalCategoria,
  deletePersonalCategoria,
  getPersonalByClub
} = require('../Controllers/personalCategoriaController');
const { get } = require('http');


router.get(
  '/club/personal',
  authExtraction,
  userContext,
  requireRole(['admin']),
  getPersonalByClub
);

router.get(
  '/usuario/:user_id/categorias',
  authExtraction,
  userContext,
  requireRole(['admin']),
  getCategoriasByUsuario
);

router.get(
  '/categoria/:categoria_id/usuarios',
  authExtraction,
  userContext,
  requireRole(['admin']),
  getUsuariosByCategoria
);

router.post(
  '/',
  authExtraction,
  userContext,
  requireRole(['admin']),
  createCategoriaUsuario
);

router.put(
  '/:id',
  authExtraction,
  userContext,
  requireRole(['admin']),
  updatePersonalCategoria
);

router.delete(
  '/:id',
  authExtraction,
  userContext,
  requireRole(['admin']),
  deletePersonalCategoria
);

module.exports = router;