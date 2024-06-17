const express = require('express');
const router = express.Router();
const BreakDown = require('../models/BreakdownMaster');

// Create a new breakdown record
router.post('/breakdown', async (req, res) => {
  try {
    const breakdown = new BreakDown(req.body);
    await breakdown.save();
    res.status(201).send(breakdown);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all breakdown records
router.get('/breakdown', async (req, res) => {
  try {
    const breakdowns = await BreakDown.find({});
    res.send(breakdowns);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific breakdown record by ID
router.get('/breakdown/:id', async (req, res) => {
  try {
    const breakdown = await BreakDown.findById(req.params.id);
    if (!breakdown) {
      return res.status(404).send();
    }
    res.send(breakdown);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/breakdown/:id', async (req, res) => {
try {
  const updatedAsset = await BreakDown.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedAsset) {
    return res.status(404).json({ error: 'breakdown not found' });
  }
  res.status(200).json(updatedAsset);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});
// Update a breakdown record by ID
router.patch('/breakdown/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [ /* List of allowed updates */ ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const breakdown = await BreakDown.findById(req.params.id);
    if (!breakdown) {
      return res.status(404).send();
    }

    updates.forEach((update) => breakdown[update] = req.body[update]);
    await breakdown.save();
    res.send(breakdown);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a breakdown record by ID
router.delete('/breakdown/:id', async (req, res) => {
  try {
    const breakdown = await BreakDown.findByIdAndDelete(req.params.id);
    if (!breakdown) {
      return res.status(404).send();
    }
    res.send(breakdown);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
