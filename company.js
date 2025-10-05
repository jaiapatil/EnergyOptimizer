import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    name: String,
    status: String,
    efficiency: Number,
    powerFactor: Number,
    alerts: [String],
  });
  
  const energyMetricsSchema = new mongoose.Schema({
    actualConsumption: Number,
    idealConsumption: Number,
    actualCost: Number,
    idealCost: Number,
    actualEfficiency: Number,
    idealEfficiency: Number,
    consumptionHistory: [{ value: Number, timestamp: { type: Date, default: Date.now } }],
    costHistory: [{ value: Number, timestamp: { type: Date, default: Date.now } }],
  });
  
  const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    energyMetrics: energyMetricsSchema,
    equipments: [equipmentSchema],   
    alerts: {
      active: [String],
      recent: [String],
    },
  });
  

export default mongoose.model("Company", companySchema);
