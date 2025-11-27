import React from 'react';
import { Database, Target, Zap, BarChart } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Database,
      title: 'Data Processing',
      description: 'Processed 541K+ transactions with advanced feature engineering including RFM analysis',
    },
    {
      icon: Target,
      title: 'Customer Segmentation',
      description: 'Identify repeat customers using TotalSpending, NumOrders, Recency, and Country features',
    },
    {
      icon: Zap,
      title: 'ML Models',
      description: '8 different models including Logistic Regression, Random Forest, Ensemble methods, and more',
    },
    {
      icon: BarChart,
      title: 'Performance Metrics',
      description: 'Comprehensive evaluation with Accuracy, Precision, Recall, F1-Score, and ROC-AUC metrics',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About the Project</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive machine learning project analyzing customer retention and purchase behavior
            in online retail to predict repeat customers and optimize business strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Project Overview
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This project analyzes an online retail dataset containing over 541,000 transactions
              to predict customer retention. Using advanced feature engineering and multiple machine
              learning models, we identify patterns that help businesses understand which customers
              are likely to make repeat purchases.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Key Objectives
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                Predict customer retention probability
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                Analyze purchase behavior patterns
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                Compare multiple ML model performances
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                Provide actionable business insights
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 card-hover"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

