const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  role: { type: String, default: 'base_user' }
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);
