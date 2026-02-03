const { Router } = require('express');
const router = Router();

const { authExtraction } = require('../Middlewares/authExtraction');
const { userContext } = require('../Middlewares/userContext');
const { requireRole } = require('../Middlewares/requireRole');

const {
  getAllPlanes,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
} = require('../Controllers/planesAfiliacionController');

router.get('/', authExtraction, userContext, getAllPlanes);
router.get('/:id', authExtraction, userContext, getPlanById);
router.post('/', authExtraction, userContext, requireRole(['admin']), createPlan);
router.put('/:id', authExtraction, userContext, requireRole(['admin']), updatePlan);
router.delete('/:id', authExtraction, userContext, requireRole(['admin']), deletePlan);

module.exports = router;