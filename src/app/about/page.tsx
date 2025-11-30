import React from "react";
import type { Metadata } from "next";
import { CheckCircle, Users, Award, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - CarShowcase",
  description: "Learn about our professional car inspection and analysis services",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
          About Us
        </h1>
        <p className="text-xl text-light-muted dark:text-dark-muted">
          Professional Car Inspection & Analysis Services
        </p>
      </div>

      <div className="space-y-12">
        {/* Mission */}
        <section>
          <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
            Our Mission
          </h2>
          <p className="text-light-muted dark:text-dark-muted leading-relaxed">
            At CarShowcase, we specialize in comprehensive car inspection and analysis services. 
            Our mission is to provide transparent, detailed, and professional vehicle assessments 
            that help customers make informed decisions. Whether you're buying or selling a vehicle, 
            our expert team ensures you have all the information you need.
          </p>
        </section>

        {/* Services */}
        <section>
          <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-6">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
              <CheckCircle className="w-8 h-8 text-light-primary dark:text-dark-primary mb-4" />
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                Comprehensive Inspection
              </h3>
              <p className="text-light-muted dark:text-dark-muted">
                Detailed examination of engine, transmission, brakes, suspension, and all critical systems.
              </p>
            </div>

            <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
              <Shield className="w-8 h-8 text-light-primary dark:text-dark-primary mb-4" />
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                Quality Analysis
              </h3>
              <p className="text-light-muted dark:text-dark-muted">
                Professional assessment of vehicle condition, history, and value estimation.
              </p>
            </div>

            <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
              <Users className="w-8 h-8 text-light-primary dark:text-dark-primary mb-4" />
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                Expert Consultation
              </h3>
              <p className="text-light-muted dark:text-dark-muted">
                Get expert advice and recommendations from our experienced automotive professionals.
              </p>
            </div>

            <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
              <Award className="w-8 h-8 text-light-primary dark:text-dark-primary mb-4" />
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                Trusted Service
              </h3>
              <p className="text-light-muted dark:text-dark-muted">
                Years of experience in the automotive industry with a commitment to honesty and integrity.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-light-primary/10 dark:bg-dark-primary/10 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-light-muted dark:text-dark-muted mb-6">
            Visit our office or contact us via WhatsApp to schedule an inspection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/93779536908?text=Hello%2C%20I%27m%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
            >
              Contact via WhatsApp
            </a>
            <a
              href="tel:+93779536908"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              Call Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

