import React from 'react';

const ExpenseChart = () => {
  const data = [
    { day: 'Mon', amount: 320 },
    { day: 'Tue', amount: 460 },
    { day: 'Wed', amount: 210 },
    { day: 'Thu', amount: 580 },
    { day: 'Fri', amount: 390 },
    { day: 'Sat', amount: 640 },
    { day: 'Sun', amount: 420 },
  ];

  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <div>
      <div className="flex items-end h-48 space-x-2 mt-8">
        {data.map((item, index) => {
          const height = (item.amount / maxAmount) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex justify-center">
                <div
                  className="w-10 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                  style={{ height: `${height}%` }}
                  title={`$${item.amount}`}
                />
              </div>
              <div className="text-sm text-gray-500 mt-2">{item.day}</div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center mt-6 pt-6 border-t">
        <div>
          <div className="text-sm text-gray-500">Average Daily Spend</div>
          <div className="text-xl font-bold">$431</div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ExpenseChart;