import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    matches: { type: Array, required: true },
    dateTime: { type: Date, required: true },
    ticketBet: { type: Number, required: true },
    ticketRate: { type: Number, required: true },
    ticketStatus: { type: String, required: true, default: 'pending' },
});

export const TicketModel = mongoose.model('Ticket', TicketSchema);

export const createTicket = (values) => new TicketModel(values).save().then((ticket) => ticket.toObject());
export const getTicketsById = (user_id) => TicketModel.find({ user_id });
export const ticketFeed = () => TicketModel.find().sort({ dateTime: -1 }).limit(5);
export const getNotWonTickets = () => TicketModel.find({ ticketStatus: { $ne: 'won' } });
export function updateTickets(newTickets) {
    const updatePromises = newTickets.map(ticket => {
        return TicketModel.updateOne({ _id: ticket._id }, { $set: ticket });
    });

    return Promise.all(updatePromises);
}