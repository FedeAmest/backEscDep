const express = require('express');
const router = express.Router();
const { getAllCategories ,createCategory,deleteCategory,updateCategory } = require('../Controllers/categoriaController');
const { authExtraction } = require('../Middlewares/authExtraction');
const { requireRole } = require('../Middlewares/requireRole');
const { userContext } = require('../Middlewares/userContext');



// Rutas para categorias
router.get('/',authExtraction,userContext, getAllCategories);
router.post('/', authExtraction,userContext, requireRole(["admin"]), createCategory);
router.put('/:id', authExtraction,userContext, requireRole(["admin"]), updateCategory);
router.delete('/:id', authExtraction,userContext, requireRole(["admin"]), deleteCategory);

module.exports = router;