const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tbmSchema = new Schema({
  assetName: {
    type: String,
    // required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  assetType: {
    type: String,
    // required: true,
  },
  installationDate: {
    type: Date,
    // required: true,
  },
  tbmScheduleDate: {
    type: Date,
    // required: true,
  },
  tbmFrequency: {
    type: String,
    // required: true,
  },
  nextTbmDate: {
    type: Date,
    // required: true,
  },
  status: {
    type: String,
    // required: true,
  },
});

const TBM = mongoose.model('TBM', tbmSchema);

module.exports = TBM;
