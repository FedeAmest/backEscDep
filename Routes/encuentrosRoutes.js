const { Router } = require('express');
const router = Router();

const {
  createEncuentro,
  getEncuentroById,
  getUltimosEncuentrosByClub,
  updateEncuentro,
  deleteEncuentro
} = require('../Controllers/encuentrosController');

const {authExtraction} = require('../Middlewares/authExtraction');
const {userContext} = require('../Middlewares/userContext');

router.post('/', authExtraction, userContext, createEncuentro);
router.get('/ultimos', authExtraction, userContext, getUltimosEncuentrosByClub);
router.get('/:encuentro_id', authExtraction, userContext, getEncuentroById);
router.put('/:encuentro_id', authExtraction, userContext, updateEncuentro);
router.delete('/:encuentro_id', authExtraction, userContext, deleteEncuentro);

module.exports = router;