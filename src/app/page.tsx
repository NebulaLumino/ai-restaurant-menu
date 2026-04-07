"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    concept: "",
    cuisine: "",
    priceRange: "",
    audience: "",
    seasonal: "",
    dietary: "",
    sections: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setOutput(data.result || "Error generating menu.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30">
            <span className="text-rose-400 text-sm font-medium">🍽️ AI × Food & Cooking</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">AI Restaurant Menu Creator</h1>
          <p className="text-gray-400 text-lg">Generate complete restaurant menus with dishes, descriptions, pricing, and dietary icons</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Restaurant Concept</label>
              <input type="text" name="concept" value={form.concept} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm" placeholder="e.g. Rustic Italian Trattoria, Modern Vegan Bistro" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Cuisine Type</label>
              <select name="cuisine" value={form.cuisine} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm">
                <option value="">Select cuisine</option>
                <option value="italian">Italian</option>
                <option value="french">French</option>
                <option value="japanese">Japanese</option>
                <option value="mexican">Mexican</option>
                <option value="indian">Indian</option>
                <option value="chinese">Chinese</option>
                <option value="american">American</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="korean">Korean</option>
                <option value="thai">Thai</option>
                <option value="peruvian">Peruvian</option>
                <option value="spanish">Spanish</option>
                <option value="fusion">Fusion / Contemporary</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Price Range</label>
              <select name="priceRange" value={form.priceRange} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm">
                <option value="">Select price range</option>
                <option value="budget">Budget ($10–$20 entree)</option>
                <option value="mid">Mid-Range ($20–$35 entree)</option>
                <option value="upscale">Upscale ($35–$55 entree)</option>
                <option value="fine-dining">Fine Dining ($55+ entree)</option>
                <option value="luxury">Luxury / Tasting Menu ($100+)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Target Audience</label>
              <select name="audience" value={form.audience} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm">
                <option value="">Select audience</option>
                <option value="families">Families with Children</option>
                <option value="young-professionals">Young Professionals</option>
                <option value="couples">Romantic Couples</option>
                <option value="seniors">Seniors / Mature Guests</option>
                <option value="foodies">Foodies / Culinary Enthusiasts</option>
                <option value="business">Business / Corporate</option>
                <option value="tourists">Tourists / Visitors</option>
                <option value="locals">Health-Conscious Locals</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Seasonal Ingredients to Feature</label>
              <input type="text" name="seasonal" value={form.seasonal} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm" placeholder="e.g. pumpkin, butternut squash, sage, game meats" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Dietary Options Needed</label>
              <select name="dietary" value={form.dietary} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm">
                <option value="">Select dietary options</option>
                <option value="none">Standard Menu Only</option>
                <option value="vegetarian">Vegetarian Options</option>
                <option value="vegan">Vegan Options</option>
                <option value="gf">Gluten-Free Options</option>
                <option value="vegetarian-vegan">Vegetarian + Vegan</option>
                <option value="full-accommodation">Full Dietary Accommodation</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Number of Menu Sections</label>
              <select name="sections" value={form.sections} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm">
                <option value="">Select sections</option>
                <option value="3">3 Sections (e.g. Starters / Mains / Desserts)</option>
                <option value="4">4 Sections (e.g. Starters / Salads / Mains / Desserts)</option>
                <option value="5">5 Sections (e.g. Amuse / Starters / Mains / Desserts / Digestifs)</option>
                <option value="6">6+ Sections (Full Fine Dining Tasting Menu)</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-rose-500 hover:bg-rose-400 disabled:bg-rose-500/50 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-base flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Generating Menu...
              </>
            ) : "🍽️ Generate My Restaurant Menu"}
          </button>
        </form>

        {output && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-rose-400 mb-4">Generated Menu</h2>
            <div className="prose prose-invert prose-rose max-w-none text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{output}</div>
          </div>
        )}
      </div>
    </main>
  );
}
