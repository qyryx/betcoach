import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
    id: { type: String, required: true },
    result: { type: String, required: false, default: null },
    sport: { type: String, required: true },
});

export const ResultModel = mongoose.model('Result', ResultSchema);

export const createResult = (values) => new ResultModel(values).save().then((result) => result.toObject());
export const getResults = () => ResultModel.find({}, { _id: 0, __v: 0 });
export const deleteResults = () => ResultModel.deleteMany({});