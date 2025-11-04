export default function MusicPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-center">MUSIC</h1>
        <p className="text-lg text-[#B3B3B3] text-center max-w-3xl mx-auto mb-16">
          Explore my complete collection of covers, original releases, and live performances.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add your music content here */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-3">Cover Songs</h3>
            <p className="text-[#B3B3B3]">Reimagined versions of classic and contemporary songs</p>
          </div>
          
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-3">Original Releases</h3>
            <p className="text-[#B3B3B3]">My collection of original compositions</p>
          </div>
          
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-3">Live Performances</h3>
            <p className="text-[#B3B3B3]">Captivating stage recordings</p>
          </div>
        </div>
      </div>
    </div>
  );
}