
// routes/assetRoutes.js
const express = require('express');
const AssetMaster = require('../models/AssetModel');
const router = express.Router();
const assetController = require('../controller/AssetController');

// Create a new asset
router.post('/assets', assetController.createAsset);

// Get all assets
router.get('/assets', assetController.getAllAssets);

// Get asset by ID
router.get('/assets/:id', assetController.getAssetById);

// Update asset by ID
router.put('/assets/:id', assetController.updateAssetById);

router.get('/getqrscan', assetController.getAssetByQRCode);

router.get('/qrCode', assetController.getAssetByQRCode);
// Delete asset by ID
router.delete('/assets/:id', assetController.deleteAssetById);

// Get all unique locations of assets
router.get('/locations/:AssetName', assetController.getLocationByAssetName);

// Delete maintenance data set by asset ID
router.delete('/assets/:assetId/maintenance/:setId', assetController.deleteMaintenanceSetById);

// Update maintenance set by asset ID and set ID
router.put('/assets/:assetId/maintenance/:setId', assetController.updateMaintenanceSetById);

// Get maintenance set by asset ID and set ID
router.get('/assets/:assetId/maintenance/:setId', assetController.getMaintenanceSetById);

// router.get('/qrcode', assetController.getqrscan);

// Get the location of an asset by its name
// Get the location of an asset by its name
router.get('/location/:AssetName', async (req, res) => {
    try {
      const AssetName = req.params.AssetName;
      console.log(`Received asset name: ${AssetName}`);
  
      const asset = await AssetMaster.findOne({ name: AssetName });
  
      if (!asset) {
        console.log('Asset not found');
        return res.status(404).send({ error: 'Asset not found' });
      }
  
      console.log(`Found asset: ${asset}`);
      res.send({ Location: asset.Location }); // Ensure the field name matches the schema
    } catch (error) {
      console.error('Error fetching asset location:', error);
      res.status(500).send(error);
    }
  });
module.exports = router;
