import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-gray-800 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
      </header>

      <section className="space-y-8 text-lg leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Information Collection</h2>
          <p>
            We collect information you provide directly to us when using our services, as well as information about your use of our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Use of Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Information Sharing</h2>
          <p>
            We do not share your personal information with third parties except as described in this Privacy Policy or with your consent.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. Please contact us at{' '}
            <a href="mailto:essenz.marokkos@gmail.com" className="text-shop_dark_green underline hover:text-green-800">
              essenz.marokkos@gmail.com
            </a>{' '}
            for assistance with these requests.
          </p>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
