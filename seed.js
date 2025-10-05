import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Company from '../models/company.js'

import bcrypt from 'bcryptjs';

async function seed() {
  await mongoose.connect(import.meta.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Company.deleteMany();

  await Company.insertMany([
    {
      name: "Alpha Manufacturing Ltd",
      email: "alpha@energy.com",
      password: await bcrypt.hash("alpha123", 10),
      energyMetrics: {
        actualConsumption: 500,
        idealConsumption: 450,
        actualCost: 2000,
        idealCost: 1800,
        actualEfficiency: 85,
        idealEfficiency: 92,
        consumptionHistory: [
          { value: 480 },
          { value: 500 },
        ],
        costHistory: [
          { value: 1900 },
          { value: 2000 },
        ],
      },
      equipments: [
        { name: "Compressor A1", status: "Running", efficiency: 80, powerFactor: 0.9, alerts: ["High load"] },
        { name: "Furnace B2", status: "Idle", efficiency: 70, powerFactor: 0.85, alerts: [] },
        { name: "Pump C3", status: "Running", efficiency: 88, powerFactor: 0.95, alerts: ["Overheating"] },
      ],
      alerts: {
        active: ["Overheating in Pump C3"],
        recent: ["High load on Compressor A1"],
      },
    },
    {
      name: "Beta Energy Corp",
      email: "beta@energy.com",
      password: await bcrypt.hash("beta123", 10),
      energyMetrics: {
        actualConsumption: 600,
        idealConsumption: 550,
        actualCost: 2500,
        idealCost: 2200,
        actualEfficiency: 82,
        idealEfficiency: 90,
        consumptionHistory: [
          { value: 580 },
          { value: 600 },
        ],
        costHistory: [
          { value: 2400 },
          { value: 2500 },
        ],
      },
      equipments: [
        { name: "Turbine X1", status: "Running", efficiency: 78, powerFactor: 0.88, alerts: ["Low efficiency"] },
        { name: "Boiler Y2", status: "Running", efficiency: 84, powerFactor: 0.9, alerts: [] },
        { name: "Generator Z3", status: "Idle", efficiency: 75, powerFactor: 0.87, alerts: ["Maintenance due"] },
      ],
      alerts: {
        active: ["Maintenance due for Generator Z3"],
        recent: ["Low efficiency in Turbine X1"],
      },
    },
  ]);

  console.log("Database seeded successfully!");
  mongoose.connection.close();
}

seed();
