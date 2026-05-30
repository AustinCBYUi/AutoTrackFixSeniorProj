const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },

  serviceTitle: { type: String, required: true },
  serviceDate: { type: String, required: true },
  mileage: { type: Number },
  description: { type: String },
  cost: { type: Number },

  nextServiceDate: { type: String },
  status: {
    type: String,
    enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
    default: "Scheduled",
  },
});

ServiceSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ServiceSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Service", ServiceSchema);
