import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registering required Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const LevelDistributionChart = ({ levels }) => {
  const data = {
    labels: ['Warrior', 'Rogue', 'Archer', 'Wizard'],
    datasets: [{
      label: 'Class Level Distribution',
      data: levels, // Array of levels for each class
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  return (
    <div>
      <h3>Level Distribution</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default LevelDistributionChart;
