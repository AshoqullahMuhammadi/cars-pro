import React from "react";
import type { Metadata } from "next";
import { Wrench, FileCheck, Car, Clock, DollarSign, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Services - CarShowcase",
  description: "Our professional car inspection and analysis services",
};

export default function ServicesPage() {
  const services = [
    {
      icon: Car,
      title: "Pre-Purchase Inspection",
      description: "Comprehensive inspection before you buy. We check all major systems, identify potential issues, and provide a detailed report.",
      features: ["Engine & Transmission", "Brakes & Suspension", "Electrical Systems", "Body & Frame", "Interior Condition"],
    },
    {
      icon: FileCheck,
      title: "Vehicle Analysis",
      description: "Detailed analysis of vehicle history, condition, and value. Perfect for sellers who want to price their vehicle accurately.",
      features: ["Condition Assessment", "Value Estimation", "History Review", "Market Analysis", "Detailed Report"],
    },
    {
      icon: Wrench,
      title: "Maintenance Inspection",
      description: "Regular maintenance inspections to keep your vehicle in optimal condition and catch issues early.",
      features: ["Fluid Checks", "Component Wear Analysis", "Safety Inspection", "Performance Testing", "Maintenance Recommendations"],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
          Our Services
        </h1>
        <p className="text-xl text-light-muted dark:text-dark-muted">
          Professional Car Inspection & Analysis
        </p>
      </div>

      <div className="space-y-12">
        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-light-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-light-primary dark:text-dark-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
                  {service.title}
                </h2>
                <p className="text-light-muted dark:text-dark-muted mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-light-muted dark:text-dark-muted">
                      <span className="text-light-primary dark:text-dark-primary mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Process */}
        <section className="bg-light-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-6">
            Our Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-light-primary dark:bg-dark-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Contact Us</h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                Reach out via WhatsApp or call to schedule
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-light-primary dark:bg-dark-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Visit Office</h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                Bring your vehicle to our office
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-light-primary dark:bg-dark-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Inspection</h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                Comprehensive analysis performed
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-light-primary dark:bg-dark-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                4
              </div>
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Report</h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                Receive detailed findings
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-br from-light-primary/10 dark:from-dark-primary/10 to-light-accent/10 dark:to-dark-accent/10 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
            Get Started Today
          </h2>
          <p className="text-light-muted dark:text-dark-muted mb-6">
            Contact us to schedule your vehicle inspection or analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/93779536908?text=Hello%2C%20I%27m%20interested%20in%20your%20inspection%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
            >
              <Phone className="w-5 h-5" />
              Contact via WhatsApp
            </a>
            <a
              href="tel:+93779536908"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

