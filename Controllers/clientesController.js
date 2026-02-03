const {
  getAllClientesModel,
  getClienteByIdModel,
  createClienteModel,
  updateClienteModel,
  deleteClienteModel
} = require('../Models/clientes');

const getAllClientes = async (req, res) => {
  res.json(await getAllClientesModel());
};

const getClienteById = async (req, res) => {
  res.json(await getClienteByIdModel(req.params.cliente_id));
};

const createCliente = async (req, res) => {
  res.status(201).json(await createClienteModel(req.body));
};

const updateCliente = async (req, res) => {
  res.json(await updateClienteModel(req.params.cliente_id, req.body));
};

const deleteCliente = async (req, res) => {
  res.json({ deleted: await deleteClienteModel(req.params.cliente_id) });
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};