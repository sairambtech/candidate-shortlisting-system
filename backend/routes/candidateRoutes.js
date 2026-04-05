const express = require("express");
const router = express.Router();
const {
  createCandidate,
  getCandidates,
  updateCandidateStatus
} = require("../controllers/candidateController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", protect, getCandidates);
router.post("/", protect, authorizeRoles("RECRUITER"), createCandidate);
router.patch("/:id/status", protect, authorizeRoles("RECRUITER", "HR"), updateCandidateStatus);

module.exports = router;