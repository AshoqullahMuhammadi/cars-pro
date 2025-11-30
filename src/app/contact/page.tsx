import React from "react";
import type { Metadata } from "next";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { WHATSAPP_URL, CALL_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us - CarShowcase",
  description: "Get in touch with us for car inspection and analysis services",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-light-muted dark:text-dark-muted">
          We're here to help with all your car inspection needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Contact Methods */}
        <div className="space-y-6">
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                  WhatsApp
                </h3>
                <p className="text-light-muted dark:text-dark-muted mb-4">
                  Quick and easy communication
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  Open WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                  Phone Call
                </h3>
                <p className="text-light-muted dark:text-dark-muted mb-4">
                  Speak directly with our team
                </p>
                <a
                  href={CALL_URL}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  +93779536908
                </a>
              </div>
            </div>
          </div>

          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                  Visit Our Office
                </h3>
                <p className="text-light-muted dark:text-dark-muted">
                  Come see us in person for a consultation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Info */}
        <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-6">
            Service Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-light-primary dark:text-dark-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-light-text dark:text-dark-text mb-1">
                  Business Hours
                </h3>
                <p className="text-light-muted dark:text-dark-muted">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-light-primary dark:text-dark-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-light-text dark:text-dark-text mb-1">
                  Our Service
                </h3>
                <p className="text-light-muted dark:text-dark-muted">
                  Inspection & analyzing of cars. People can visit our office and contact us via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-light-primary/10 dark:from-dark-primary/10 to-light-accent/10 dark:to-dark-accent/10 p-8 rounded-xl text-center">
        <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-light-muted dark:text-dark-muted mb-6">
          Contact us today to schedule your vehicle inspection or analysis
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
          >
            <MessageCircle className="w-5 h-5" />
            Contact via WhatsApp
          </a>
          <a
            href={CALL_URL}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            <Phone className="w-5 h-5" />
            Call Us Now
          </a>
        </div>
      </div>
    </div>
  );
}

