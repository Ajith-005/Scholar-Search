const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String },
  category: { type: [String], required: true },
  course: { type: [String], required: true },
  gender: { type: String, enum: ["Male", "Female", "Any"], default: "Any" },
  documents_required: { type: [String], required: true },
  apply_link: { type: String, required: true },
  eligibilityDetails: {
    state: { type: String },
    passedClass: { type: String },
    minimumMarks: { type: Number },
    annualIncomeLimit: { type: Number }
  }
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

module.exports = Scholarship;
