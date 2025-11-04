export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#2a2a2a] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-center">EVENTS</h1>
        <p className="text-lg text-[#6a6a6a] text-center max-w-3xl mx-auto mb-16">
          From intimate celebrations to grand corporate affairs, I bring the perfect soundtrack to your special moments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">Weddings</h3>
            <p className="text-[#666666]">Make your special day unforgettable with elegant saxophone performances.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">Corporate Events</h3>
            <p className="text-[#666666]">Elevate your corporate functions with professional live music.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">Private Events</h3>
            <p className="text-[#666666]">Custom performances for intimate gatherings and special occasions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}