// const moment = require('moment-timezone');
const mongoose = require("mongoose")

const Schema = mongoose.Schema;
// const now = new Date();

const BreakDownSchema = new Schema({
   MachineName: {
        type:String,
        require: true
    },
    BreakdownStartDate: {
        type: String,
        require: true
    },
    BreakdownEndDate: {
        type: String,
        require: true
    },
    BreakdownStartTime: {
        type:String,
        require: true
    },
    BreakdownEndTime: {
        type:String,
        require: true
    },
    Shift: {
        type: String,
        require: true
    },
    LineName: {
        type: String,
        require: true
    }, 
    StageName: {
        type:String,
        require: true
    },
    BreakdownPhenomenons: {
            type:String,
            require: true
        },
        BreakdownType: {
            type:String,
            require: true
        },
        OCC: {
            type:String,
            require: true
        },
        ActionTaken: {
            type:String,
            require: true
        },
        WhyWhyAnalysis: {
            type:String,
            require: true
        },
        RootCause: {
            type:String,
            require: true
        },
        PermanentAction: {
            type:String,
            require: true
        },
        TargetDate: {
            type:String,
            require: true
        },
        Responsibility: {
            type:String,
            require: true
        },
        HD: {
            type:String,
            require: true
        },
        Remark: {
            type:String,
            require: true
        },
        Status: {
            type:String,
            require: true
        },
        attachment: { type: String },

    },
   


// {
//     collection:"Asset",
// }
);

const BreakDown = mongoose.model('BreakDown' , BreakDownSchema)


module.exports = BreakDown;




// timestamp: {
//     type: Date, 
//     default: () => new Date(Date.now() + 330 * 60 * 1000)
// }


// const mongoose = require("mongoose")

// const taskSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     completed: {
//         type: String,
//         required: true
//     }
// })

// const Task = mongoose.model("Task", taskSchema)

// module.exports = Task