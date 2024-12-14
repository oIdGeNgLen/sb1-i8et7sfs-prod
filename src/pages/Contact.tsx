import React from 'react';
import { Layout } from '../components/Layout';
import { BackButton } from '../components/BackButton';
import { Mail, MessageCircle, Send } from 'lucide-react';

export function Contact() {
  return (
    <Layout>
      <BackButton />
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-light mb-12">Contact</h1>
          <div className="space-y-8">
            <a
              href="https://www.simonives.com.au"
              className="flex items-center gap-3 text-lg text-gray-800 hover:text-gray-600 transition-colors"
            >
              <Mail className="w-6 h-6" />
              contact form
            </a>
            <a
              href="https://www.simonives.com.au/whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg text-gray-800 hover:text-gray-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp
            </a>
            <a
              href="https://t.me/simon_ives"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg text-gray-800 hover:text-gray-600 transition-colors"
            >
              <Send className="w-6 h-6" />
              Telegram
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}