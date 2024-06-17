// controllers/assetController.js
const AssetMaster = require('../models/AssetModel');
const QRCode = require('qrcode');
// Create a new asset
exports.createAsset = async (req, res) => {
  try {
    const asset = new AssetMaster(req.body);

    // Generate QR Code
    const qrData = `http://192.168.1.17:3000/#/assetRecord/${asset._id}`;
    // const qrData = `AssetName: ${asset.AssetName}, MachineNo: ${asset.MachineNo}, SrNo: ${asset.SrNo}`;
    // const qrCode = await QRCode.toDataURL(qrData);
    // const qrCode = await QRCode.toDataURL(`${asset._id}`);
    const qrCode = await QRCode.toDataURL(qrData);

    asset.qrCode = qrCode;

    await asset.save();
    res.status(201).send(asset);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await AssetMaster.find();
    res.status(200).json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get asset by ID
exports.getAssetById = async (req, res) => {
  try {
    const asset = await AssetMaster.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update asset by ID
exports.updateAssetById = async (req, res) => {
  try {
    const updatedAsset = await AssetMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAsset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Delete asset by ID
exports.deleteAssetById = async (req, res) => {
  try {
    const deletedAsset = await AssetMaster.findByIdAndDelete(req.params.id);
    if (!deletedAsset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json(deletedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all assets with distinct locations
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await AssetMaster.distinct('location');
    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update maintenance set by asset ID and set ID
exports.updateMaintenanceSetById = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const setId = req.params.setId;

    const asset = await AssetMaster.findById(assetId);

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    // Find the index of the maintenance set with the given ID
    const setIndex = asset.maintenanceData.findIndex((set) => set._id.toString() === setId);

    if (setIndex === -1) {
      return res.status(404).json({ error: 'Maintenance set not found' });
    }

    // Update the maintenance set properties
    const updatedSet = Object.assign(asset.maintenanceData[setIndex], req.body);

    // Save the changes
    const updatedAsset = await asset.save();

    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getMaintenanceSetById = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const setId = req.params.setId;
    const asset = await AssetMaster.findById(assetId);

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    // Find the maintenance set with the given ID
    const maintenanceSet = asset.maintenanceData.find((set) => set._id.toString() === setId);

    if (!maintenanceSet) {
      return res.status(404).json({ error: 'Maintenance set not found' });
    }

    res.status(200).json(maintenanceSet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Delete maintenance data set by asset ID
exports.deleteMaintenanceSetById = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const setId = req.params.setId;

    const asset = await AssetMaster.findById(assetId);

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    // Find the index of the maintenance set with the given ID
    const setIndex = asset.maintenanceData.findIndex((set) => set._id.toString() === setId);

    if (setIndex === -1) {
      return res.status(404).json({ error: 'Maintenance set not found' });
    }

    // Remove the maintenance set from the array
    asset.maintenanceData.splice(setIndex, 1);

    const updatedAsset = await asset.save();

    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// exports.getLocationByAssetName = async (req, res) => {
//   try {
    
//     const assets = await AssetMaster.find({}, { AssetName: 1, Location: 1, _id: 0 });

//     if (!assets || assets.length === 0) {
//       return res.status(404).json({ error: 'No assets found' });
//     }

//     const assetNamesAndLocations = assets.map(({ AssetName, Location }) => ({ AssetName, Location }));

//     res.status(200).json(assetNamesAndLocations);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

exports.getLocationByAssetName = async (req, res) => {
  try {
    // Extract the asset name from request parameters
    const assetName = req.params.AssetName;

    // Find the asset in the database based on the asset name
    const asset = await AssetMaster.findOne({ AssetName: assetName }, { Location: 1 });

    // If asset is not found, return a 404 error response
    if (!asset) {
      return res.status(404).json({ error: `Asset with name '${assetName}' not found` });
    }

    // Extract the location from the asset
    const location = asset.Location;

    // Send a JSON response with asset name and location
    res.status(200).json({ AssetName: assetName, Location: location });
  } catch (error) {
    // If any error occurs, log the error and return a 500 error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getqrscan = async (req, res) => {
  const qrCode = req.query.qrCode; // Assuming QR code is sent as a query parameter
  
  try {
    const asset = await AssetMaster.findOne({ qrCode });
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json(asset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// exports.getAssetByQRCode = async (req, res) => {
//   const qrCode = req.params.qrCode; // Assuming QR code is sent as a query parameter
  
//   try {
//     const asset = await AssetMaster.findOne({ qrCode });
//     if (!asset) {
//       return res.status(404).json({ message: 'Asset not found' });
//     }
//     res.json(asset);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Get asset by QR code
exports.getAssetByQRCode = async (req, res) => {
  try {
    const { qrCode } = req.query;
    const asset = await AssetMaster.findOne({ qrCode });
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
