import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your enquiry! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section 
      id="contact" 
      className="py-20 px-4 bg-gradient-to-br from-slate-100 to-slate-200"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Get in Touch</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Ready to embark on your next adventure? Let's plan your perfect mountain journey together.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Let's Start Planning Your Journey</h3>
              <p className="text-slate-600 leading-relaxed">
                Use the form to send us an enquiry about your dream trek or tour. We'll get back to you within 24–48 hours 
                with a personalized itinerary and quote.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Office Location Card */}
              <div className="col-span-1 sm:col-span-2 flex items-start gap-4 p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <i className="fas fa-map-marker-alt text-white text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 mb-2">Visit Our Office</h4>
                  <div className="text-slate-600 text-sm leading-relaxed mb-3">
                    <div className="font-semibold text-slate-800">AP Tours & Travels</div>
                    <div>Office No. 11,</div>
                    <div>Samarth Carina Commercial,</div>
                    <div>Thergaon, Mulshi,</div>
                    <div className="font-semibold text-slate-600">Pune - 411033, Maharashtra, India</div>
                  </div>
                  <div className="mt-3">
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Himalaya+Business+Centre+FC+Road+Shivajinagar+Pune+411005+Maharashtra+India" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 hover:bg-sky-100 hover:border-sky-300 transition-all duration-200 cursor-pointer"
                    >
                      <i className="fas fa-directions text-xs mr-1"></i>
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-white to-emerald-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-emerald-100">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <i className="fas fa-envelope text-white"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 mb-1">Email Us</h4>
                  <a href="mailto:info@aptours.in" className="text-emerald-600 text-sm hover:text-emerald-800 transition-colors">
                    info@aptours.in
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-purple-100">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <i className="fas fa-phone text-white"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 mb-1">Call Us</h4>
                  <a href="tel:+919822020500" className="text-purple-600 text-sm hover:text-purple-800 transition-colors">
                    +91 98220 20500
                  </a>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-4">Follow Our Adventures</h4>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  title="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white hover:from-pink-600 hover:to-rose-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  title="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  title="WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Enhanced Form */}
          <div className="space-y-6">
            {/* Form Header */}
            <div className="bg-gradient-to-br from-white to-sky-50 rounded-xl p-6 shadow-sm border border-sky-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-md">
                  <i className="fas fa-paper-plane text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Send Your Enquiry</h3>
                  <p className="text-sm text-slate-600">We'll respond within 24-48 hours</p>
                </div>
              </div>
              
              <div className="bg-sky-50 rounded-lg p-4 border border-sky-200">
                <p className="text-sm text-sky-800">
                  <i className="fas fa-info-circle mr-2"></i>
                  Include your preferred dates, group size, and any specific requirements to help us create the perfect itinerary for you.
                </p>
              </div>

              {/* Form: Replace action with your Formspree or Zoho Form endpoint */}
              <form
                className="mt-6 space-y-5"
                id="enquiryForm"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-slate-800 bg-white placeholder-slate-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number 
                      <span className="text-slate-400 font-normal ml-2">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-slate-800 bg-white placeholder-slate-400"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-slate-800 bg-white placeholder-slate-400"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-slate-700 mb-2">
                    Interested Destination/Trek 
                    <span className="text-slate-400 font-normal ml-2">(optional)</span>
                  </label>
                  <select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-slate-800 bg-white"
                  >
                    <option value="" className="text-slate-400">Select a destination</option>
                    <option value="everest-base-camp" className="text-slate-800">Everest Base Camp Trek</option>
                    <option value="kailash-mansarovar" className="text-slate-800">Mount Kailash Mansarovar</option>
                    <option value="hidden-valleys" className="text-slate-800">Hidden Himalayan Valleys</option>
                    <option value="custom" className="text-slate-800">Custom Itinerary</option>
                    <option value="other" className="text-slate-800">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors resize-none text-slate-800 bg-white placeholder-slate-400"
                    placeholder="Tell us about your dream trek..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </button>

                <div id="formStatus" className="text-center text-sm"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
