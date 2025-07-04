import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-gray-800 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We'd love to hear from you! Feel free to reach out with any questions, feedback, or partnership inquiries.
        </p>
      </header>

      <section className="bg-white border border-green-200 rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Email</h2>
          <p className="text-base">
            You can contact us anytime at:{' '}
            <a
              href="mailto:bio.gewuerze@gmail.com"
              className="text-shop_dark_green font-medium underline hover:text-green-800"
            >
              bio.gewuerze@gmail.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-base">
            At Bio Gewürze, we are passionate about bringing you high-quality organic spices. We're committed to sustainability, natural farming, and delivering exceptional flavors to your kitchen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Business Hours</h2>
          <p className="text-base">
            Täglich geöffnet: 24 Stunden<br />
              
          </p>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
