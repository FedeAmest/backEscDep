
const express = require('express');
const router = express.Router();
const { getAllClubs, getClubsByClient,createClub,updateClub,deleteClub} = require('../Controllers/clubesController');


// Rutas para clubes
router.get('/', getAllClubs);
router.get('/:cliente_id', getClubsByClient);
router.post('/', createClub);
router.put('/:club_id', updateClub);
router.delete('/:club_id', deleteClub);
module.exports = router;