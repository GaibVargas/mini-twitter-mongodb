const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: String,
  password: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  created_at: {
    type: Date,
    default: Date.now,
  }
});

UserSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.compareHash = function(hash) {
  return bcrypt.compare(hash, this.password);
};

module.exports = mongoose.model('User', UserSchema);
