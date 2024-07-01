import userModel from '../dao/models/user.js';

async function getAllUsers() {
  return await userModel.find();
}

async function getUserById(uid) {
  return await userModel.findById(uid);
}

async function deleteUserById(uid) {
  return await userModel.findByIdAndDelete(uid);
}

export default {
  getAllUsers,
  getUserById,
  deleteUserById
};
