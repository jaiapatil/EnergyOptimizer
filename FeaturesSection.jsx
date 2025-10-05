import { Zap, LineChart, RefreshCw, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6 text-green-500" />,
    title: 'Reduce Energy Costs',
    description: 'AI-powered optimization reduces energy consumption by up to 30%'
  },
  {
    icon: <LineChart className="w-6 h-6 text-green-500" />,
    title: 'Real-time Analytics',
    description: 'Monitor energy usage patterns with live dashboards and insights'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    title: 'Predictive Maintenance',
    description: 'Prevent equipment failures with AI-driven maintenance scheduling'
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-green-500" />,
    title: 'Smart Scheduling',
    description: 'Optimize operations based on tariff rates and energy demand'
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 px-6 bg-[#0B0F1A]">
      <h3 className="text-2xl font-bold text-center mb-4">Powerful Features for Energy Management</h3>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Our comprehensive platform provides everything you need to optimize energy consumption across your industrial operations.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-[#111827] p-6 rounded-lg text-center">
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h4 className="font-semibold mb-2 text-white">{feature.title}</h4>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
