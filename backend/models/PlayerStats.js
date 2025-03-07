const mongoose = require('mongoose');

const playerStatsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    matchesPlayed: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 }
});

module.exports = mongoose.model('PlayerStats', playerStatsSchema);
