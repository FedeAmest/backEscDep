const {getGastosByClubIdModel,getGastosByIdModel,createGastosModel,deleteGastosModel,updateGastosModel}=require('../Models/gastos');

const getGastosByClubId = async (req, res) => {
    const { club_id } = req.params;
    const gastos = await getGastosByClubIdModel(club_id);
    res.json(gastos);
};

const getGastosById = async (req, res) => {
    const { gastos_id } = req.params;
    const gastos = await getGastosByIdModel(gastos_id);
    res.json(gastos);
};

const createGastos = async (req, res) => {
    const newGastos = await createGastosModel(req.body);
    res.status(201).json(newGastos);
};

const updateGastos = async (req, res) => {
    const { gastos_id } = req.params;
    const updatedGastos = await updateGastosModel(gastos_id, req.body);
    res.json(updatedGastos);
};


const deleteGastos = async (req, res) => {
    const { gastos_id } = req.params;
    const result = await deleteGastosModel(gastos_id);
    res.json(result);
};


module.exports = {
    getGastosByClubId,
    getGastosById,
    createGastos,
    deleteGastos,
    updateGastos
};