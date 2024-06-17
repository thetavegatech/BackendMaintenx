const express = require('express');
const router = express.Router();
const PM = require('../models/PMMaster');

// Create a new PM record
router.post('/pm', async (req, res) => {
  try {
    const pm = new PM(req.body);
    await pm.save();
    res.status(201).send(pm);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all PM records
router.get('/pm', async (req, res) => {
  try {
    const pms = await PM.find({});
    res.send(pms);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific PM record by ID
router.get('/pm/:id', async (req, res) => {
  try {
    const pm = await PM.findById(req.params.id);
    if (!pm) {
      return res.status(404).send();
    }
    res.send(pm);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/pm/:id', async (req, res) => {
  try {
    const updatedAsset = await PM.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAsset) {
      return res.status(404).json({ error: 'pm not found' });
    }
    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });

  // Update multiple PM records
router.put('/updateRecords', async (req, res) => {
  try {
    // Assuming you are sending an array of assets in the request body
    const updatedAssets = req.body.pms;

    // Update each asset in the database
    for (const updatedAsset of updatedAssets) {
      // Find the asset by ID and update it
      const filter = { _id: updatedAsset._id };
      const update = {
        nextDate: updatedAsset.nextDate,
        status: updatedAsset.status,
        // Add other fields to update here if needed
      };

      // Use Mongoose's findOneAndUpdate to update the asset
      await PM.findOneAndUpdate(filter, update);
    }

    res.json({ message: 'Records updated successfully' });
  } catch (error) {
    console.error('Error updating records:', error);
    res.status(500).json({ error: 'Error updating records' });
  }
});

  

// Update a PM record by ID
router.patch('/pm/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['assetName', 'assetType', 'location', 'pmTaskName', 'pmScheduleDate', 'nextScheduleDate', 'description', 'pmDetails', 'status'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const pm = await PM.findById(req.params.id);
    if (!pm) {
      return res.status(404).send();
    }

    updates.forEach((update) => pm[update] = req.body[update]);
    await pm.save();
    res.send(pm);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a PM record by ID
router.delete('/pm/:id', async (req, res) => {
  try {
    const pm = await PM.findByIdAndDelete(req.params.id);
    if (!pm) {
      return res.status(404).send();
    }
    res.send(pm);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
