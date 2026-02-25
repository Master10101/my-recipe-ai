'use client';
import { useState } from 'react';

export default function Home() {
  const [ingreds, setIngreds] = useState('');
  const [dish, setDish] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  async function getRecipe() {
    if (!ingreds || !dish) return alert("Please fill both boxes!");
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingreds, dishType: dish }),
      });
      const data = await res.json();
      setRecipe(data.recipe || "Something went wrong.");
    } catch (err) {
      setRecipe("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* --- VIDEO BACKGROUND --- */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-60"
        >
          <source src="https://www.pexels.com/download/video/2894881/" type="video/mp4" />
        </video>
        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 bg-black/60 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto py-12 px-6">
        {/* Founder Credit */}
        <div className="absolute top-0 right-6 text-right">
          <p className="text-[10px] tracking-[0.4em] text-amber-500 uppercase font-bold">Founder</p>
          <p className="text-xl font-serif text-white italic">Isum</p>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16 mt-8">
          <h1 className="text-6xl font-black tracking-tighter mb-2 text-white italic">
            CHEF<span className="text-amber-500">.</span>AI
          </h1>
          <p className="text-amber-200/70 uppercase tracking-[0.5em] text-[10px] font-medium">Bespoke Culinary Intelligence</p>
        </div>

        {/* Glassmorphism Input Card */}
        <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-[2rem] p-8 shadow-2xl mb-12">
          <div className="space-y-6 mb-8">
            <div>
              <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest ml-1">Your Ingredients</label>
              <input 
                className="w-full bg-white/5 border-b border-white/30 p-4 text-white placeholder:text-gray-500 outline-none focus:border-amber-500 transition-all text-lg"
                onChange={(e) => setIngreds(e.target.value)} 
                placeholder="What is in your pantry?" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest ml-1">Desired Dish</label>
              <input 
                className="w-full bg-white/5 border-b border-white/30 p-4 text-white placeholder:text-gray-500 outline-none focus:border-amber-500 transition-all text-lg"
                onChange={(e) => setDish(e.target.value)} 
                placeholder="A rich curry, a decadent cake..." 
              />
            </div>
          </div>

          <button 
            onClick={getRecipe}
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-amber-600/20 disabled:opacity-50 tracking-widest"
          >
            {loading ? 'PREPARING YOUR MASTERPIECE...' : 'GENERATE RECIPE'}
          </button>
        </div>

        {/* Recipe Display */}
        {recipe && (
          <div className="bg-white rounded-[2rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-500 text-gray-900">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Recipe by Chef.AI</span>
              <span className="text-xs font-serif italic text-gray-400">Curated for Isum</span>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed text-lg font-serif">
              {recipe}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center opacity-40">
          <p className="text-[10px] text-white tracking-[0.2em] font-light">© 2026 LUXE GASTRONOMY BY ISUM</p>
        </footer>
      </div>
    </main>
  );
}