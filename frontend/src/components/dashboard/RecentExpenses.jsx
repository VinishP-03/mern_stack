import React from 'react';
import { ShoppingBag, Coffee, Home, Car, Utensils } from 'lucide-react';

const RecentExpenses = () => {
  const expenses = [
    { id: 1, category: 'Shopping', amount: '$89.99', merchant: 'Amazon', icon: ShoppingBag, color: 'bg-purple-100 text-purple-600' },
    { id: 2, category: 'Food', amount: '$24.50', merchant: 'Starbucks', icon: Coffee, color: 'bg-green-100 text-green-600' },
    { id: 3, category: 'Rent', amount: '$1,200', merchant: 'Apartment', icon: Home, color: 'bg-blue-100 text-blue-600' },
    { id: 4, category: 'Transport', amount: '$45.00', merchant: 'Gas Station', icon: Car, color: 'bg-yellow-100 text-yellow-600' },
    { id: 5, category: 'Dining', amount: '$68.75', merchant: 'Italian Restaurant', icon: Utensils, color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div key={expense.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <div className={`${expense.color} p-2 rounded-lg`}>
              <expense.icon className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <div className="font-medium text-gray-900">{expense.category}</div>
              <div className="text-sm text-gray-500">{expense.merchant}</div>
            </div>
          </div>
          <div className="font-semibold text-gray-900">{expense.amount}</div>
        </div>
      ))}
      <button className="w-full py-3 text-center text-blue-600 font-medium hover:bg-blue-50 rounded-lg">
        View All Expenses →
      </button>
    </div>
  );
};

export default RecentExpenses;