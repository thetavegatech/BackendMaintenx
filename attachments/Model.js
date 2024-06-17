// const moment = require('moment-timezone');
const mongoose = require("mongoose")

const Schema = mongoose.Schema;
// const now = new Date();

const AssetSchema = new Schema({
  
    AssetName: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    AssetCategory: {
        type: String,
        require: true
    }, 
    Location: {
        type:String,
        require: true
    },
    ManufacturersName: {
        type:String,
        require: true
    },
    ManufacturersAddress: {
        type:String,
        require: true
    },
   
    ManufacturersContactNo: {
        type:Number,
        require: true
    },
    ManufacturersEmail: {
        type:String,
        require: true
    },
    ModelNumber: {
        type:Number,
        require: true
    },
    SerialNumber: {
            type:Number,
            require: true
        },
        PurchaseDate: {
            type:String,
            require: true
        },
        WarrantyStartDate: {
            type:Date,
            require: true
        },
        WarrantyEndDate: {
            type:String,
            require: true
        },
        PurchaseCost: {
            type:Number,
            require: true
        },
        AcquisitionMethod: {
            type:String,
            require: true
        },
        WarrantyProviderManufacturerContact: {
            type:String,
            require: true
        },
        WarrantyTermsandConditions: {
            type:String,
            require: true
        },
        SupplierVendorInformation: {
            type:String,
            require: true
        },
        CurrentOwner: {
            type:String,
            require: true
        },
        DepartmentResponsible: {
            type:String,
            require: true
        },
        LocationDepartment: {
            type:String,
            require: true
        },
        PhysicalLocation: {
            type:String,
            require: true
        },
        CurrentStatus: {
            type:String,
            require: true
        },
        ExpectedUsefulLife: {
            type:String,
            require: true
        },
        DateofLastMaintenance: {
            type:String,
            require: true
        },
        DetailsofMaintenanceActivities: {
            type:String,
            require: true
        },
        ScheduledMaintenanceDatesandIntervals: {
            type:String,
            require: true
        },
        PMDetails:{
            type:String,
            reruire: true
        },
        StartDateofMaintenance:{
            type:Date,
            reruire: true
        },
        nextMaintenanceDate:{
            type:Date,
            reruire: true
        },
        startDate :{
            type:Date,
            reruire: true
        },
        nextDate :{
            type:Date,
            reruire: true
        },
        status :{
            type:String,
            reruire: true
        },
        TaskName :{
            type:String,
            reruire: true
        },
        TaskDescription :{
            type:String,
            reruire: true
        }

    },
   


// {
//     collection:"Asset",
// }
);

const Asset = mongoose.model('Asset' , AssetSchema)


module.exports = Asset;


