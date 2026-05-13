const User = require('../models/User');

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) { res.status(404); throw new Error('User not found'); }
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    const updatedUser = await user.save();
    res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, profileImage: updatedUser.profileImage, authProvider: updatedUser.authProvider, subscriptionStatus: updatedUser.subscriptionStatus });
  } catch (error) { next(error); }
};

const uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) { res.status(400); throw new Error('Please upload an image file'); }
    const user = await User.findById(req.user._id);
    if (!user) { res.status(404); throw new Error('User not found'); }
    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();
    res.json({ profileImage: user.profileImage, message: 'Profile photo uploaded successfully' });
  } catch (error) { next(error); }
};

module.exports = { updateProfile, uploadPhoto };
