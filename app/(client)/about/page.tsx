import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 font-sans text-gray-800">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">About Bio Gewürze</h1>
      </header>

      <section className="text-lg leading-relaxed space-y-6">
        <p>
          Bio Gewürze refers to organic spices that are cultivated without the use of synthetic pesticides, herbicides, or chemical fertilizers.
          These spices are grown using sustainable farming practices that promote soil health and biodiversity.
        </p>
        <p>
          Using bio gewürze in cooking not only enhances the flavor and aroma of dishes but also supports environmentally friendly agriculture.
          These spices are carefully harvested and processed to retain their natural qualities and nutritional benefits.
        </p>
        <p>
          Whether you are a professional chef or a home cook, incorporating bio gewürze into your recipes is a great way to enjoy authentic,
          high-quality flavors while contributing to a healthier planet.
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
