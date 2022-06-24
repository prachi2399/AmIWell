const mongoose = require("mongoose");

const SymptomsSchema = mongoose.Schema(
  {
    symptoms: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Symptoms = mongoose.model("Symptoms", SymptomsSchema);

module.exports = Symptoms;
