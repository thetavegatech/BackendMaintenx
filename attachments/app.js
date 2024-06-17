// const express = require('express');
// const session = require('express-session');
// const mongoose = require('mongoose');
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

// const app = express();


// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const router = require('./Routes/Router');
// const Asset = require('./Model');
// const BreakDown = require('./BreakdownModel');
// const Breakdownrouter = require('./Routes/BreakdownRouter');
// const UserNo = require('./NumberModel')
// const routerNo = require('./controller/userNoContoller')

// const mongourl = "mongodb://localhost:27017/MMS_DB?directConnection=true"

// app.use(cookieParser());
// app.use(session({
//   secret: '12345', // Replace with a secret key
//   resave: false,
//   saveUninitialized: true,
// }));
// const secretKey = process.env.SECRET_KEY;

// mongoose.connect(mongourl, {
//   useNewUrlParser: true,
// })
//   .then(() => { console.log("connected to database"); })
//   .catch(e => console.log(e));

// // saveData = async (data) => {
// //   data = new Asset(data);
// //   data = await data.save();
// //   console.log("Saved data:", data);
// // };

// // saveData = async (data) => {
// //   data = new BreakDown(data);
// //   data = await data.save();
// //   console.log("Saved data:", data);
// // };


// app.listen(5000, () => {
//   console.log("server start");
// });


// require("./userDetails");

// const User = mongoose.model("UserInfo");
// // User registration endpoint
// app.post('/register', async (req, res) => {
//   const { username, email, password, mobileNo, userRoll } = req.body;
//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ username });

//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password using bcrypt
//     const saltRounds = 10;
//     const hashedPassword = await bcryptjs.hash(password, saltRounds);

//     // Create a new user
//     await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       mobileNo,
//       userRoll,
//     });

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // GET user information by username
// // Get user data by username
// // app.get('/getAlluser', async (req, res) => {
// //   // const { username } = req.params;

// //   try {
// //     // Find the user by username in the database
// //     const users = await User.findOne();
// //     res.json(users);

// //     // if (!user) {
// //     //   return res.status(404).json({ message: 'User not found' });
// //     // }

// //     // Send the user data (including username and user role) to the client
// //     // res.status(200).json({
// //       // username: user.username,
// //       // userRoll: user.userRoll,
// //     // });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // });

// // // User login endpoint
// // app.post('/login', async (req, res) => {
// //   req.session.user = 'username'; 
// //   const { username, password, userRoll } = req.body;

// //   try {
// //     // Find the user by username
// //     const user = await User.findOne({ username });

// //     if (!user) {
// //       return res.status(401).json({ message: 'Invalid username or password' });
// //     }

// //     // Compare the provided password with the stored hashed password
// //     const isMatch = await bcryptjs.compare(password, user.password);

// //     if (!isMatch) {
// //       return res.status(401).json({ message: 'Invalid username or password' });
// //     }

// //     // Successful login
// //     // Generate and send a JWT token here if needed
// //     req.session.user = user;
// //     res.json({ message: 'Login successful',username, userRoll });
// //     req.session.user = 'username'; 
// //     req.session.user = 'userRoll'; 
// //     // navigate('/dashboard', { state: { username, userRoll } })

// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // app.get('/users/:username', async (req, res) => {
// //   const { username } = req.params;
// //   try {
// //     const users = await User.find({ username }, 'username userRoll');
// //     // res.json({ message: ' successful',username });
// //     res.status(200).json(users);
// //   } catch (error) {
// //     res.status(500).json({ error: 'An error occurred' });
// //   }
// // });

// // // Your protected route
// // app.get('/protected', (req, res) => {
// //   // Check if the user is logged in
// //   if (!req.session.user) {
// //     res.status(401).send('Unauthorized');
// //     return;
// //   }
// //   // Fetch the username from the session data
// //   const username = req.session.user.username;
// //   res.json({ username });
// // });

// // app.post('/logout', (req, res) => {
// //   currentUser = null;
// //   sessionStorage.clear();
// //   res.json({ message: 'Logged out' });
// // });


// app.use(router);
// app.use(Breakdownrouter);
// app.use(routerNo);
// app.get('/getBreakdownData', async (req, res) => {
//   try {
//     const fields = req.query.fields ? req.query.fields.replace(/,/g, ' ') : '';
//     const data = await DataModel.find().select(fields).exec();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching data' });
//   }
// });


const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieparser = require("cookie-parser")
const app = express();
const fs = require('fs');
const path = require('path');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

const router = require('./Routes/Router');
const Breakdownrouter = require('./Routes/BreakdownRouter');
const UserNo = require('./NumberModel');
const routerNo = require('./controller/userNoContoller');
const Asset = require('./Model');
const BreakDown = require('./BreakdownModel');

// const router = require('./Routes/Router');
// const Asset = require('./Model');
// const BreakDown = require('./BreakdownModel');
// const Breakdownrouter = require('./Routes/BreakdownRouter');
// const UserNo = require('./NumberModel')
// const routerNo = require('./controller/userNoContoller')


const mongourl = "mongodb://192.168.29.93:27017/MMS_DB?directConnection=true"


mongoose.connect(mongourl, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
  .then(() => { console.log("connected to database"); })
  .catch(e => console.log(e));

//userauth
const userRoute = require("./Routes/userRoutes")
const {notFound , errorHandler} = require("./middleware/errorMiddleware")

app.use("/api/users", userRoute)
// app.use(notFound)
// app.use(errorHandler)

//this routes for breakdown
app.use(router);
app.use(Breakdownrouter);
// app.use(UserNo);
app.use(routerNo);

app.get('/getBreakdownData', async (req, res) => {
    try {
      const fields = req.query.fields ? req.query.fields.replace(/,/g, ' ') : '';
      const data = await DataModel.find().select(fields).exec();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  });

  
  // Configure multer to handle file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'attachments/'); // Specify the directory where files will be saved
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
//   },
// });

// Function to copy files from one folder to another
function copyFiles(sourceFolder, destinationFolder) {
  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      console.error(`Error reading source folder: ${err}`);
      return;
    }

    files.forEach(file => {
      const sourceFilePath = path.join(sourceFolder, file);
      const destinationFilePath = path.join(destinationFolder, file);

      fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
        if (err) {
          console.error(`Error copying file ${file}: ${err}`);
        } else {
          console.log(`File ${file} copied successfully.`);
        }
      });
    });
  });
}

// Get the current working directory
const currentWorkingDirectory = process.cwd();

// Call the copyFiles function with the current working directory as the source path
copyFiles(currentWorkingDirectory, 'attachments/');  // Replace the destination path as needed

// const upload = multer({ storage: storage });




// app.get("/" , (req, res) => {
//   res.send("Hello world")
// })

app.listen(5000, () => {
  console.log("Server is running on port 5000")
});