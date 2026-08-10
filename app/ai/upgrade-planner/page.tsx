"use client";

import { useState } from "react";
import Link from "next/link";

export default function UpgradePlannerPage() {
  const [budget, setBudget] = useState("");
  const [useCase, setUseCase] = useState("");
  const [currentCpu, setCurrentCpu] = useState("");
  const [currentGpu, setCurrentGpu] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const upgrades = [
        {
          name: "CPU Upgrade",
          description: "Upgrade to a faster processor for better productivity and gaming performance.",
          price: "$400",
          gain: "35%",
        },
        {
          name: "GPU Upgrade",
          description: "A new graphics card will boost your frame rates and enable ray tracing.",
          price: "$600",
          gain: "50%",
        },
        {
          name: "RAM Upgrade",
          description: "More memory allows for better multitasking and smoother performance.",
          price: "$150",
          gain: "15%",
        },
        {
          name: "Storage Upgrade",
          description: "An NVMe SSD will speed up load times and file transfers.",
          price: "$120",
          gain: "20%",
        },
      ];

      // Filter based on use case
      let filtered = [...upgrades];
      if (useCase === "gaming") {
        filtered = upgrades.filter(u => u.name === "GPU Upgrade" || u.name === "CPU Upgrade");
      } else if (useCase === "rendering") {
        filtered = upgrades.filter(u => u.name === "CPU Upgrade" || u.name === "RAM Upgrade");
      } else if (useCase === "ml-training") {
        filtered = upgrades.filter(u => u.name === "GPU Upgrade" || u.name === "RAM Upgrade");
      }

      // Sort by budget
      if (budget === "low") {
        filtered = filtered.filter(u => parseInt(u.price.replace('$', '')) < 300);
      } else if (budget === "medium") {
        filtered = filtered.filter(u => {
          const price = parseInt(u.price.replace('$', ''));
          return price >= 200 && price <= 600;
        });
      }

      setResult({
        recommendations: filtered,
        bestUpgrade: filtered[0] || upgrades[0],
        totalCost: filtered.reduce((sum, u) => sum + parseInt(u.price.replace('$', '')), 0),
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <nav className="mb-6 font-mono text-xs uppercase tracking-wide text-muted">
        <Link href="/" className="hover:text-trace">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Upgrade Path Planner</span>
      </nav>

      <h1 className="font-display text-3xl font-bold text-ink">Upgrade Path Planner</h1>
      <p className="text-muted mt-2">
        Tell us your budget and use case, and we&apos;ll recommend the best upgrades.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink">Use Case</label>
          <select
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          >
            <option value="">Select your use case</option>
            <option value="gaming">Gaming</option>
            <option value="rendering">3D Rendering / Video Editing</option>
            <option value="ml-training">Machine Learning Training</option>
            <option value="office">Office / Productivity</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">Budget</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          >
            <option value="">Select your budget</option>
            <option value="low">Low ($0 - $300)</option>
            <option value="medium">Medium ($300 - $800)</option>
            <option value="high">High ($800+)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">Current CPU</label>
          <select
            value={currentCpu}
            onChange={(e) => setCurrentCpu(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
          >
            <option value="">Select your current CPU (optional)</option>
            <option value="i5-12400">Intel i5-12400</option>
            <option value="i7-12700K">Intel i7-12700K</option>
            <option value="ryzen5-5600X">AMD Ryzen 5 5600X</option>
            <option value="ryzen7-5800X">AMD Ryzen 7 5800X</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">Current GPU</label>
          <select
            value={currentGpu}
            onChange={(e) => setCurrentGpu(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
          >
            <option value="">Select your current GPU (optional)</option>
            <option value="rtx-3060">NVIDIA RTX 3060</option>
            <option value="rtx-3070">NVIDIA RTX 3070</option>
            <option value="rx-6600XT">AMD RX 6600 XT</option>
            <option value="rx-6700XT">AMD RX 6700 XT</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Planning..." : "Plan Upgrade"}
        </button>
      </form>

      {result && (
        <div className="mt-8 border border-line bg-surface p-6">
          <h2 className="font-display text-xl font-bold text-ink">Upgrade Recommendations</h2>
          
          <div className="mt-4 space-y-4">
            {result.recommendations.map((rec: any, i: number) => (
              <div key={i} className="border border-line p-4">
                <h3 className="font-semibold text-ink">{rec.name}</h3>
                <p className="text-sm text-muted">{rec.description}</p>
                <div className="mt-2 flex gap-4 text-sm">
                  <span className="text-trace font-semibold">{rec.price}</span>
                  <span className="text-green-600">+{rec.gain} performance</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-line">
            <p className="text-sm text-muted">
              Best upgrade: <span className="font-semibold text-trace">{result.bestUpgrade.name}</span>
            </p>
            <p className="text-sm text-muted">
              Estimated total cost: <span className="font-semibold">${result.totalCost}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}