const { getAllClubsModel, getByClienteIdModel, createClubModel,deleteClubModel,updateClubModel } = require('../Models/clubes');

const getAllClubs = async (req, res) => {
  try {
    const clubs = await getAllClubsModel();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clubes' });
  }
};

const getClubsByClient = async (req, res) => {
  const { cliente_id } = req.params;
  try {
    const clubs = await getByClienteIdModel(cliente_id);
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clubes del cliente' });
  }
};

const deleteClub = async (req, res) => {
    const { club_id } = req.params;
    try {
        const result = await deleteClubModel(club_id);
        if (result) {
            res.json({ message: 'Club eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Club no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el club' });
    }
};

const updateClub = async (req, res) => {
    const { club_id } = req.params;
    const clubData = req.body;
    try {
        const updatedClub = await updateClubModel(club_id, clubData);
        res.json(updatedClub);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el club' });
    }
};

const createClub = async (req, res) => {
    const clubData = req.body;
    try {
        const newClub = await createClubModel(clubData);
        res.status(201).json(newClub);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el club' });
    }
};

module.exports = { getAllClubs, getClubsByClient, createClub, updateClub, deleteClub };