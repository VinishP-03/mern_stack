import React from 'react';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome to your expense dashboard</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {['Total Balance', 'Monthly Spend', 'Pending Bills', 'Savings'].map((title, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-2xl font-bold mt-2">$0.00</div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-600">Your expense data will appear here.</p>
      </div>
    </div>
  );
};

export default Dashboard;