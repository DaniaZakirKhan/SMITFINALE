const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

exports.checkIn = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.checkInTime = new Date();
  await user.save();
  res.json({ message: 'Checked in successfully' });
};

exports.checkOut = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.checkOutTime = new Date();
  await user.save();
  res.json({ message: 'Checked out successfully' });
};

exports.applyLeave = async (req, res) => {
  const { reason } = req.body;
  const user = await User.findById(req.user.id);
  user.leaves.push({ date: new Date(), reason });
  await user.save();
  res.json({ message: 'Leave applied successfully' });
};
