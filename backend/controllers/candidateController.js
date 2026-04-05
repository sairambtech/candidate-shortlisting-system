const Candidate = require("../models/Candidate");

const createCandidate = async (req, res) => {
  try {
    const { name, email, phone, skills, experience } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email and phone are required" });
    }

    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: "Candidate already exists" });
    }

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      skills: skills || [],
      experience: experience || 0,
      createdBy: req.user._id
    });

    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().populate("createdBy", "name email role");
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCandidateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const validTransitions = {
      APPLIED: ["SHORTLISTED"],
      SHORTLISTED: ["REJECTED"],
      REJECTED: []
    };

    if (!validTransitions[candidate.status].includes(status)) {
      return res.status(400).json({
        message: `Invalid status transition from ${candidate.status} to ${status}`
      });
    }

    candidate.status = status;
    await candidate.save();

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCandidate,
  getCandidates,
  updateCandidateStatus
};