const mongoose = require("mongoose");

const VehicleNoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: String },
  addedBy: { type: String },
});

const VehicleSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },

  licensePlate: { type: String },
  vin: { type: String },
  year: { type: Number },
  make: { type: String, required: true },
  model: { type: String, required: true },
  engineSize: { type: String },
  trim: { type: String },
  color: { type: String },

  createdDate: { type: String, required: true },
  lastServiced: { type: String },
  nextServiceDate: { type: String },

  vehicleNotes: [VehicleNoteSchema],
});

VehicleSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

VehicleSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Vehicle", VehicleSchema);
