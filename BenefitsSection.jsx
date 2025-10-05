import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Check } from 'lucide-react';

export default function BenefitsSection() {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-6 flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4">Transform Your Energy Management</h3>
        <p className="text-gray-400 mb-6">
          Join hundreds of industrial companies already saving millions on energy costs while reducing their environmental impact.
        </p>
        <ul className="space-y-3 text-gray-300">
          {[
            "Reduce energy costs by 20–40%",
            "Improve equipment efficiency",
            "Minimize carbon footprint",
            "Automated reporting & compliance",
            "Predictive failure detection",
            "24/7 monitoring & alerts"
          ].map((text, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="text-green-400" size={16}/> {text}
            </li>
          ))}
        </ul>
        <Button onClick={() => navigate("/start")}  className="mt-6 bg-green-500 hover:bg-green-600 text-black cursor-pointer">Get Started Today →</Button>
      </div>

      <div className="flex-1 bg-[#111827] p-6 rounded-lg">
        <h4 className="text-white font-bold mb-4">💲 Estimated Savings</h4>
        <p className="text-gray-400 text-sm mb-4">Based on your industry average</p>
        <div className="text-white space-y-2">
          <p>Monthly Energy Costs: <span className="text-white font-semibold">$50,000</span></p>
          <p className="text-green-400">Projected Savings (30%): $15,000/month</p>
          <p className="font-bold">Annual Savings: <span className="text-green-500">$180,000</span></p>
        </div>
      </div>
    </section>
  );
}
