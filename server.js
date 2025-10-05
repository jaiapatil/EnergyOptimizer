import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Company from "./models/company.js";
import authRoutes from "../eopt/routes/authRoutes.js";
import uploadRoutes from "../eopt/routes/uploadRoutes.js";
import companyRoutes from "../eopt/routes/company.js";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/company", companyRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.get("/", (req, res) => res.send("Backend running"));

app.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post("/api/company/:id/reset-consumption", async (req, res) => {
  const companyId = req.params.id;
  const { newConsumption, newCost } = req.body;

  try {
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ error: "Company not found" });

    company.energyMetrics.actualConsumption =
      newConsumption ?? company.energyMetrics.actualConsumption;
    company.energyMetrics.actualCost =
      newCost ?? company.energyMetrics.actualCost;


    company.energyMetrics.consumptionHistory.push({
      value: company.energyMetrics.actualConsumption,
    });
    company.energyMetrics.costHistory.push({
      value: company.energyMetrics.actualCost,
    });

    const optimizationMsg =
      "✅ Optimization scheduled: 30% reduction in cost and consumption.";
    company.alerts.active.push(optimizationMsg);
    company.alerts.recent.push(optimizationMsg);

    await company.save();

    console.log(`Optimization done for ${company.name}`);
    res.status(200).json({
      success: true,
      message: "Optimization applied successfully",
      actualConsumption: company.energyMetrics.actualConsumption,
      actualCost: company.energyMetrics.actualCost,
    });
  } catch (err) {
    console.error("Optimization Error:", err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/company/:id/add-alert", async (req, res) => {
  const companyId = req.params.id;
  const { alert } = req.body;

  try {
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ error: "Company not found" });

    const maintenanceMsg =
      alert || "🛠 Maintenance scheduled for compressor efficiency issue.";

    company.alerts.active.push(maintenanceMsg);
    company.alerts.recent.push(maintenanceMsg);

    await company.save();

    console.log(`Maintenance scheduled for ${company.name}`);
    res.status(200).json({
      success: true,
      message: "Maintenance scheduled successfully",
    });
  } catch (err) {
    console.error("Maintenance Error:", err);
    res.status(500).json({ error: err.message });
  }
});


setInterval(async () => {
  try {
    const companies = await Company.find();

    for (let company of companies) {
      const lastConsumption =
        company.energyMetrics.consumptionHistory.slice(-1)[0]?.value ||
        company.energyMetrics.actualConsumption;
      const lastCost =
        company.energyMetrics.costHistory.slice(-1)[0]?.value ||
        company.energyMetrics.actualCost;

      const newConsumption = lastConsumption + Math.floor(Math.random() * 20);
      const newCost = lastCost + Math.floor(Math.random() * 10);

      company.energyMetrics.consumptionHistory.push({ value: newConsumption });
      company.energyMetrics.costHistory.push({ value: newCost });
      company.energyMetrics.actualConsumption = newConsumption;
      company.energyMetrics.actualCost = newCost;

      const newAlerts = [];

      if (newConsumption > company.energyMetrics.idealConsumption * 1.1) {
        newAlerts.push("⚠️ High energy usage detected");
      }
      if (newCost > company.energyMetrics.idealCost * 1.1) {
        newAlerts.push("⚠️ High energy cost detected");
      }

      company.equipments.forEach((eq) => {
        if (eq.efficiency < 75) newAlerts.push(`Low efficiency in ${eq.name}`);
        if (eq.status === "Running" && eq.powerFactor < 0.85)
          newAlerts.push(`Poor power factor in ${eq.name}`);
      });

      company.alerts.recent = [...company.alerts.active];
      company.alerts.active = newAlerts;

      await company.save();
      console.log(
        `Updated ${company.name} | Consumption: ${newConsumption}, Cost: ${newCost}, Alerts: ${newAlerts.length}`
      );
    }
  } catch (err) {
    console.error("Auto-update error:", err);
  }
}, 3600000);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server listening on port ${PORT}`)
);
