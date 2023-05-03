import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, select: false },
    money: { type: Number, default: 100 },
});

export const UserModel = mongoose.model('User', UserSchema);

export const createUser = async (values) => {
    const user = await new UserModel(values).save();
    return { ...user.toObject(), password: undefined };
};
export const getUserByUsername = (username) => UserModel.findOne({ username });
export const getUserDetailsById = (id) => UserModel.findById({ _id: id }, { password: 0 });
export const getUsers = () => UserModel.find({}, { password: 0 });
export const getUsernameById = (id) => UserModel.findById(id, { username: 1, _id: 0 });
export const getMoneyById = (id) => UserModel.findById(id, { money: 1, _id: 0 });
export const setMoneyById = async (id, money) => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, { money }, { new: true });
    return updatedUser.money;
};