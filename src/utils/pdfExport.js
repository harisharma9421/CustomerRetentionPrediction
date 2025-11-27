import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  projectStats, 
  modelPerformance, 
  bestModel, 
  repeatCustomerData,
  topProducts,
  monthlySales,
  topSpendingCustomers,
  featureComparison
} from '../data/config';

export const generatePDF = async () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  let yPosition = margin;

  // Helper function to add a new page if needed
  const checkNewPage = (requiredHeight) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to add text with word wrap
  const addText = (text, fontSize, isBold = false, color = [0, 0, 0]) => {
    pdf.setFontSize(fontSize);
    pdf.setTextColor(color[0], color[1], color[2]);
    if (isBold) {
      pdf.setFont(undefined, 'bold');
    } else {
      pdf.setFont(undefined, 'normal');
    }
    
    const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
    lines.forEach((line) => {
      checkNewPage(7);
      pdf.text(line, margin, yPosition);
      yPosition += 7;
    });
  };

  // Helper function to capture and add chart image
  const addChartImage = async (chartId, title, description = '') => {
    try {
      let element = document.getElementById(chartId);
      
      // If not found, try to find by class or scroll to section
      if (!element) {
        // Try to find the chart container
        const chartContainer = document.querySelector('[id*="' + chartId.replace('chart-', '') + '"]');
        if (chartContainer) {
          element = chartContainer;
        } else {
          console.warn('Chart element not found:', chartId);
          return;
        }
      }

      // Scroll element into view
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Wait for chart to render and scroll to complete
      await new Promise(resolve => setTimeout(resolve, 1500));

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      checkNewPage(imgHeight + 30);

      if (title) {
        addText(title, 14, true, [99, 102, 241]);
        yPosition += 3;
      }

      if (description) {
        addText(description, 10, false);
        yPosition += 3;
      }

      pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 10;
    } catch (error) {
      console.error('Error capturing chart:', error);
      // Add a placeholder text if chart capture fails
      if (title) {
        checkNewPage(20);
        addText(title + ' (Chart could not be captured)', 12, true, [99, 102, 241]);
        yPosition += 5;
      }
    }
  };

  // Cover Page
  pdf.setFillColor(99, 102, 241);
  pdf.rect(0, 0, pageWidth, 60, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(28);
  pdf.setFont(undefined, 'bold');
  pdf.text('Customer Retention Analysis', pageWidth / 2, 30, { align: 'center' });
  
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'normal');
  pdf.text('AI/ML Project Report', pageWidth / 2, 45, { align: 'center' });
  
  pdf.addPage();
  yPosition = margin;

  // Table of Contents
  addText('Table of Contents', 20, true, [99, 102, 241]);
  yPosition += 5;
  addText('1. Executive Summary', 12, false);
  addText('2. Project Overview', 12, false);
  addText('3. Key Statistics', 12, false);
  addText('4. Model Performance Analysis', 12, false);
  addText('5. Customer Insights & Visualizations', 12, false);
  addText('6. Sales Analysis & Charts', 12, false);
  addText('7. Product Analysis & Charts', 12, false);
  addText('8. Feature Comparison & Charts', 12, false);
  addText('9. Conclusion', 12, false);

  pdf.addPage();
  yPosition = margin;

  // 1. Executive Summary
  addText('1. Executive Summary', 18, true, [99, 102, 241]);
  yPosition += 5;
  const execSummary = 'This comprehensive analysis presents the results of a machine learning project focused on customer retention and purchase behavior prediction in online retail. The project analyzed ' + projectStats.totalTransactions + ' transactions from ' + projectStats.totalCustomers + ' customers, achieving ' + projectStats.accuracy + ' accuracy in predicting repeat customers. The analysis utilized 8 different machine learning models, with ' + bestModel.name + ' emerging as the best-performing model with perfect scores across all metrics.';
  addText(execSummary, 11, false);
  yPosition += 5;

  // 2. Project Overview
  addText('2. Project Overview', 18, true, [99, 102, 241]);
  yPosition += 5;
  addText(
    'The project aims to predict customer retention by analyzing various features including total spending, number of unique items, number of orders, recency, and country. The dataset was processed and cleaned, removing invalid entries and cancelled orders. Feature engineering was performed to create customer-level aggregations that capture purchasing behavior patterns.',
    11,
    false
  );
  yPosition += 5;
  addText('Key Objectives:', 12, true);
  addText('• Predict customer retention probability', 11, false);
  addText('• Analyze purchase behavior patterns', 11, false);
  addText('• Compare multiple ML model performances', 11, false);
  addText('• Provide actionable business insights', 11, false);

  pdf.addPage();
  yPosition = margin;

  // 3. Key Statistics
  addText('3. Key Statistics', 18, true, [99, 102, 241]);
  yPosition += 5;
  
  const stats = [
    ['Total Transactions', projectStats.totalTransactions],
    ['Total Customers', projectStats.totalCustomers],
    ['Total Revenue', projectStats.totalRevenue],
    ['Repeat Customer Rate', projectStats.repeatRate],
    ['Number of ML Models', projectStats.totalModels.toString()],
    ['Best Model Accuracy', projectStats.accuracy],
  ];

  pdf.setFontSize(11);
  stats.forEach(([label, value]) => {
    checkNewPage(10);
    pdf.setFont(undefined, 'bold');
    pdf.text(label + ':', margin, yPosition);
    pdf.setFont(undefined, 'normal');
    pdf.text(value, margin + 80, yPosition);
    yPosition += 10;
  });

  pdf.addPage();
  yPosition = margin;

  // 4. Model Performance Analysis
  addText('4. Model Performance Analysis', 18, true, [99, 102, 241]);
  yPosition += 5;
  
  addText('Best Performing Model: ' + bestModel.name, 14, true);
  yPosition += 5;
  
  addText('Model Metrics:', 12, true);
  pdf.setFontSize(11);
  Object.entries(bestModel.metrics).forEach(([metric, value]) => {
    checkNewPage(8);
    pdf.setFont(undefined, 'bold');
    pdf.text(metric + ':', margin, yPosition);
    pdf.setFont(undefined, 'normal');
    pdf.text(value + '%', margin + 60, yPosition);
    yPosition += 8;
  });

  yPosition += 5;
  addText('All Models Performance:', 12, true);
  yPosition += 3;

  // Create table for all models
  pdf.setFontSize(9);
  const tableHeaders = ['Model', 'Accuracy', 'Precision', 'Recall', 'F1-Score', 'ROC-AUC'];
  const colWidths = [60, 20, 20, 20, 20, 20];
  let xPosition = margin;

  // Draw table header
  pdf.setFillColor(99, 102, 241);
  pdf.rect(xPosition, yPosition - 5, pageWidth - 2 * margin, 8, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont(undefined, 'bold');
  tableHeaders.forEach((header, i) => {
    pdf.text(header, xPosition + 2, yPosition);
    xPosition += colWidths[i];
  });

  yPosition += 8;
  pdf.setTextColor(0, 0, 0);
  pdf.setFont(undefined, 'normal');

  modelPerformance.forEach((model) => {
    checkNewPage(8);
    xPosition = margin;
    pdf.text(model.name.substring(0, 25), xPosition + 2, yPosition);
    xPosition += colWidths[0];
    pdf.text(model.accuracy + '%', xPosition + 2, yPosition);
    xPosition += colWidths[1];
    pdf.text(model.precision + '%', xPosition + 2, yPosition);
    xPosition += colWidths[2];
    pdf.text(model.recall + '%', xPosition + 2, yPosition);
    xPosition += colWidths[3];
    pdf.text(model.f1 + '%', xPosition + 2, yPosition);
    xPosition += colWidths[4];
    pdf.text(model.roc + '%', xPosition + 2, yPosition);
    yPosition += 8;
  });

  // Add Model Performance Chart
  await addChartImage('chart-model-performance', 'Model Performance Comparison Chart', 'Visual representation of all model metrics');

  pdf.addPage();
  yPosition = margin;

  // 5. Customer Insights
  addText('5. Customer Insights', 18, true, [99, 102, 241]);
  yPosition += 5;
  
  addText('Customer Retention Distribution:', 12, true);
  yPosition += 3;
  repeatCustomerData.forEach((item) => {
    checkNewPage(8);
    pdf.setFont(undefined, 'normal');
    const itemText = item.name + ': ' + item.value + '%';
    pdf.text(itemText, margin + 5, yPosition);
    yPosition += 8;
  });

  // Add Customer Retention Pie Chart
  await addChartImage('chart-retention', 'Customer Retention Distribution', 'Pie chart showing the distribution of repeat vs one-time customers');

  yPosition += 5;
  addText('Top 10 Spending Customers:', 12, true);
  yPosition += 3;
  pdf.setFontSize(10);
  topSpendingCustomers.forEach((customer, index) => {
    checkNewPage(8);
    const customerText = (index + 1) + '. Customer ID: ' + customer.customerId + ' - $' + customer.spending.toLocaleString();
    pdf.text(customerText, margin + 5, yPosition);
    yPosition += 8;
  });

  pdf.addPage();
  yPosition = margin;

  // 6. Sales Analysis
  addText('6. Sales Analysis', 18, true, [99, 102, 241]);
  yPosition += 5;
  
  addText('Monthly Sales Data:', 12, true);
  yPosition += 3;
  pdf.setFontSize(10);
  monthlySales.forEach((month) => {
    checkNewPage(8);
    const monthText = month.month + ': $' + month.sales.toLocaleString();
    pdf.text(monthText, margin + 5, yPosition);
    yPosition += 8;
  });

  const totalSales = monthlySales.reduce((sum, m) => sum + m.sales, 0);
  yPosition += 3;
  pdf.setFont(undefined, 'bold');
  const totalSalesText = 'Total Annual Sales: $' + totalSales.toLocaleString();
  pdf.text(totalSalesText, margin + 5, yPosition);
  yPosition += 8;

  // Add Monthly Sales Chart
  await addChartImage('chart-sales', 'Monthly Sales Trend', 'Area chart showing sales trends over time');

  pdf.addPage();
  yPosition = margin;

  // 7. Product Analysis
  addText('7. Product Analysis', 18, true, [99, 102, 241]);
  yPosition += 5;
  
  addText('Top 10 Selling Products:', 12, true);
  yPosition += 3;
  pdf.setFontSize(10);
  topProducts.forEach((product, index) => {
    checkNewPage(8);
    const productName = product.name.length > 50 ? product.name.substring(0, 50) + '...' : product.name;
    pdf.text((index + 1) + '. ' + productName, margin + 5, yPosition);
    pdf.text('   Quantity: ' + product.quantity + ' units', margin + 10, yPosition + 5);
    yPosition += 12;
  });

  // Add Top Products Chart
  await addChartImage('chart-products', 'Top 10 Selling Products', 'Bar chart showing the top selling products by quantity');

  pdf.addPage();
  yPosition = margin;

  // 8. Feature Comparison
  addText('8. Feature Comparison', 18, true, [99, 102, 241]);
  yPosition += 5;
  
  addText('Repeat Customers vs One-time Customers:', 12, true);
  yPosition += 5;
  
  const features = [
    ['Feature', 'Repeat Customers', 'One-time Customers'],
    ['Average Spending', '$' + featureComparison.repeatCustomers.avgSpending, '$' + featureComparison.oneTimeCustomers.avgSpending],
    ['Average Items', featureComparison.repeatCustomers.avgItems.toString(), featureComparison.oneTimeCustomers.avgItems.toString()],
    ['Average Orders', featureComparison.repeatCustomers.avgOrders.toString(), featureComparison.oneTimeCustomers.avgOrders.toString()],
    ['Average Recency (Days)', featureComparison.repeatCustomers.avgRecency.toString(), featureComparison.oneTimeCustomers.avgRecency.toString()],
  ];

  pdf.setFontSize(10);
  features.forEach((row, rowIndex) => {
    checkNewPage(8);
    xPosition = margin;
    row.forEach((cell, colIndex) => {
      if (rowIndex === 0) {
        pdf.setFont(undefined, 'bold');
        pdf.setFillColor(99, 102, 241);
        pdf.rect(xPosition, yPosition - 5, 60, 8, 'F');
        pdf.setTextColor(255, 255, 255);
      } else {
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(0, 0, 0);
      }
      pdf.text(cell, xPosition + 2, yPosition);
      xPosition += 60;
    });
    yPosition += 8;
  });

  // Add Feature Comparison Chart
  await addChartImage('chart-feature-comparison', 'Feature Comparison Chart', 'Comparison of features between repeat and one-time customers');
  
  // Add Sales Trend Line Chart
  await addChartImage('chart-sales-trend', 'Detailed Sales Trend Analysis', 'Line chart showing detailed monthly sales trends');

  pdf.addPage();
  yPosition = margin;

  // 9. Conclusion
  addText('9. Conclusion', 18, true, [99, 102, 241]);
  yPosition += 5;
  
  const conclusion1 = 'The analysis successfully identified patterns in customer behavior that can predict retention with high accuracy. The ' + bestModel.name + ' model achieved perfect performance across all metrics, demonstrating the effectiveness of ensemble methods in this domain.';
  addText(conclusion1, 11, false);
  yPosition += 5;
  
  addText('Key Findings:', 12, true);
  addText('• Repeat customers show significantly higher spending and order frequency', 11, false);
  addText('• Recency is a strong indicator of customer retention', 11, false);
  addText('• Multiple models achieved near-perfect performance', 11, false);
  const findingsText = '• The dataset shows a ' + projectStats.repeatRate + ' repeat customer rate';
  addText(findingsText, 11, false);
  
  yPosition += 5;
  addText(
    'This analysis provides valuable insights for businesses to optimize their customer retention strategies and identify high-value customers for targeted marketing campaigns.',
    11,
    false
  );

  // Footer on all pages
  const totalPages = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    const pageText = 'Page ' + i + ' of ' + totalPages + ' | Customer Retention Analysis Report';
    pdf.text(
      pageText,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  pdf.save('Customer_Retention_Analysis_Report.pdf');
};
