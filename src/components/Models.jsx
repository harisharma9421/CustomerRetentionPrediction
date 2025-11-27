import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, TrendingUp, Target, Zap } from 'lucide-react';
import { modelPerformance, bestModel } from '../data/config';

const Models = () => {
  const chartData = modelPerformance.map(model => ({
    name: model.name.length > 15 ? model.name.substring(0, 15) + '...' : model.name,
    Accuracy: model.accuracy,
    Precision: model.precision,
    Recall: model.recall,
    'F1-Score': model.f1,
    'ROC-AUC': model.roc,
  }));

  return (
    <section
      id="models"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Model Performance</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Comprehensive evaluation of 8 machine learning models
          </p>
        </div>

        {/* Best Model Highlight */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white p-8 rounded-2xl shadow-xl mb-12">
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-8 h-8" />
                <h3 className="text-3xl font-bold">Best Performing Model</h3>
              </div>
              <h4 className="text-4xl font-bold mb-4">{bestModel.name}</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-primary-100 text-sm mb-1">Accuracy</p>
                  <p className="text-2xl font-bold">{bestModel.metrics.accuracy}%</p>
                </div>
                <div>
                  <p className="text-primary-100 text-sm mb-1">Precision</p>
                  <p className="text-2xl font-bold">{bestModel.metrics.precision}%</p>
                </div>
                <div>
                  <p className="text-primary-100 text-sm mb-1">Recall</p>
                  <p className="text-2xl font-bold">{bestModel.metrics.recall}%</p>
                </div>
                <div>
                  <p className="text-primary-100 text-sm mb-1">F1-Score</p>
                  <p className="text-2xl font-bold">{bestModel.metrics.f1}%</p>
                </div>
                <div>
                  <p className="text-primary-100 text-sm mb-1">ROC-AUC</p>
                  <p className="text-2xl font-bold">{bestModel.metrics.roc}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Comparison Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Model Performance Comparison
          </h3>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis stroke="#6b7280" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="Accuracy" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Precision" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Recall" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="F1-Score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ROC-AUC" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Model Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
              Feature Engineering
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              TotalSpending, NumUniqueItems, NumOrders, Recency, and Country encoding
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
              Ensemble Methods
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Voting and Stacking classifiers combining multiple base models
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
              Model Selection
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive evaluation using multiple metrics for optimal model selection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Models;

