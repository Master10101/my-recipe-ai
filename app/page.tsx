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
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-black text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500">
            CHEF LUXE
          </h1>
          <p className="text-slate-400 uppercase tracking-[0.3em] text-sm font-light">Artificial Intelligence Gastronomy</p>
        </div>

        {/* Input Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-amber-500 uppercase ml-1">Pantry Items</label>
              <input 
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:border-amber-500/50 outline-none transition-all"
                onChange={(e) => setIngreds(e.target.value)} 
                placeholder="Ex: Wagyu, Truffle, Garlic..." 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-amber-500 uppercase ml-1">Desired Creation</label>
              <input 
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:border-amber-500/50 outline-none transition-all"
                onChange={(e) => setDish(e.target.value)} 
                placeholder="Ex: Velvety Risotto..." 
              />
            </div>
          </div>

          <button 
            onClick={getRecipe}
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-black font-bold py-4 rounded-2xl transition-all transform active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                CRAFTING RECIPE...
              </span>
            ) : 'GENERATE CULINARY MASTERPIECE'}
          </button>
        </div>

        {/* Recipe Display */}
        {recipe && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white text-slate-900 rounded-3xl p-10 shadow-2xl prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap font-serif text-lg leading-relaxed italic">
              {recipe}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}