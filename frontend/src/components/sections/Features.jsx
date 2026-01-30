import React from 'react';
import { BarChart3, Shield, Zap, Bell, PieChart, Download } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <PieChart className="w-10 h-10" />,
      title: "Visual Analytics",
      description: "Beautiful charts and graphs to visualize your spending patterns",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600"
    },
    {
      icon: <Bell className="w-10 h-10" />,
      title: "Smart Alerts",
      description: "Get notified when you exceed budgets or have bills due",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600"
    },
    {
      icon: <Download className="w-10 h-10" />,
      title: "Export Reports",
      description: "Download detailed reports in PDF, CSV, or Excel formats",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Everything you need to manage your finances effectively
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="relative h-64 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0 bg-primary-500 rounded-lg p-3">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-1 text-gray-500">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">99.9%</div>
            <div className="text-gray-600 mt-2">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">256-bit</div>
            <div className="text-gray-600 mt-2">Encryption</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">50K+</div>
            <div className="text-gray-600 mt-2">Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">24/7</div>
            <div className="text-gray-600 mt-2">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;