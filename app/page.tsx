'use client';
import { useState } from 'react';

export default function Home() {
  const [ingreds, setIngreds] = useState('');
  const [dish, setDish] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  async function getRecipe() {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ ingredients: ingreds, dishType: dish }),
    });
    const data = await res.json();
    setRecipe(data.recipe);
    setLoading(false);
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h1>Chef AI 🍳</h1>
      <p>Ingredients I have:</p>
      <input style={{width: '100%', padding: '10px', marginBottom: '10px'}} onChange={(e) => setIngreds(e.target.value)} placeholder="Eggs, bread, cheese..." />
      <p>What should I make?</p>
      <input style={{width: '100%', padding: '10px', marginBottom: '20px'}} onChange={(e) => setDish(e.target.value)} placeholder="A quick breakfast..." />
      <button style={{width: '100%', padding: '15px', background: 'orange', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer'}} onClick={getRecipe}>
        {loading ? 'Cooking...' : 'Generate Recipe'}
      </button>
      <div style={{ marginTop: '30px', whiteSpace: 'pre-wrap' }}>{recipe}</div>
    </div>
  );
}