const express = require('express');
const router = express.Router();

const { authExtraction } = require('../Middlewares/authExtraction.js')
const { getUserById,getAllUsers,createUser,updateUser,updateUserPassword,deleteUser, updateUserMail,getUsersByClubId} = require('../Controllers/usuariosController'); 

router.get('/', getAllUsers);
router.get('/club/:club_id', getUsersByClubId);
router.get('/user', authExtraction, getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.patch('/:id/password', updateUserPassword);
router.delete('/:id', deleteUser);
router.patch('/:id/email', updateUserMail);


module.exports = router;
