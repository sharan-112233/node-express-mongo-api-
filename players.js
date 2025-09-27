// routes/players.js
const express = require('express');
const router = express.Router();
const Player = require('../models/playerModel');
const mongoose = require('mongoose');

// POST - create player
router.post('/', async (req, res) => {
  const { name, number, position } = req.body;
  try {
    const player = await Player.create({ name, number, position });
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET - single player by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'Player does not exist.' });
  try {
    const player = await Player.findById(id);
    if (!player) return res.status(404).json({ error: 'Player does not exist.' });
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH - update player
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'Player does not exist.' });
  try {
    const player = await Player.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
    if (!player) return res.status(404).json({ error: 'Player does not exist.' });
    res.status(200).json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - remove player
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'Player does not exist.' });
  try {
    const player = await Player.findByIdAndDelete(id);
    if (!player) return res.status(404).json({ error: 'Player does not exist.' });
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
