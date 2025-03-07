const express = require('express');
const asyncHandler = require('express-async-handler');
const PlayerStats = require('../models/PlayerStats');

const router = express.Router();

// Get top players by runs
router.get('/top-runs', asyncHandler(async (req, res) => {
    const topPlayers = await PlayerStats.find().sort({ runs: -1 }).limit(10);
    res.json(topPlayers);
}));

// Get top players by wickets
router.get('/top-wickets', asyncHandler(async (req, res) => {
    const topPlayers = await PlayerStats.find().sort({ wickets: -1 }).limit(10);
    res.json(topPlayers);
}));

module.exports = router;
