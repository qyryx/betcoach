import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    date: {type: Date, required: true},
    rates: { type: Array, required: true },
    category: { type: String, required: true },
    sport: { type: String, required: true},
    status: { type: String, required: false, default: 'pending' },
    score: { type: String, required: false, default: null },
});

export const MatchModel = mongoose.model('Match', MatchSchema);

export const createMatch = (values) => new MatchModel(values).save().then((match) => match.toObject());
export const getMatches = () => MatchModel.find({}, { _id: 0, __v: 0 });
export const getMatch = (id) => MatchModel.findOne({id}, { _id: 0, __v: 0 });
export const deleteMatches = () => MatchModel.deleteMany({});