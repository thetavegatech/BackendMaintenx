const express = require('express');
const router = express.Router();
const TBM = require('../models/TBM');

// Create a new TBM record
router.post('/tbm', async (req, res) => {
  try {
    const tbm = new TBM(req.body);
    await tbm.save();
    res.status(201).send(tbm);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all TBM records
router.get('/tbm', async (req, res) => {
  try {
    const tbms = await TBM.find({});
    res.send(tbms);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific TBM record by ID
router.get('/tbm/:id', async (req, res) => {
  try {
    const tbm = await TBM.findById(req.params.id);
    if (!tbm) {
      return res.status(404).send();
    }
    res.send(tbm);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.put('/tbm/:id', async (req, res) => {
  try {
    const updatedAsset = await TBM.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAsset) {
      return res.status(404).json({ error: 'Tbm not found' });
    }
    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });


  router.put('/tbmupdateRecords', async (req, res) => {
    try {
      // Assuming you are sending an array of assets in the request body
      const updatedAssets = req.body.tbms;
  
      // Update each asset in the database
      for (const updatedAsset of updatedAssets) {
        // Find the asset by ID and update it
        const filter = { _id: updatedAsset._id };
        const update = {
          nextTbmDate: updatedAsset.nextTbmDate,
          status: updatedAsset.status,
          // Add other fields to update here if needed
        };
  
        // Use Mongoose's findOneAndUpdate to update the asset
        await TBM.findOneAndUpdate(filter, update);
      }
  
      res.json({ message: 'Records updated successfully' });
    } catch (error) {
      console.error('Error updating records:', error);
      res.status(500).json({ error: 'Error updating records' });
    }
  });

// Update a TBM record by ID
router.patch('/tbm/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['assetName', 'location', 'assetType', 'installationDate', 'tbmScheduleDate', 'tbmFrequency', 'nextTbmDate', 'status'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const tbm = await TBM.findById(req.params.id);
    if (!tbm) {
      return res.status(404).send();
    }

    updates.forEach((update) => tbm[update] = req.body[update]);
    await tbm.save();
    res.send(tbm);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a TBM record by ID
router.delete('/tbm/:id', async (req, res) => {
  try {
    const tbm = await TBM.findByIdAndDelete(req.params.id);
    if (!tbm) {
      return res.status(404).send();
    }
    res.send(tbm);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
