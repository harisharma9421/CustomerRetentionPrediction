import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, ComposedChart, Area, AreaChart, Legend, Cell
} from 'recharts';
import { Award, TrendingUp, Target, Zap, BarChart3, Info } from 'lucide-react';
import { modelPerformance } from '../data/config';

const ModelMetrics = () => {
  const [selectedMetric, setSelectedMetric] = useState('all');

  const metrics = ['accuracy', 'precision', 'recall', 'f1', 'roc'];
  const metricLabels = {
    accuracy: 'Accuracy',
    precision: 'Precision',
    recall: 'Recall',
    f1: 'F1-Score',
    roc: 'ROC-AUC'
  };

  // Prepare data for different chart types
  const barChartData = modelPerformance.map(model => ({
    name: model.name.length > 20 ? model.name.substring(0, 20) + '...' : model.name,
    fullName: model.name,
    Accuracy: model.accuracy,
    Precision: model.precision,
    Recall: model.recall,
    'F1-Score': model.f1,
    'ROC-AUC': model.roc,
  }));

  const radarData = modelPerformance.map(model => ({
    model: model.name.length > 15 ? model.name.substring(0, 15) : model.name,
    Accuracy: model.accuracy,
    Precision: model.precision,
    Recall: model.recall,
    'F1-Score': model.f1,
    'ROC-AUC': model.roc,
  }));

  const lineChartData = modelPerformance.map(model => ({
    name: model.name.length > 15 ? model.name.substring(0, 15) + '...' : model.name,
    fullName: model.name,
    Accuracy: model.accuracy,
    Precision: model.precision,
    Recall: model.recall,
    'F1-Score': model.f1,
    'ROC-AUC': model.roc,
  }));

  // Calculate average for each metric
  const averages = {
    Accuracy: (modelPerformance.reduce((sum, m) => sum + m.accuracy, 0) / modelPerformance.length).toFixed(2),
    Precision: (modelPerformance.reduce((sum, m) => sum + m.precision, 0) / modelPerformance.length).toFixed(2),
    Recall: (modelPerformance.reduce((sum, m) => sum + m.recall, 0) / modelPerformance.length).toFixed(2),
    'F1-Score': (modelPerformance.reduce((sum, m) => sum + m.f1, 0) / modelPerformance.length).toFixed(2),
    'ROC-AUC': (modelPerformance.reduce((sum, m) => sum + m.roc, 0) / modelPerformance.length).toFixed(2),
  };

  const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899', '#84cc16'];

  const filteredData = selectedMetric === 'all' 
    ? barChartData 
    : barChartData.map(item => ({
        name: item.name,
        fullName: item.fullName,
        [metricLabels[selectedMetric]]: item[metricLabels[selectedMetric]]
      }));

  return (
    <section
      id="model-metrics"
      className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-6 shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Comprehensive Model Metrics</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Detailed analysis of all machine learning models with accuracy, precision, recall, F1-Score, and ROC-AUC metrics
          </p>
        </div>

        {/* Metric Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedMetric('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              selectedMetric === 'all'
                ? 'bg-primary-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700'
            }`}
          >
            All Metrics
          </button>
          {metrics.map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedMetric === metric
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700'
              }`}
            >
              {metricLabels[metric]}
            </button>
          ))}
        </div>

        {/* Average Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {Object.entries(averages).map(([metric, value], index) => (
            <div
              key={metric}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-primary-100 dark:border-primary-900/30 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                {metric}
              </p>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {value}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Average</p>
            </div>
          ))}
        </div>

        {/* Comprehensive Bar Chart */}
        <div id="chart-model-performance" className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Model Performance Comparison
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Info className="w-4 h-4" />
              <span>All metrics displayed as percentages</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                angle={-45}
                textAnchor="end"
                height={120}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#6b7280" 
                domain={[0, 100]}
                label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: '2px solid #6366f1',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
                formatter={(value, name) => [`${value}%`, name]}
              />
              {selectedMetric === 'all' ? (
                <>
                  <Bar dataKey="Accuracy" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Precision" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Recall" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="F1-Score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ROC-AUC" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </>
              ) : (
                <Bar 
                  dataKey={metricLabels[selectedMetric]} 
                  fill="#6366f1" 
                  radius={[4, 4, 0, 0]}
                />
              )}
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart for Model Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Multi-Model Radar Comparison
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData.slice(0, 4)}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="model" stroke="#6b7280" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
                {radarData.slice(0, 4).map((item, index) => (
                  <Radar
                    key={index}
                    name={item.model}
                    dataKey="Accuracy"
                    stroke={COLORS[index]}
                    fill={COLORS[index]}
                    fillOpacity={0.6}
                  />
                ))}
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    border: '2px solid #6366f1',
                    borderRadius: '12px',
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Performance Trend Line
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  stroke="#6b7280" 
                  domain={[0, 100]}
                  label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    border: '2px solid #6366f1',
                    borderRadius: '12px',
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Line type="monotone" dataKey="Accuracy" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Precision" stroke="#22c55e" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Recall" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="F1-Score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="ROC-AUC" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Model Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modelPerformance.map((model, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-primary-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg border-2 border-primary-100 dark:border-primary-900/30 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {model.name}
                </h4>
                {model.accuracy === 100 && (
                  <Award className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Accuracy</span>
                  <span className="font-bold text-primary-600 dark:text-primary-400">{model.accuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Precision</span>
                  <span className="font-bold text-accent-600 dark:text-accent-400">{model.precision}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Recall</span>
                  <span className="font-bold text-orange-500">{model.recall}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">F1-Score</span>
                  <span className="font-bold text-purple-500">{model.f1}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">ROC-AUC</span>
                  <span className="font-bold text-red-500">{model.roc}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelMetrics;

