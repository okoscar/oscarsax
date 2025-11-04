export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-center">ABOUT</h1>
        <p className="text-lg text-[#B3B3B3] text-center max-w-3xl mx-auto mb-16">
          Learn more about my journey as a musician and my passion for creating unforgettable performances.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl font-bold mb-6">About Oscar Mulere</h2>
            <div className="space-y-4 text-lg text-[#B3B3B3]">
              <p>
                Oscar Mulere is a Kampala-based saxophonist and bandleader who has been captivating audiences for over a decade.
              </p>
              <p>
                With a passion for jazz, soul, and contemporary music, Oscar brings a unique blend of technical mastery and emotional depth to every performance.
              </p>
              <p>
                His ability to read the room and adapt his performance to suit any occasion sets him apart in the industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}