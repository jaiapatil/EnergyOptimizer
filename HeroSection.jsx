import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Zap } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="text-center py-20 px-6">
      <div className="inline-flex items-center gap-2 bg-green-900/20 text-green-400 px-4 py-1 rounded-full mb-4">
        <Zap className="w-6 h-6 text-green-500" />
        <span>AI-Powered Energy Optimization</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Optimize Your Industrial <br /> Energy Consumption
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Leverage advanced AI algorithms to reduce energy costs, improve efficiency,
        and achieve sustainability goals with real-time monitoring and predictive analytics.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={() => navigate("/contact")} className="bg-green-500 hover:bg-green-600 text-black cursor-pointer">Start Optimizing Now →</Button>
        <Button onClick={() => navigate("/dashboard")} variant="outline" className="text-white border border-gray-600 cursor-pointer">View Demo Dashboard</Button>
      </div>

      <div className="flex justify-center gap-10 mt-12 text-green-400">
        <div className="text-center">
          <p className="text-2xl font-bold">30%</p>
          <p className="text-sm text-gray-400">Average Cost Reduction</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">24/7</p>
          <p className="text-sm text-gray-400">Real-time Monitoring</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">99%</p>
          <p className="text-sm text-gray-400">System Uptime</p>
        </div>
      </div>
    </section>
  );
}
