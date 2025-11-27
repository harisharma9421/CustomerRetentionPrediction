import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import { ArrowLeft, TrendingUp, Download, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  repeatCustomerData, 
  topProducts, 
  monthlySales, 
  topSpendingCustomers,
  featureComparison 
} from '../data/config';
import { generatePDF } from '../utils/pdfExport';

const Charts = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleExportPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generatePDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const featureData = [
    { feature: 'Avg Spending', repeat: featureComparison.repeatCustomers.avgSpending, oneTime: featureComparison.oneTimeCustomers.avgSpending },
    { feature: 'Avg Items', repeat: featureComparison.repeatCustomers.avgItems, oneTime: featureComparison.oneTimeCustomers.avgItems },
    { feature: 'Avg Orders', repeat: featureComparison.repeatCustomers.avgOrders, oneTime: featureComparison.oneTimeCustomers.avgOrders },
    { feature: 'Avg Recency', repeat: featureComparison.repeatCustomers.avgRecency, oneTime: featureComparison.oneTimeCustomers.avgRecency },
  ];

  const radarData = [
    { metric: 'Avg Spending', repeat: featureComparison.repeatCustomers.avgSpending / 100, oneTime: featureComparison.oneTimeCustomers.avgSpending / 100 },
    { metric: 'Avg Items', repeat: featureComparison.repeatCustomers.avgItems, oneTime: featureComparison.oneTimeCustomers.avgItems },
    { metric: 'Avg Orders', repeat: featureComparison.repeatCustomers.avgOrders, oneTime: featureComparison.oneTimeCustomers.avgOrders },
    { metric: 'Avg Recency', repeat: featureComparison.repeatCustomers.avgRecency / 10, oneTime: featureComparison.oneTimeCustomers.avgRecency / 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Data Visualizations</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Comprehensive charts and graphs analyzing customer behavior
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg">
                <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="text-gray-700 dark:text-gray-300 font-semibold">Live Data</span>
              </div>
              <button
                onClick={handleExportPDF}
                disabled={isGeneratingPDF}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Export PDF Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="space-y-8">
          {/* Row 1: Customer Distribution & Monthly Sales */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Customer Retention Distribution */}
            <div id="chart-retention" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Customer Retention Distribution
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={repeatCustomerData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {repeatCustomerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Sales Trend */}
            <div id="chart-sales" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Monthly Sales Trend
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlySales}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 2: Top Products */}
          <div id="chart-products" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Top 10 Selling Products by Quantity
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280"
                  angle={-45}
                  textAnchor="end"
                  height={120}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  label={{ value: 'Quantity Sold', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="quantity" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Row 3: Top Spending Customers */}
          <div id="chart-customers" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Top 10 Customers by Total Spending
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topSpendingCustomers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="customerId" 
                  stroke="#6b7280"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Spending']}
                />
                <Bar dataKey="spending" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Row 4: Feature Comparison */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Feature Comparison Bar Chart */}
            <div id="chart-feature-comparison" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Feature Comparison: Repeat vs One-time Customers
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={featureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="feature" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="repeat" fill="#6366f1" radius={[4, 4, 0, 0]} name="Repeat Customers" />
                  <Bar dataKey="oneTime" fill="#64748b" radius={[4, 4, 0, 0]} name="One-time Customers" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Chart */}
            <div id="chart-radar" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Customer Behavior Radar
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                  <PolarRadiusAxis angle={90} domain={[0, 50]} stroke="#6b7280" />
                  <Radar
                    name="Repeat Customers"
                    dataKey="repeat"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="One-time Customers"
                    dataKey="oneTime"
                    stroke="#64748b"
                    fill="#64748b"
                    fillOpacity={0.6}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 5: Sales Trend Line Chart */}
          <div id="chart-sales-trend" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Detailed Sales Trend Analysis
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;

