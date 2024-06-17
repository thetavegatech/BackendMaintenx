const mongoose = require("mongoose");
const QRCode = require('qrcode');
const Schema = mongoose.Schema;

const maintenanceSetSchema = new mongoose.Schema({
  CMD: String,
  TMD: String,
  CMDFrequency: String,
  TMDFrequency: String,
});

const AssetSchema = new Schema({
  AssetName: { type: String,  },
  MachineNo: { type: String,  },
  SrNo: { type: String,  },
  MachineType: { type: String,  },
  Model: { type: String,  },
  Vendors: { type: String,  },
  Parts: { type: String,  },
  Criticality: { type: String,  },
  Make: { type: String,  },
  Controller: { type: String,  },
  PowerRatting: { type: String,  },
  CapecitySpindle: { type: String,  },
  AxisTravels: { type: String,  },
  Ranking: { type: String,  },
  Location: { type: String,  },
  InstallationDate: { type: String },
  ManufacturingYear: { type: String },
  Image: { type: String,  },
  Attachment: { type: String,  },
  status: { type: String,  },
  CMD: { type: String },
  TMD: { type: String },
  TMDFrequency: { type: String },
  CMDFrequency: { type: String },
  maintenanceData: [maintenanceSetSchema],
  qrCode: { type: String }
});

const AssetMaster = mongoose.model('AssetMaster', AssetSchema);

module.exports = AssetMaster;
