"use client";

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const HelpCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('FAQs');
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const FAQS: FAQItem[] = [
    { 
      question: 'How do I track my order?', 
      answer: 'You can track your order by logging into your account and going to the "Order History" section. Click on the order you want to track to view its status and tracking information.' 
    },
    { 
      question: 'What payment methods do you accept?', 
      answer: 'We accept all major credit cards including Visa, MasterCard, American Express, and PayPal.' 
    },
    { 
      question: 'How long will shipping take?', 
      answer: 'Standard shipping typically takes 1-3 business days. Express shipping is available for most products and usually arrives within 1-2 business days.' 
    },
    { 
      question: 'What is your return policy?', 
      answer: 'Our return policy allows returns within 30 days of receipt for a full refund or exchange. Items must be in their original condition with all packaging and tags intact.' 
    },
    { 
      question: 'Do you ship internationally?', 
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination. International orders may be subject to customs duties and taxes.' 
    },
  ];

  

 

  const toggleFAQ = (index: number) => {
    setActiveFAQ(current => current === index ? null : index);
  };

  return (
      <main className="max-w-5xl mx-auto px-4 py-8 text-gray-800 font-sans">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Help Center</h1>
        <p className="text-gray-600">
          Find answers, get support, and resolve issues with your orders.
        </p>
      </header>

      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Emergency Contact */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h2 className="text-2xl font-semibold">Emergency Contact</h2>
          </div>
          <p className="text-gray-600 mb-4">Get immediate assistance for urgent issues</p>
          <div className="space-y-2">
            <p className="font-semibold">Customer Support Hotline</p>
            <p className="text-xl font-bold">+49 15219236638</p>
            <p className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Available 24/7 for emergencies
            </p>
          </div>
        </div>

        {/* Email Support */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h2 className="text-2xl font-semibold">Email Support</h2>
          </div>
          <p className="text-gray-600 mb-4">Get help via email for non-urgent issues</p>
          <div className="space-y-2">
            <p className="font-semibold">Customer Service Email</p>
            <p className="text-xl font-bold">essenz.marokkos@gmail.com</p>
            <p className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Response within 24 hours
            </p>
          </div>
        </div>

        
      </div>      
      {/* Tabs Section */}
      <div className="mb-12">
        <div className="border-b">
          <button
            className={`px-6 py-3 ${activeTab === 'FAQs' ? 'bg-gray-100' : 'bg-white'} border-b-2 ${
              activeTab === 'FAQs' ? 'border-green-600' : 'border-transparent'
            }`}
            onClick={() => setActiveTab('FAQs')}
          >
            FAQs
          </button>
          
        </div>

        {activeTab === 'FAQs' && (
          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-8">
              Find answers to the most common questions about our services
            </p>
            {FAQS.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleFAQ(index)}>
                  <h3 className="font-semibold">{item.question}</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${
                      activeFAQ === index ? 'rotate-180' : ''
                    }`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                {activeFAQ === index && (
                  <div className="border-b pb-4 mb-4 last:border-none last:mb-0">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Orders and Returns tabs can be implemented similarly */}
      </div>
    </main>
  );
};

export default HelpCenterPage;