import React from 'react';

const ContactSection: React.FC = () => {
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
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Let's Start Planning Your Journey</h3>
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                We're here to help you create unforgettable memories. Reach out to us through any of the following channels, 
                and we'll get back to you within 24–48 hours with a personalized itinerary and quote.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Office Location Card */}
              <div className="lg:col-span-3 flex items-start gap-4 p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100">
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
                      href="https://www.google.com/maps/search/?api=1&query=Samarth+Carina+Commercial+Thergaon+Mulshi+Pune+411033+Maharashtra+India" 
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
                  <a href="mailto:aptourstravelspune@gmail.com" className="text-emerald-600 text-sm hover:text-emerald-800 transition-colors">
                    aptourstravelspune@gmail.com
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
                  <a href="tel:+919270248887" className="text-purple-600 text-sm hover:text-purple-800 transition-colors">
                    +91 92702 48887
                  </a>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-orange-100">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <i className="fas fa-clock text-white"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 mb-1">Working Hours</h4>
                  <div className="text-orange-600 text-sm">
                    <div>Mon - Sat: 9:00 AM - 6:00 PM</div>
                    <div>Sun: 10:00 AM - 4:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <h4 className="font-semibold text-slate-800 mb-4">Follow Our Adventures</h4>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  title="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/ap_tourstravels?utm_source=qr&igsh=MTZ0dmhuZmVvY2Z5YQ=="
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white hover:from-pink-600 hover:to-rose-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  title="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://wa.me/919270248887"
                  className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  title="WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
