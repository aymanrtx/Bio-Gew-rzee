import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-gray-800 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Terms and Conditions</h1>
      </header>

      <section className="space-y-8 text-lg leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Bio Gewürze's services, you agree to be bound by these Terms and Conditions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Use of Services</h2>
          <p>
            You agree to use Bio Gewürze's services only for lawful purposes and in accordance with these Terms and Conditions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
          <p>
            All content and materials available on Bio Gewürze's services are the property of Bio Gewürze and are protected by applicable intellectual property laws.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Limitation of Liability</h2>
          <p>
            Bio Gewürze shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which Bio Gewürze operates.
          </p>
        </div>
      </section>
    </main>
  );
};

export default TermsPage;
