const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pmSchema = new Schema({
  AssetName: {
    type: String,
    // required: true,
  },
  assetType: {
    type: String,
    // required: true,
  },
  Location: {
    type: String,
    // required: true,
  },
  TaskName: {
    type: String,
    // required: true,
  },
  pmScheduleDate: {
    type: Date,
    // required: true,
  },
  nextScheduleDate: {
    type: Date,
    // required: true,
  },
  TaskDescription: {
    type: String,
  },
  ScheduledMaintenanceDatesandIntervals: {
    type: String,
    // required: true,
  },
  startDate: {
    type: Date,
    // required: true,
  },
  nextDate: {
    type: Date,
    // required: true,
  },
  Location: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    // required: true,
  },
});

const PM = mongoose.model('PM', pmSchema);

module.exports = PM;
