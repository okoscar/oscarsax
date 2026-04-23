'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <div className="space-y-6 text-white/60 leading-relaxed">
          <p>
            Welcome to the official website of Oscar Mulele. By accessing or using our services, you agree to be bound by the following terms and conditions.
          </p>
          <h2 className="text-xl font-bold text-white">Booking & Payments</h2>
          <p>
            All bookings are subject to availability and confirmation. A deposit may be required to secure your date. Full payment details will be provided during the booking process.
          </p>
          <h2 className="text-xl font-bold text-white">Cancellations</h2>
          <p>
            Cancellations must be made within the agreed timeframe to be eligible for a refund of any deposits. Specific cancellation policies apply to different types of events.
          </p>
          <h2 className="text-xl font-bold text-white">Performance Requirements</h2>
          <p>
            The client is responsible for providing a suitable performance space and power supply unless otherwise agreed.
          </p>
          <h2 className="text-xl font-bold text-white">Limitation of Liability</h2>
          <p>
            Oscar Mulele is not liable for any indirect or consequential loss arising from the use of this website or our services.
          </p>
        </div>
        <Link href="/" className="inline-block mt-12 text-[#FFB800] hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
