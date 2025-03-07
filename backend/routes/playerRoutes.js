const express = require('express');
const asyncHandler = require('express-async-handler');
const PlayerStats = require('../models/PlayerStats');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get player stats
router.get('/:userId', protect, asyncHandler(async (req, res) => {
    const stats = await PlayerStats.findOne({ userId: req.params.userId });
    if (!stats) {
        return res.status(404).json({ message: 'Player stats not found' });
    }
    res.json(stats);
}));

// Update player stats
router.put('/:userId', protect, asyncHandler(async (req, res) => {
    const { matchesPlayed, runs, wickets } = req.body;
    const stats = await PlayerStats.findOneAndUpdate(
        { userId: req.params.userId },
        { matchesPlayed, runs, wickets },
        { new: true, upsert: true }
    );
    res.json(stats);
}));

module.exports = router;
