import express from "express";
import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";
import bcrypt from "bcryptjs";
import Company from "../models/company.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });


router.get("/sample-company", (req, res) => {
  const sampleHeaders = [
    "name,email,password,actualConsumption,idealConsumption,actualCost,idealCost,actualEfficiency,idealEfficiency,equipment_name,equipment_status,equipment_efficiency,equipment_powerFactor"
  ];

  const sampleContent = sampleHeaders.join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=sample-company.csv");
  res.send(sampleContent);
});



router.post("/company", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
       
        const companyMap = {};

        for (let row of results) {
          if (!companyMap[row.email]) {
          
            const hashedPassword = await bcrypt.hash(row.password, 10);

            companyMap[row.email] = {
              name: row.name,
              email: row.email,
              password: hashedPassword,
              energyMetrics: {
                actualConsumption: Number(row.actualConsumption) || 0,
                idealConsumption: Number(row.idealConsumption) || 0,
                actualCost: Number(row.actualCost) || 0,
                idealCost: Number(row.idealCost) || 0,
                actualEfficiency: Number(row.actualEfficiency) || 0,
                idealEfficiency: Number(row.idealEfficiency) || 0,
                consumptionHistory: [],
                costHistory: [],
              },
              equipments: [],
              alerts: { active: [], recent: [] },
            };
          }

          
          companyMap[row.email].equipments.push({
            name: row.equipment_name,
            status: row.equipment_status,
            efficiency: Number(row.equipment_efficiency) || 0,
            powerFactor: Number(row.equipment_powerFactor) || 0,
            alerts: [],
          });
        }

       
        for (let email in companyMap) {
          const newCompany = new Company(companyMap[email]);
          await newCompany.save();
        }

        fs.unlinkSync(filePath); 
        res.json({ message: "CSV data uploaded successfully with multiple equipments" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error saving data to MongoDB" });
      }
    });
});

export default router;
