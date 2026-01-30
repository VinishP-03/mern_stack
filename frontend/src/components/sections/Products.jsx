import React from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for individuals getting started",
      features: [
        "Track up to 50 expenses/month",
        "Basic expense categories",
        "30-day history",
        "Email support",
        "Mobile app access"
      ],
      notIncluded: [
        "Advanced analytics",
        "Team collaboration",
        "Custom categories",
        "Export reports",
        "Priority support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "/month",
      description: "Best for power users and freelancers",
      features: [
        "Unlimited expenses",
        "Advanced categories",
        "1-year history",
        "PDF/Excel exports",
        "Email & chat support",
        "Budget planning",
        "Recurring expenses"
      ],
      notIncluded: [
        "Team collaboration",
        "API access",
        "White labeling"
      ],
      cta: "Try Free for 14 Days",
      popular: true
    },
    {
      name: "Team",
      price: "$29",
      period: "/month",
      description: "For teams and families sharing expenses",
      features: [
        "Everything in Pro",
        "Up to 5 team members",
        "Shared categories",
        "Real-time sync",
        "Admin controls",
        "API access",
        "Priority support",
        "Custom branding"
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Start free, upgrade when you need more power
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-white rounded-2xl shadow-xl ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">{plan.period}</span>
                </div>
                <p className="mt-4 text-gray-500">{plan.description}</p>
                
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                  
                  {plan.notIncluded.map((feature, idx) => (
                    <li key={idx} className="flex items-start opacity-50">
                      <X className="h-6 w-6 text-gray-400 flex-shrink-0" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={plan.name === 'Team' ? '/contact' : '/register'}
                  className={`mt-8 block w-full py-3 px-6 text-center rounded-lg font-medium ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            All plans include our core features. Need a custom plan?{' '}
            <Link to="/contact" className="text-primary-600 font-semibold hover:text-primary-700">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;