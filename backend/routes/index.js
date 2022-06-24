const express = require("express");
const controller = require("../controller/index");
const Doctor = require("../modal/Doctor");
const Symptoms = require("../modal/Symptom");
const router = express.Router();

// post symptoms
router.post("/symptoms", async (req, res) => {
  const { symptoms } = req.body;
  const symptomsData = new Symptoms({
    symptoms,
  });
  try {
    const savedSymptoms = await symptomsData.save();
    res.json(savedSymptoms);
  } catch (err) {
    res.json({ message: err });
  }
});

// get all symptoms
router.get("/symptoms", (req, res) => {
  Symptoms.find()
    .then((symptoms) => {
      if (symptoms.length) res.json({ symptoms: symptoms[0].symptoms });
      else res.json([]);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// get diagnosis
router.post("/get-diagnosis", controller.predictDiagnosis);

// post doctor
router.post("/post-doctor", (req, res) => {
  const { name, email, phone, address, pincode, city, state, symptoms } =
    req.body;
  const newDoctor = new Doctor({
    name,
    email,
    phone,
    address,
    pincode,
    city,
    state,
    symptoms,
  });
  newDoctor
    .save()
    .then((doctor) => {
      res.json({
        message: "Doctor added successfully",
        doctor,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in adding doctor",
        error: err,
      });
    });
});

// update doctor
router.patch("/update-doctor/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, pincode, city, state, symptoms } =
    req.body;
  Doctor.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      address,
      pincode,
      city,
      state,
      symptoms,
    },
    { new: true }
  )
    .then((doctor) => {
      res.json({
        message: "Doctor updated successfully",
        doctor,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in updating doctor",
        error: err,
      });
    });
});

// get doctor by email
router.get("/get-doctor/:email", (req, res) => {
  const { email } = req.params;
  Doctor.findOne({ email })
    .then((doctor) => {
      res.json({
        message: "Doctor found successfully",
        doctor,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in finding doctor",
        error: err,
      });
    });
});

// get all doctors
router.get("/get-doctors", (req, res) => {
  const { pincode } = req.query;
  if (pincode) {
    Doctor.find({ pincode })
      .then((doctors) => {
        res.json({
          message: "Doctors found successfully",
          doctors,
        });
      })
      .catch((err) => {
        res.json({
          message: "Error in finding doctors",
          error: err,
        });
      });
  } else {
    Doctor.find()
      .then((doctors) => {
        res.json({
          message: "Doctors found successfully",
          doctors,
        });
      })
      .catch((err) => {
        res.json({
          message: "Error in finding doctors",
          error: err,
        });
      });
  }
});

// get doctor by symptoms
router.post("/get-doctors", (req, res) => {
  const { symptoms } = req.body;
  Doctor.find({ symptoms: { $in: symptoms } })
    .then((doctors) => {
      res.json({ data: doctors });
    })
    .catch((err) => {
      res.status(500).json({ error: "Not Found" });
    });
});

module.exports = router;
