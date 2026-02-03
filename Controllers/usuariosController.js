const {
  getAllUsersModel,
  getUserByIdModel,
  createUserModel,
  updateUserModel,
  updateUserMailModel,
  updateUserPasswordModel,
  deleteUserModel,
  getUserByClubIdModel,
} = require('../Models/usuarios');


const getAllUsers = async (req, res) => {
  const users = await getAllUsersModel();
  res.json(users);
};

const getUserById = async (req, res) => {
  console.log('Entering getUserById controller');
  console.log('req.auth:', req.auth);
  const data = req.auth ;
  console.log('user data in controller:', data);
  const user = await getUserByIdModel(data.userId);

  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  
  const {password,...safeUser} = user
  console.log('safe user:', user);
  res.json(user);
};
const getUsersByClubId = async (req, res) => {
  const { club_id } = req.params;
  const users = await getUserByClubIdModel(club_id);
  res.json(users);
};

const createUser = async (req, res) => {
  const userData = req.body;
  const newUser = await createUserModel(userData);
  res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  const updatedUser = await updateUserModel(id, userData);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  const updatedUser = await updateUserPasswordModel(id, newPassword);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

const updateUserMail = async (req, res) => {
  const { id } = req.params;
  const { newEmail } = req.body;
  const updatedUser = await updateUserMailModel(id, newEmail);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const result = await deleteUserModel(id);
  if (result.ok) {
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    updateUserPassword,
    updateUserMail,
    deleteUser,
    getUsersByClubId
};