import { useState } from "react";
import { Button } from "./Button";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [showModal, setShowModal] = useState(false);

  const { setIsSubscribed } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubscribe = (choice) => {
    setShowModal(false);
    if (choice === "yes") {
      setIsSubscribed(true);
      navigate("/upload");   
    }
  };

  return (
    <main className="bg-[#0B0F1A] text-white  h-[700px] w-full flex justify-center items-center">
      <section className="bg-[#111827] p-8 rounded-2xl shadow-lg w-full max-w-lg ">
        <h1 className="text-3xl font-bold mb-6 text-center">What are you waiting for <p>Join us Now </p></h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-[#1F2937] text-white border border-gray-600"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-[#1F2937] text-white border border-gray-600"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">UPI ID</label>
              <input
                type="text"
                name="upi"
                value={formData.upi}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded bg-[#1F2937] text-white border border-gray-600"
              />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Card Expiry (for auto-deduction)</label>
              <input
                type="date"
                name="exp"
                value={formData.exp}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded bg-[#1F2937] text-white border border-gray-600"
              />
          </div>
          <div>
            <h1>Subscription Details </h1>
            <div className="text-sm  p-4 rounded-lg bg-white/15">
              <p>We have a monthly subscription plan of $19, based on the company details we can give you some special discount.</p>
              <p>For further details contact us directly <a className="text-blue-500 underline" href="/contact">Contact us</a></p>
            </div>
          </div>
          <Button type="submit" className="w-full bg-white text-black">
            Submit
          </Button>
        </form>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-[#111827] p-6 rounded-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Subscription Required</h2>
            <p className="text-gray-300 mb-6">
              To continue, please subscribe for <strong>$19/month</strong>.
            </p>
            <p className="text-gray-300 mb-6">
              name : {formData.name}<br/>
              emial: {formData.email}<br/>
              UPI : {formData.upi}
            </p>

            <div className="flex justify-around">
              <Button
                className="bg-green-500 text-white"
                onClick={() => handleSubscribe("yes")}
              >
                Pay & Subscribe
              </Button>
              <Button
                className="bg-red-500 text-white"
                onClick={() => handleSubscribe("no")}
              >
                No, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
