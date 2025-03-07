const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    matchType: { type: String, enum: ['T20', 'ODI', 'Test'], required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    scores: [{ playerId: mongoose.Schema.Types.ObjectId, runs: Number, wickets: Number }],
    status: { type: String, enum: ['Scheduled', 'Ongoing', 'Completed'], default: 'Scheduled' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);
