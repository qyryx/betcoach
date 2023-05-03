import {getUserDetailsById, getUsers} from '../db/user.js';

export const getAllUsers = async () => {
  try {
    return await getUsers();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUserByHisId = async (req, res) => {
  try {
    const { user_id } = req.user;
    const user = await getUserDetailsById(user_id);
    return res.status(200).json({ username: user.username, money: user.money });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
