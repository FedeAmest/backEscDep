const {
  getAllHorariosByCategoriaIdModel,
  createManyHorariosModel,
  getHorarioByIdModel,
  createHorarioModel,
  updateHorarioModel,
  deleteHorarioModel
} = require('../Models/horariosCategoria');

const getAllHorariosByCategoriaId = async (req, res) => {
  try {
    const { categoria_id } = req.params;
    const { club_id } = req.auth;

    const horarios = await getAllHorariosByCategoriaIdModel(categoria_id, club_id);
    res.json(horarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getHorarioById = async (req, res) => {
  try {
    const { horario_id } = req.params;
    const { club_id } = req.auth;

    const horario = await getHorarioByIdModel(horario_id, club_id);
    res.json(horario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createHorario = async (req, res) => {
  try {
    const { categoria_id } = req.params;
    const { club_id } = req.auth;
    const data = req.body;

    const newHorarioId = await createHorarioModel({
      ...data,
      categoria_id,
      club_id
    });

    res.status(201).json({ id: newHorarioId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateHorario = async (req, res) => {
  try {
    const { horario_id } = req.params;
    const data = req.body;

    await updateHorarioModel(horario_id, data);
    res.json({ message: 'Horario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteHorario = async (req, res) => {
  try {
    const { horario_id } = req.params;

    await deleteHorarioModel(horario_id);
    res.json({ message: 'Horario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createManyHorarios = async (req, res) => {
    const { categoria_id } = req.params;
    const { horarios } = req.body;
  console.log('Received data for createManyHorarios:', { categoria_id, horarios });

  if (!Array.isArray(horarios) || horarios.length === 0) {
    return res.status(400).json({ error: 'Horarios inválidos' });
  }

  const inserted = await createManyHorariosModel({
    categoria_id,
    horarios
  });

  res.status(201).json({
    message: 'Horarios creados correctamente',
    inserted
  });
};

module.exports = {
  getAllHorariosByCategoriaId,
  getHorarioById,
  createHorario,
  updateHorario,
  deleteHorario,
createManyHorarios
};