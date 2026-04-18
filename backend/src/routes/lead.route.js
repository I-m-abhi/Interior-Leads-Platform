import express from "express";
import {
  authenticateUser,
  authorizeRoles
} from "../middleware/auth.user.js";
import {
  createLead,
  deleteLead,
  getAllLeads,
  getLeadDetails,
  updateLead
} from "../controller/lead.controller.js";

const router = express.Router();

router.route("/leads").get(authenticateUser, getAllLeads);
router.route("/admin/leads").get(authenticateUser, authorizeRoles("admin"), getAllLeads);

router.route("/admin/lead/create").post(authenticateUser, authorizeRoles("admin"), createLead);

router.route("/admin/lead/:id")
.put(authenticateUser, authorizeRoles("admin"), updateLead)
.delete(authenticateUser, authorizeRoles("admin"), deleteLead);

router.route("/lead/:id").get(authenticateUser, getLeadDetails);

export default router;