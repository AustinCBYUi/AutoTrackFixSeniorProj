const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  business: { type: String },
  phoneNumber: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  createdDate: { type: String, required: true },
  lastServiced: { type: String },
  nextServiceDate: { type: String },
  // status: {
  //   type: String,
  //   enum: ['New', 'Pipeline', 'Contacted', 'Quote Sent', 'Closed', ],
  //   default: 'New'
  // },
  accountNotes: [{
    text: String,
    date: { type: String }
  }],
  services: [{ type: String }],
});

ClientSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

ClientSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Client', ClientSchema);
