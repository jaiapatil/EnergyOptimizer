import express from "express";
import Company from "../models/company.js";

const router = express.Router();

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

router.get("/weekly/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const history = company.energyMetrics.consumptionHistory || [];

    if (history.length < 24) {
      return res.json({ weekly: [] }); 
    }

    const last7days = history.slice(-7 * 24);

    let weekly = [];
    for (let i = 0; i < last7days.length; i += 24) {
      const oneDay = last7days.slice(i, i + 24);
      const total = oneDay.reduce((sum, val) => sum + val, 0);
      weekly.push({
        day: days[weekly.length % 7], 
        consumption: total,
      });
    }

    res.json({ weekly });
  } catch (err) {
    console.error("Weekly stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
