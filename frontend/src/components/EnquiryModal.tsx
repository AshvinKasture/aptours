import React, { useState, useEffect, useRef } from 'react';
import { useEnquiryModal } from '../contexts/EnquiryModalContext';

const EnquiryModal: React.FC = () => {
  const { isOpen, closeModal, submitStatus, setSubmitStatus } = useEnquiryModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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
    setSubmitStatus('');
    
    try {
      const submitFormData = new FormData();
      
      // Add Web3Forms access key
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      console.log('Environment check:', {
        hasAccessKey: !!accessKey,
        accessKeyLength: accessKey?.length,
        allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
      });
      
      if (!accessKey) {
        throw new Error(`Web3Forms access key not configured. Available env vars: ${Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')).join(', ')}`);
      }
      submitFormData.append("access_key", accessKey);
      
      // Add form fields
      submitFormData.append("name", formData.name);
      submitFormData.append("email", formData.email || '');
      submitFormData.append("phone", formData.phone);
      submitFormData.append("destination", formData.destination || '');
      submitFormData.append("message", formData.message);
      
      // Add additional fields for better organization
      submitFormData.append("subject", "New Trek Enquiry from AP Tours Website");
      submitFormData.append("from_name", "AP Tours Contact Form");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitFormData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("Form Submitted Successfully");
        alert('Thank you for your enquiry! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          destination: '',
          message: ''
        });
        closeModal();
      } else {
        console.error("Form submission error:", data);
        setSubmitStatus(data.message || "Failed to send enquiry");
        alert('Sorry, there was an error sending your enquiry. Please try again.');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("Failed to send enquiry");
      alert('Sorry, there was an error sending your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle click outside modal to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      closeModal();
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className={`relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header with Close Button */}
        <div className="sticky top-0 z-10 bg-white rounded-t-2xl border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-md">
                <i className="fas fa-paper-plane text-white"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Send Your Enquiry</h2>
                <p className="text-sm text-slate-600">We'll respond within 24-48 hours</p>
              </div>
            </div>
            
            {/* Close Button - Always visible */}
            <button
              onClick={closeModal}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500 hover:text-slate-700"
              aria-label="Close modal"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-6" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {/* Info Banner */}
          <div className="bg-sky-50 rounded-lg p-4 border border-sky-200 mb-6">
            <p className="text-sm text-sky-800">
              <i className="fas fa-info-circle mr-2"></i>
              Include your preferred dates, group size, and any specific requirements to help us create the perfect itinerary for you.
            </p>
          </div>

          {/* Status Message */}
          {submitStatus && (
            <div className={`rounded-lg p-4 mb-6 border ${
              submitStatus.includes('Successfully') 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <p className="text-sm">
                <i className={`fas ${submitStatus.includes('Successfully') ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
                {submitStatus}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-slate-800 bg-white placeholder-slate-400"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="modal-phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="modal-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-slate-800 bg-white placeholder-slate-400"
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address 
                <span className="text-slate-400 font-normal ml-2">(optional)</span>
              </label>
              <input
                type="email"
                id="modal-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-slate-800 bg-white placeholder-slate-400"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="modal-destination" className="block text-sm font-medium text-slate-700 mb-2">
                Interested Destination/Trek 
                <span className="text-slate-400 font-normal ml-2">(optional)</span>
              </label>
              <select
                id="modal-destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-slate-800 bg-white"
              >
                <option value="" className="text-slate-400">Select a destination</option>
                <option value="everest-base-camp" className="text-slate-800">Everest Base Camp Trek</option>
                <option value="kailash-manas-sarovar-parakrima" className="text-slate-800">Kailash Manas Sarovar Parikrama</option>
                <option value="annapurna-base-camp-trek" className="text-slate-800">Annapurna Base Camp Trek</option>
                <option value="nepal-tours" className="text-slate-800">Nepal Tours</option>
                <option value="custom" className="text-slate-800">Custom Itinerary</option>
                <option value="other" className="text-slate-800">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="modal-message" className="block text-sm font-medium text-slate-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="modal-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors resize-none text-slate-800 bg-white placeholder-slate-400"
                placeholder="Tell us about your dream trek..."
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
              
              <button
                type="button"
                onClick={closeModal}
                className="sm:w-auto px-6 py-4 border-2 border-slate-300 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;