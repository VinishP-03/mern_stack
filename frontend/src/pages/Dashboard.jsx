import React, { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, CreditCard, Target, 
  Plus, Filter, Calendar, AlertCircle, PieChart, BarChart, 
  Download, Edit, Trash2, ShoppingBag, Home, Car, Utensils, 
  Film, ShoppingCart, Coffee, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [budgetWarnings, setBudgetWarnings] = useState([]);

  // Mock data - Replace with API calls
  const categories = [
    { id: 'food', name: 'Food & Dining', icon: Utensils, color: 'bg-red-100 text-red-600', budget: 300 },
    { id: 'transport', name: 'Transportation', icon: Car, color: 'bg-blue-100 text-blue-600', budget: 200 },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'bg-purple-100 text-purple-600', budget: 150 },
    { id: 'entertainment', name: 'Entertainment', icon: Film, color: 'bg-green-100 text-green-600', budget: 100 },
    { id: 'bills', name: 'Bills & Utilities', icon: Home, color: 'bg-yellow-100 text-yellow-600', budget: 400 },
    { id: 'groceries', name: 'Groceries', icon: ShoppingCart, color: 'bg-indigo-100 text-indigo-600', budget: 250 },
  ];

  // Mock expenses data
  const mockExpenses = [
    { id: 1, title: 'Grocery Shopping', amount: 85.50, category: 'groceries', date: '2024-01-15' },
    { id: 2, title: 'Netflix Subscription', amount: 15.99, category: 'entertainment', date: '2024-01-14' },
    { id: 3, title: 'Gas Station', amount: 45.00, category: 'transport', date: '2024-01-13' },
    { id: 4, title: 'Restaurant Dinner', amount: 68.75, category: 'food', date: '2024-01-12' },
    { id: 5, title: 'Amazon Purchase', amount: 129.99, category: 'shopping', date: '2024-01-11' },
    { id: 6, title: 'Electricity Bill', amount: 120.50, category: 'bills', date: '2024-01-10' },
    { id: 7, title: 'Coffee Shop', amount: 4.50, category: 'food', date: '2024-01-09' },
    { id: 8, title: 'Movie Tickets', amount: 32.00, category: 'entertainment', date: '2024-01-08' },
  ];

  const currentMonthSpending = 1890;
  const lastMonthSpending = 2150;
  const spendingChange = ((currentMonthSpending - lastMonthSpending) / lastMonthSpending) * 100;

  useEffect(() => {
    // In real app, fetch from API
    setExpenses(mockExpenses);
    checkBudgetWarnings();
  }, []);

  const checkBudgetWarnings = () => {
    const warnings = categories.map(category => {
      const categoryExpenses = mockExpenses.filter(exp => exp.category === category.id);
      const totalSpent = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      const percentage = (totalSpent / category.budget) * 100;
      
      if (percentage > 80) {
        return {
          category: category.name,
          spent: totalSpent,
          budget: category.budget,
          percentage: Math.round(percentage),
          isExceeded: percentage > 100
        };
      }
      return null;
    }).filter(warning => warning !== null);

    setBudgetWarnings(warnings);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newId = expenses.length + 1;
    const expenseToAdd = {
      id: newId,
      ...newExpense,
      amount: parseFloat(newExpense.amount)
    };
    setExpenses([expenseToAdd, ...expenses]);
    setShowAddModal(false);
    setNewExpense({
      title: '',
      amount: '',
      category: 'food',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    checkBudgetWarnings();
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(exp => exp.id !== id));
      checkBudgetWarnings();
    }
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : ShoppingBag;
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : 'bg-gray-100 text-gray-600';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategoryTotal = (categoryId) => {
    return expenses
      .filter(exp => exp.category === categoryId)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Greeting */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.firstName || 'User'}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Here's your financial overview for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Expense
          </button>
        </div>

        {/* Budget Warnings */}
        {budgetWarnings.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center mb-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Budget Alerts</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {budgetWarnings.map((warning, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${warning.isExceeded ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{warning.category}</span>
                    <span className={`font-bold ${warning.isExceeded ? 'text-red-600' : 'text-yellow-600'}`}>
                      {warning.percentage}%
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Spent {formatCurrency(warning.spent)} of {formatCurrency(warning.budget)} budget
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${warning.isExceeded ? 'bg-red-500' : 'bg-yellow-500'}`}
                      style={{ width: `${Math.min(warning.percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$4,350</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" /> +12.5% from last month
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month's Spend</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(currentMonthSpending)}</p>
              <p className={`text-sm ${spendingChange < 0 ? 'text-green-600' : 'text-red-600'} mt-2 flex items-center`}>
                {spendingChange < 0 ? (
                  <TrendingDown className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 mr-1" />
                )}
                {Math.abs(spendingChange).toFixed(1)}% {spendingChange < 0 ? 'less' : 'more'} than last month
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Bills</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$540</p>
              <p className="text-sm text-red-600 mt-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" /> 3 bills due this week
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Bell className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Savings Goal</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">75%</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <Target className="h-4 w-4 mr-1" /> +25% from last month
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Category Spending */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Category Spending
              </h2>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div className="space-y-4">
              {categories.map((category) => {
                const Icon = category.icon;
                const totalSpent = getCategoryTotal(category.id);
                const percentage = (totalSpent / category.budget) * 100;
                const isOverBudget = percentage > 100;
                
                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${category.color} mr-3`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{category.name}</div>
                          <div className="text-sm text-gray-500">
                            {formatCurrency(totalSpent)} of {formatCurrency(category.budget)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
                          {Math.round(percentage)}%
                        </div>
                        <div className="text-sm text-gray-500">
                          {isOverBudget ? 'Over budget!' : 'Within budget'}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Recent Expenses
              </h2>
              <button className="text-blue-600 text-sm font-medium flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </button>
            </div>
            <div className="space-y-4">
              {expenses.slice(0, 5).map((expense) => {
                const Icon = getCategoryIcon(expense.category);
                const colorClass = getCategoryColor(expense.category);
                
                return (
                  <div key={expense.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${colorClass} mr-3`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{expense.title}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="font-semibold text-gray-900">{formatCurrency(expense.amount)}</div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <button className="p-1 text-blue-600 hover:text-blue-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button className="w-full py-3 text-center text-blue-600 font-medium hover:bg-blue-50 rounded-lg border border-dashed border-gray-300 hover:border-blue-300 transition-colors">
                View All Expenses →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Comparison Chart */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Monthly Spending Comparison
            </h2>
            <button className="text-blue-600 text-sm font-medium flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">This Month vs Last Month</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">This Month</span>
                  <span className="font-bold text-blue-600">{formatCurrency(currentMonthSpending)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Last Month</span>
                  <span className="font-bold text-gray-600">{formatCurrency(lastMonthSpending)}</span>
                </div>
                <div className={`flex justify-between items-center p-3 ${spendingChange < 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                  <span className="font-medium">Difference</span>
                  <span className={`font-bold ${spendingChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {spendingChange < 0 ? '-' : '+'}{formatCurrency(Math.abs(currentMonthSpending - lastMonthSpending))}
                    <span className="ml-2">({Math.abs(spendingChange).toFixed(1)}%)</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Spending Trend</h3>
              <div className="h-48 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="text-center">
                  <div className="text-gray-700 font-medium">Monthly Comparison Chart</div>
                  <div className="text-gray-500 text-sm mt-2">Visual representation of spending trends</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Expense</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAddExpense}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expense Title
                    </label>
                    <input
                      type="text"
                      value={newExpense.title}
                      onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Grocery Shopping"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                      placeholder="Add any notes about this expense..."
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;