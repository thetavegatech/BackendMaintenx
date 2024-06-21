const express = require('express');
const routerNo = express.Router();
const UserNo = require('../NumberModel');

// Create a new user
routerNo.post('/UserNo', async (req, res) => {
  try {
    const { name, phoneNumber, address, email, Location, plant } = req.body;
    const newUserNo = new UserNo({ name, phoneNumber, address, email, Location, plant });
    const userno = await newUserNo.save();
    res.json(userno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get a list of all users
routerNo.get('/UserNo', async (req, res) => {
  try {
    const usernos = await UserNo.find({});
    res.json(usernos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

  // Get user by ID
  routerNo.get('/UserNo/:userId', async (req, res) => {
    try {
      const userno = await UserNo.findById(req.params.userId);
      if (!userno) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(userno);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user' });
    }
  });

  // Update user by ID
  routerNo.put('/UserNo/:userId', async (req, res) => {
    try {
      const userno = await UserNo.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!userno) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(userno);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  });

// Delete user by ID
routerNo.delete('/UserNo/:userId', async (req, res) => {
  try {
    const userno = await UserNo.findByIdAndRemove(req.params.userId);
    if (!userno) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userno);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Get users by location
routerNo.get('/UserNo/byLocation/:location', async (req, res) => {
  try {
    const Location = req.params.Location;
    const usersByLocation = await UserNo.find({ Location: Location });

    if (usersByLocation.length === 0) {
      return res.status(404).json({ error: `No users found in location: ${Location}` });
    }

    res.json(usersByLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users by location' });
  }
});

// Route to get users by location
routerNo.get('/getUsersByLocation/:Location', async (req, res) => {
  const Location = req.params.Location;

  try {
    // Assuming you have a User model with a 'location' field
    const usersByLocation = await UserNo.find({ Location });

    res.json(usersByLocation);
  } catch (error) {
    console.error('Error fetching users by location:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


routerNo.get('/getUsernameAndLocations', async (req, res) => {
// exports.getUsernameAndLocations = async (req, res) => {
  try {
    const userno = await UserNo.find({}, { name: 1, Location: 1, _id: 0 });

    if (!userno || userno.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    const namesAndLocations = userno.map(({ name, Location }) => ({ name, Location }));

    res.status(200).json(namesAndLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = routerNo;
