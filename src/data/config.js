// Dynamic data configuration - Update this file to reflect changes in the frontend

export const projectStats = {
  totalTransactions: '397K+',
  totalCustomers: '4,339',
  totalRevenue: '$8.2M',
  repeatRate: '65.57%',
  totalModels: 8,
  accuracy: '99%+',
};

export const repeatCustomerData = [
  { name: 'Repeat Customers', value: 65.57, color: '#6366f1' },
  { name: 'One-time Customers', value: 34.43, color: '#64748b' },
];

export const topProducts = [
  { name: 'WHITE HANGING HEART T-LIGHT HOLDER', quantity: 1800 },
  { name: 'REGENCY CAKESTAND 3 TIER', quantity: 1650 },
  { name: 'JUMBO BAG RED RETROSPOT', quantity: 1500 },
  { name: 'PARTY BUNTING', quantity: 1400 },
  { name: 'LUNCH BAG RED RETROSPOT', quantity: 1300 },
  { name: 'ASSORTED COLOUR BIRD ORNAMENT', quantity: 1250 },
  { name: 'SET OF 3 CAKE TINS PANTRY DESIGN', quantity: 1200 },
  { name: 'PACK OF 72 RETROSPOT CAKE CASES', quantity: 1150 },
  { name: 'PAPER CHAIN KIT 50\'S CHRISTMAS', quantity: 1100 },
  { name: 'POPCORN HOLDER', quantity: 1050 },
];

export const monthlySales = [
  { month: 'Jan', sales: 450000 },
  { month: 'Feb', sales: 520000 },
  { month: 'Mar', sales: 480000 },
  { month: 'Apr', sales: 610000 },
  { month: 'May', sales: 580000 },
  { month: 'Jun', sales: 550000 },
  { month: 'Jul', sales: 620000 },
  { month: 'Aug', sales: 590000 },
  { month: 'Sep', sales: 640000 },
  { month: 'Oct', sales: 680000 },
  { month: 'Nov', sales: 720000 },
  { month: 'Dec', sales: 750000 },
];

export const modelPerformance = [
  { 
    name: 'Logistic Regression', 
    accuracy: 99.42, 
    precision: 100, 
    recall: 99.13, 
    f1: 99.56, 
    roc: 99.99 
  },
  { 
    name: 'Decision Tree', 
    accuracy: 100, 
    precision: 100, 
    recall: 100, 
    f1: 100, 
    roc: 100 
  },
  { 
    name: 'Random Forest', 
    accuracy: 100, 
    precision: 100, 
    recall: 100, 
    f1: 100, 
    roc: 100 
  },
  { 
    name: 'K-Nearest Neighbors', 
    accuracy: 95.97, 
    precision: 96.40, 
    recall: 97.57, 
    f1: 96.99, 
    roc: 98.93 
  },
  { 
    name: 'Support Vector Machine', 
    accuracy: 77.88, 
    precision: 77.70, 
    recall: 93.59, 
    f1: 84.91, 
    roc: 87.78 
  },
  { 
    name: 'AdaBoost', 
    accuracy: 100, 
    precision: 100, 
    recall: 100, 
    f1: 100, 
    roc: 100 
  },
  { 
    name: 'Voting Classifier', 
    accuracy: 100, 
    precision: 100, 
    recall: 100, 
    f1: 100, 
    roc: 100 
  },
  { 
    name: 'Stacking Classifier', 
    accuracy: 100, 
    precision: 100, 
    recall: 100, 
    f1: 100, 
    roc: 100 
  },
];

export const bestModel = {
  name: 'Random Forest',
  metrics: {
    accuracy: 100,
    precision: 100,
    recall: 100,
    f1: 100,
    roc: 100,
  },
};

export const topSpendingCustomers = [
  { customerId: '18102', spending: 279489.02 },
  { customerId: '17450', spending: 194905.23 },
  { customerId: '16446', spending: 168472.50 },
  { customerId: '14911', spending: 143825.06 },
  { customerId: '12415', spending: 141396.88 },
  { customerId: '14646', spending: 140576.88 },
  { customerId: '15311', spending: 132572.62 },
  { customerId: '14606', spending: 125933.12 },
  { customerId: '13089', spending: 123725.12 },
  { customerId: '14156', spending: 122317.58 },
];

export const featureComparison = {
  repeatCustomers: {
    avgSpending: 2500,
    avgItems: 45,
    avgOrders: 5,
    avgRecency: 30,
  },
  oneTimeCustomers: {
    avgSpending: 800,
    avgItems: 12,
    avgOrders: 1,
    avgRecency: 180,
  },
};

