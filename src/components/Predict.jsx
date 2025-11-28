import React, { useState } from 'react';
import { Calculator, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

const Predict = () => {
  const [formData, setFormData] = useState({
    totalSpending: '',
    numUniqueItems: '',
    numOrders: '',
    recency: '',
    country: 'United Kingdom',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const countries = [
    'Australia',
    'Austria',
    'Bahrain',
    'Belgium',
    'Brazil',
    'Canada',
    'Channel Islands',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'EIRE',
    'European Community',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hong Kong',
    'Iceland',
    'India',
    'Israel',
    'Italy',
    'Japan',
    'Lebanon',
    'Lithuania',
    'Malta',
    'Netherlands',
    'Norway',
    'Poland',
    'Portugal',
    'Saudi Arabia',
    'Singapore',
    'Spain',
    'Sweden',
    'Switzerland',
    'United Arab Emirates',
    'United Kingdom',
    'USA',
  ];

  // Simulated prediction function (in real app, this would call an API)
  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Simple heuristic-based prediction (in real app, use actual model)
      const totalSpending = parseFloat(formData.totalSpending) || 0;
      const numOrders = parseInt(formData.numOrders) || 0;
      const recency = parseInt(formData.recency) || 0;

      let probability = 0.5;

      // Simple rules (in real app, use actual model prediction)
      if (numOrders > 1) probability += 0.3;
      if (totalSpending > 1000) probability += 0.2;
      if (recency < 30) probability += 0.1;
      if (totalSpending > 5000) probability += 0.1;

      probability = Math.min(probability, 0.99);
      probability = Math.max(probability, 0.01);

      const isRepeat = probability > 0.5;

      setPrediction({
        isRepeat,
        probability: (probability * 100).toFixed(2),
        confidence: probability > 0.7 ? 'high' : probability > 0.5 ? 'medium' : 'low',
      });

      setLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setPrediction(null);
  };

  return (
    <section
      id="predict"
      className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Predict Customer Retention</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Enter customer data to predict the likelihood of repeat purchases
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handlePredict} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Total Spending ($)
                </label>
                <input
                  type="number"
                  name="totalSpending"
                  value={formData.totalSpending}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter total spending"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Number of Unique Items
                </label>
                <input
                  type="number"
                  name="numUniqueItems"
                  value={formData.numUniqueItems}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter number of unique items"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Number of Orders
                </label>
                <input
                  type="number"
                  name="numOrders"
                  value={formData.numOrders}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter number of orders"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Recency (Days)
                </label>
                <input
                  type="number"
                  name="recency"
                  value={formData.recency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Days since last purchase"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Predicting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Predict Retention</span>
                </>
              )}
            </button>
          </form>

          {prediction && (
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary-50 to-white dark:from-gray-700 dark:to-gray-800 border-2 border-primary-200 dark:border-primary-800 animate-slide-up">
              <div className="flex items-start space-x-4">
                {prediction.isRepeat ? (
                  <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {prediction.isRepeat ? 'Likely Repeat Customer' : 'Unlikely to Repeat'}
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Retention Probability
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full transition-all duration-500 ${
                            prediction.isRepeat
                              ? 'bg-gradient-to-r from-green-500 to-green-600'
                              : 'bg-gradient-to-r from-orange-500 to-orange-600'
                          }`}
                          style={{ width: `${prediction.probability}%` }}
                        ></div>
                      </div>
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
                        {prediction.probability}%
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Confidence: <span className="font-semibold capitalize">{prediction.confidence}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Predict;

