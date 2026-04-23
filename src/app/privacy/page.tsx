'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-white/60 leading-relaxed">
          <p>
            At Oscar Mulele, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website.
          </p>
          <h2 className="text-xl font-bold text-white">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, and phone number when you fill out our contact form or subscribe to our newsletter.
          </p>
          <h2 className="text-xl font-bold text-white">How We Use Your Information</h2>
          <p>
            Your information is used to respond to your inquiries, process your bookings, and send you occasional updates if you've subscribed to our newsletter. We do not sell or share your data with third parties.
          </p>
          <h2 className="text-xl font-bold text-white">Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information from unauthorized access.
          </p>
          <h2 className="text-xl font-bold text-white">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at oscarmulele1@gmail.com.
          </p>
        </div>
        <Link href="/" className="inline-block mt-12 text-[#FFB800] hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
