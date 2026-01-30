import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Shield, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Track Expenses
            <span className="block text-blue-600 mt-2">Smartly & Securely</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Take control of your finances with our intelligent expense tracker. 
            Visualize spending, set budgets, and achieve your financial goals.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
            >
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <BarChart3 className="w-8 h-8" />,
              title: "Smart Analytics",
              desc: "Advanced charts and insights for your spending"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Bank-Level Security",
              desc: "Your financial data is encrypted and secure"
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Lightning Fast",
              desc: "Track expenses in seconds, not minutes"
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-blue-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border">
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[2400, 1890, 3200].map((amount, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-500">Monthly Spending</div>
                    <div className="text-2xl font-bold text-gray-900">${amount}</div>
                  </div>
                ))}
              </div>
              <div className="h-48 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-700 font-medium">Expense Chart Visualization</div>
                  <div className="text-gray-500 text-sm mt-2">Interactive charts will appear here</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;