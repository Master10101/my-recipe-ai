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
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ color: '#e67e22' }}>Chef AI 🍳</h1>
      <div style={{ marginBottom: '20px' }}>
        <p><b>Ingredients I have:</b></p>
        <input 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} 
          onChange={(e) => setIngreds(e.target.value)} 
          placeholder="Eggs, flour, milk..." 
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p><b>What do you want to make?</b></p>
        <input 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} 
          onChange={(e) => setDish(e.target.value)} 
          placeholder="A cake, a curry, etc." 
        />
      </div>
      <button 
        style={{ width: '100%', padding: '15px', background: '#d35400', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }} 
        onClick={getRecipe}
        disabled={loading}
      >
        {loading ? 'Cooking...' : 'Generate Recipe'}
      </button>
      {recipe && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', whiteSpace: 'pre-wrap', borderLeft: '5px solid #d35400' }}>
          {recipe}
        </div>
      )}
    </div>
  );
}