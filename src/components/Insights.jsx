import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, ShoppingCart, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { projectStats } from '../data/config';

const Insights = () => {
  const stats = [
    {
      icon: Users,
      label: 'Total Customers',
      value: projectStats.totalCustomers,
      change: '+12%',
      color: 'text-blue-500',
    },
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: projectStats.totalTransactions,
      change: '+8%',
      color: 'text-green-500',
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: projectStats.totalRevenue,
      change: '+15%',
      color: 'text-purple-500',
    },
    {
      icon: TrendingUp,
      label: 'Repeat Rate',
      value: projectStats.repeatRate,
      change: '+5%',
      color: 'text-orange-500',
    },
  ];

  return (
    <section
      id="insights"
      className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Key Insights</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover patterns and trends in customer behavior
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-green-500">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Preview Section */}
        <div className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                  Comprehensive Data Visualizations
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Explore detailed charts and graphs including customer retention distribution, 
                sales trends, top products, spending analysis, and feature comparisons.
              </p>
              <Link
                to="/charts"
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>View All Charts</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Charts Available</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">8+</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Data Points</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">10K+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;

