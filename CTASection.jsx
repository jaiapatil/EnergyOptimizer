import { useNavigate } from 'react-router-dom';
import { Button } from './Button.jsx';

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-r from-green-600 to-cyan-600 text-black text-center py-16 px-6">
      <h3 className="text-2xl font-bold mb-4">Ready to Optimize Your Energy Consumption?</h3>
      <p className="text-black mb-8">
        Start your free trial today and see how AI can transform your industrial energy management.
      </p>
      <div className="flex justify-center gap-4">
        <Button onClick={() => navigate("/start")} className="bg-black text-white">Start Free Trial</Button>
        <Button onClick={() => navigate("/contact")} className="bg-black text-white">Contact Sales</Button>
      </div>
    </section>
  );
}
