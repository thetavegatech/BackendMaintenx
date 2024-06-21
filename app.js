
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieparser = require("cookie-parser")
const app = express();
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const Grid = require('gridfs-stream');
const User = require("./models/userModel")
const cbmRoutes = require('./Routes/cbmRoute');
const tbmRoutes = require('./Routes/tbmRoute');
const pmRoutes = require('./Routes/pmRoute');
const routerNo = require('./controller/userNoContoller');

// const AssetMaster = require('./models/AssetModel')

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())


const AssetMaster = require('./models/AssetModel');


// const mongourl = "mongodb://localhost:27017/MaintenX?directConnection=true" 
const mongourl = "mongodb+srv://vaibhavdevkar101:Vaibhav123@cluster0.518nyqj.mongodb.net/MaintenX?retryWrites=true&w=majority"


mongoose.connect(mongourl, {
})
  .then(() => { console.log("connected to database"); })
  .catch(e => console.log(e));

  
//userauth
const userRoute = require("./Routes/userRoutes")
const {notFound , errorHandler} = require("./middleware/errorMiddleware")
const AssetRoutes = require('./Routes/AssetRoute');
const breakdownRoutes = require('./Routes/BreakdownRoute');


app.use("/api/users", userRoute)


app.use('/api', AssetRoutes);
app.use(routerNo);
// Use CBM routes
app.use('/api', cbmRoutes);
app.use('/api', tbmRoutes);
app.use('/api', pmRoutes);
app.use('/api', breakdownRoutes);

app.get('/getuser', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Get user by ID
app.get('/getuser/:id', async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});


// Delete user by ID
app.delete('/getuser/:id', async (req, res) => {
  try {
    const users = await User.findByIdAndRemove(req.params.id);
    if (!users) {
      return res.status(404).json({ error: 'User not found to delete' });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});
 // Update user by ID
 app.put('/getuser/:id', async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!users) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});


app.get('/getBreakdownData', async (req, res) => {
    try {
      const fields = req.query.fields ? req.query.fields.replace(/,/g, ' ') : '';
      const data = await DataModel.find().select(fields).exec();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  });


  // Initialize GridFS
let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});



// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:\Work\Bootstrap\images');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route for file upload
// app.post('/upload', upload.single('image'), (req, res) => {
  // File uploaded successfully
  // res.send('File uploaded');
// });

// Example route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file details using req.file
  const filePath = req.file.path;
  // Save filePath to your database or perform other actions

  // Respond with success
  res.json({ success: true, filePath });
});



app.get('/api/assetmaster/:AssetName', async (req, res) => {
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
});





app.listen(4000, (req, res) => {
  console.log("Server is running on port 4000")
});