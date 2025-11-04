export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h2 className="text-lg font-normal mb-4 tracking-wide">SUBSCRIBE TO OUR NEWSLETTER</h2>
          <form className="flex justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="enters your email"
              className="flex-1 px-4 py-3 border border-gray-300 border-r-0 text-sm text-gray-600 placeholder-gray-500 italic"
            />
            <button 
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-between mb-12">
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
            <h3 className="text-base font-semibold mb-5 tracking-wide">Beepoko</h3>
            <ul className="space-y-3 text-sm">
              {['Wedding Suite', 'Tunodos', 'Blasse', 'Overcasts', 'Tongues, Paris & Chinois', 'Shirts', 'Blog', 'Pricing', 'Cerens', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
            <h3 className="text-base font-semibold mb-5 tracking-wide">Locations</h3>
            <ul className="space-y-3 text-sm">
              {['Melbourne', 'Perth', 'Brisbane', 'Canberra', 'Trunk Shows'].map((location) => (
                <li key={location}>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors">
                    {location}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-base">
            {['f', '@', 'in', '@'].map((icon, index) => (
              <a key={index} href="#" className="text-gray-800 hover:text-black">
                {icon}
              </a>
            ))}
          </div>
          <div className="text-gray-500 text-xs">
            © Copyright Germanico 2025.
          </div>
        </div>
      </div>
    </footer>
  );
}