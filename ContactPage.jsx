import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { Zap } from 'lucide-react';

const ContactPage = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_zv9hylw",
      "template_ntwlxiw",
      form.current,
      "EfLZCYqszO8g8JYvD"
    ).then(
      () => { alert("Message sent successfully!"); form.current.reset(); },
      (error) => { alert("Failed to send message."); console.error(error.text); }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-cyan-600"></div>

      {/* 🔹 Main Content */}
      <div className="flex flex-col lg:flex-row gap-10 mb-10 p-5 z-10">

        {/* Left Info Card */}
        <div className="bg-[#0B0F1A] p-10 rounded-2xl border border-white/30 w-[90vw] lg:w-[600px] shadow-xl backdrop-blur-md text-white">
          <h1 className="text-2xl font-semibold mb-3 text-green-400 flex items-center gap-2">
            Track your energy consumption with us
            <Zap className="w-6 h-6 text-green-400" />
          </h1>
          <p className="mt-2 leading-relaxed">
            Energy Optimizer helps you track and optimize your daily energy
            consumption. Get detailed reports and smart suggestions to reduce
            waste and costs.
            <br />
            For our detailed subscription plan, visit{" "}
            <a className="underline text-blue-600 font-medium" href="/start">
              Get Started
            </a>.
          </p>
          <p className="mt-4">
            Energy optimizer for industrial units
          </p>
          <p className="text-sm mt-4">
            <strong>Address:</strong> <br /> D N Nagar, Andheri West, Mumbai-400053,
            Maharashtra, India
          </p>
          <p className="text-sm mt-3">
            <strong>Contact:</strong> <br /> 📞 88503 xxxxx <br /> 📧 jaipatil1210@gmail.com
          </p>
          <p className="text-sm text-red-500 mt-2">
            * Please call between 7am to 9pm
          </p>
        </div>

        {/* Right Contact Form */}
        <div className="bg-[#0B0F1A] p-10 rounded-2xl border border-white/30 shadow-xl backdrop-blur-md text-white">
          <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-5">
            <input
              className="bg-transparent w-[80vw] lg:w-[350px] rounded-lg border border-white/30 p-2 text-white outline-none focus:border-green-400 transition-all duration-300"
              type="text"
              name="name"
              placeholder="Name"
              required
            />
            <input
              className="bg-transparent w-[80vw] lg:w-[350px] rounded-lg border border-white/30 p-2 text-white outline-none focus:border-green-400 transition-all duration-300"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              className="w-[80vw] lg:w-[350px] rounded-lg border border-white/30 p-2 text-white outline-none focus:border-green-400 transition-all duration-300"
              type="number"
              name="contact"
              placeholder="Contact Number"
              required
            />
            <textarea
              className="w-[80vw] lg:w-[350px] h-[90px] rounded-lg border border-white/30 p-2 text-white outline-none focus:border-green-400 transition-all duration-300"
              placeholder="Message"
              name="message"
              required
            ></textarea>
            <button
              className="bg-green-600 p-4 rounded-lg outline-none text-lg font-medium hover:bg-green-700 transition-all duration-300"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
