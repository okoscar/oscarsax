export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-center">CONTACT</h1>
        <p className="text-lg text-[#B3B3B3] text-center max-w-3xl mx-auto mb-16">
          Ready to add live music to your event? Get in touch and let's discuss how we can make your occasion unforgettable.
        </p>
        
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-8 md:p-12">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-white font-semibold mb-2">
                Message *
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition resize-none"
                placeholder="Tell me more about your event and any special requirements..."
                required
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#FFB800] text-black py-4 rounded-lg font-bold text-lg hover:bg-[#FFD700] transition"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}