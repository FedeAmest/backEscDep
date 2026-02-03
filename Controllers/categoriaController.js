const { getAllModel, createCategoryModel, deleteCategoryModel ,updateCategoryModel} = require('../Models/categorias.js');

const getAllCategories = async (req, res) => {
    try {
        const { club_id } = req.auth;
        const {user_id} = req.auth;


        
        const categorias = await getAllModel(club_id);

        res.json(categorias);
    } catch (error) {
        
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
}


const createCategory = async (req, res) => {
    try {
        
        const { club_id } = req.auth;
        const { nombre, profesor, genero} = req.body;
        
        const categoryId = await createCategoryModel( {nombre, profesor, genero, club_id});

        res.status(201).json({ id: categoryId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const affectedRows = await updateCategoryModel(id, updatedData);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await deleteCategoryModel(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};


module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };