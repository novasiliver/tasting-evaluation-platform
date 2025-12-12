'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit contact form');
      }

      const data = await response.json();
      setSuccess(data.message || 'Thank you for contacting us! We will respond within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      setError(error.message || 'Failed to submit contact form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-40 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-100/50 rounded-[100%] blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-semibold text-stone-600 mb-8">
            <iconify-icon icon="lucide:mail" width="14" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            Get in Touch
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-6 font-heading">
            Let's start a conversation
          </h1>
          
          <p className="text-lg text-stone-500 leading-relaxed max-w-2xl mx-auto">
            Have questions about our evaluation process? Interested in submitting a product? We're here to help. Reach out and our team will respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-stone-200 p-8 md:p-10 shadow-sm">
                <h2 className="text-2xl font-semibold text-stone-900 tracking-tight mb-2 font-heading">Send us a message</h2>
                <p className="text-stone-500 text-sm mb-8">Fill out the form below and we'll get back to you shortly.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Company Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Smith" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-stone-700 mb-2">Company</label>
                      <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Acme Foods Inc." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">Email Address</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@acmefoods.com" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">Subject</label>
                    <select id="subject" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all">
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="submission">Submission Question</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                    <textarea id="message" name="message" required rows={6} value={formData.message} onChange={handleChange} placeholder="Tell us how we can help you..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none" />
                  </div>

                  {/* Error/Success Messages */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}
                  {success && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <p className="text-sm text-emerald-700">{success}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <iconify-icon icon="lucide:loader-2" width="18" className="animate-spin" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        Sending...
                      </>
                    ) : (
                      <>
                        <iconify-icon icon="lucide:send" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Details */}
              <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-stone-900 tracking-tight mb-6 font-heading">Contact Details</h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                      <iconify-icon icon="lucide:mail" width="18" className="text-stone-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 mb-1">Email</h4>
                      <p className="text-sm text-stone-500">hello@metric.ai</p>
                      <p className="text-xs text-stone-400 mt-1">Response within 24 hours</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                      <iconify-icon icon="lucide:phone" width="18" className="text-stone-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 mb-1">Phone</h4>
                      <p className="text-sm text-stone-500">+1 (555) 123-4567</p>
                      <p className="text-xs text-stone-400 mt-1">Mon-Fri, 9 AM - 5 PM EST</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                      <iconify-icon icon="lucide:map-pin" width="18" className="text-stone-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 mb-1">Location</h4>
                      <p className="text-sm text-stone-500">New York, NY</p>
                      <p className="text-xs text-stone-400 mt-1">By appointment only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-stone-50 rounded-3xl border border-stone-200 p-8">
                <h3 className="text-lg font-semibold text-stone-900 tracking-tight mb-4 font-heading">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/submit" className="flex items-center gap-2 text-sm text-stone-600 hover:text-orange-600 transition-colors">
                      <iconify-icon icon="lucide:arrow-right" width="14" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      Submit Your Product
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="flex items-center gap-2 text-sm text-stone-600 hover:text-orange-600 transition-colors">
                      <iconify-icon icon="lucide:arrow-right" width="14" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      View Our Services
                    </a>
                  </li>
                  <li>
                    <a href="/awards" className="flex items-center gap-2 text-sm text-stone-600 hover:text-orange-600 transition-colors">
                      <iconify-icon icon="lucide:arrow-right" width="14" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      Award Information
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="flex items-center gap-2 text-sm text-stone-600 hover:text-orange-600 transition-colors">
                      <iconify-icon icon="lucide:arrow-right" width="14" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      About Tastecert
                    </a>
                  </li>
                </ul>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-stone-900 tracking-tight mb-4 font-heading">Common Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 mb-1">How long does evaluation take?</h4>
                    <p className="text-xs text-stone-500">Standard evaluation takes 2-3 weeks from sample receipt. Rush options available.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 mb-1">What is the cost?</h4>
                    <p className="text-xs text-stone-500">Standard evaluation starts at $850. Contact us for detailed pricing.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 mb-1">Can I visit your lab?</h4>
                    <p className="text-xs text-stone-500">Yes! Schedule a facility tour to see our evaluation process firsthand.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
