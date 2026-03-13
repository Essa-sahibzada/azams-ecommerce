import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

// Google Login Route
router.post('/google', async (req, res) => {
  try {
    const { name, email, googleId, image } = req.body;

    // Check karein ke user pehle se exist karta hai ya nahi
    let user = await User.findOne({ email });

    if (user) {
      res.json(user);
    } else {
      // Naya user banayein
      user = new User({
        name,
        email,
        googleId,
        image,
        isAdmin: false, // Default user
      });
      const createdUser = await user.save();
      res.status(201).json(createdUser);
    }
  } catch (error) {
    res.status(400).json({ message: "User save nahi ho saka" });
  }
});

export default router;