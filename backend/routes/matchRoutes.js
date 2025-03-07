const express = require('express');
const asyncHandler = require('express-async-handler');
const Match = require('../models/Match');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create match
router.post('/', protect, asyncHandler(async (req, res) => {
    const { matchType, teams } = req.body;
    const match = await Match.create({ matchType, teams });
    res.status(201).json(match);
}));

// Get all matches
router.get('/', asyncHandler(async (req, res) => {
    const matches = await Match.find().populate('teams', 'name');
    res.json(matches);
}));

module.exports = router;
