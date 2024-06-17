const express = require('express');
const router = express.Router();
const CBM = require('../models/CBM');

// Create a new CBM record
router.post('/cbm', async (req, res) => {
  try {
    const cbm = new CBM(req.body);
    await cbm.save();
    res.status(201).send(cbm);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all CBM records
router.get('/cbm', async (req, res) => {
  try {
    const cbms = await CBM.find({});
    res.send(cbms);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific CBM record by ID
router.get('/cbm/:id', async (req, res) => {
  try {
    const cbm = await CBM.findById(req.params.id);
    if (!cbm) {
      return res.status(404).send();
    }
    res.send(cbm);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/cbmupdateRecords', async (req, res) => {
  try {
    // Assuming you are sending an array of assets in the request body
    const updatedAssets = req.body.cbms;

    // Update each asset in the database
    for (const updatedAsset of updatedAssets) {
      // Find the asset by ID and update it
      const filter = { _id: updatedAsset._id };
      const update = {
        nextCbmDate: updatedAsset.nextCbmDate,
        status: updatedAsset.status,
        // Add other fields to update here if needed
      };

      // Use Mongoose's findOneAndUpdate to update the asset
      await CBM.findOneAndUpdate(filter, update);
    }

    res.json({ message: 'Records updated successfully' });
  } catch (error) {
    console.error('Error updating records:', error);
    res.status(500).json({ error: 'Error updating records' });
  }
});

router.put('/cbm/:id', async (req, res) => {
  try {
    const updatedAsset = await CBM.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAsset) {
      return res.status(404).json({ error: 'cbm not found' });
    }
    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });

// Update a CBM record by ID
router.patch('/cbm/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['assetName', 'location', 'assetType', 'installationDate', 'cbmScheduleDate', 'cbmFrequency', 'nextCbmDate', 'status'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const cbm = await CBM.findById(req.params.id);
    if (!cbm) {
      return res.status(404).send();
    }

    updates.forEach((update) => cbm[update] = req.body[update]);
    await cbm.save();
    res.send(cbm);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a CBM record by ID
router.delete('/cbm/:id', async (req, res) => {
  try {
    const cbm = await CBM.findByIdAndDelete(req.params.id);
    if (!cbm) {
      return res.status(404).send();
    }
    res.send(cbm);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
