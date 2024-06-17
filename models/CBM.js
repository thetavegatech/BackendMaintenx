const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cbmSchema = new Schema({
  assetName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  assetType: {
    type: String,
    // required: true,
  },
  installationDate: {
    type: Date,
    // required: true,
  },
  cbmScheduleDate: {
    type: Date,
    // required: true,
  },
  cbmFrequency: {
    type: String,
    // required: true,
  },
  nextCbmDate: {
    type: Date,
    // required: true,
  },
  status: {
    type: String,
    // required: true,
  },
});

const CBM = mongoose.model('CBM', cbmSchema);

module.exports = CBM;
