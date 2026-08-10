"use client";

import { useState } from "react";
import Link from "next/link";

export default function BottleneckAnalyzerPage() {
  const [cpu, setCpu] = useState("");
  const [gpu, setGpu] = useState("");
  const [ram, setRam] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate AI analysis
    setTimeout(() => {
      const bottleneck = {
        cpu: Math.floor(Math.random() * 40 + 60),
        gpu: Math.floor(Math.random() * 40 + 60),
        ram: Math.floor(Math.random() * 40 + 60),
        storage: Math.floor(Math.random() * 40 + 60),
        recommendation: "",
        details: "",
      };

      // Generate recommendation
      if (bottleneck.cpu < 70) {
        bottleneck.recommendation = "CPU Upgrade Recommended";
        bottleneck.details = "Your CPU is the bottleneck. Consider upgrading to a newer generation with higher core count and clock speed.";
      } else if (bottleneck.gpu < 70) {
        bottleneck.recommendation = "GPU Upgrade Recommended";
        bottleneck.details = "Your GPU is holding you back. Upgrade to a more powerful graphics card for better frame rates.";
      } else if (bottleneck.ram < 70) {
        bottleneck.recommendation = "RAM Upgrade Recommended";
        bottleneck.details = "You need more memory. Consider upgrading to 32GB or higher for better multitasking.";
      } else {
        bottleneck.recommendation = "Balanced System";
        bottleneck.details = "Your system is well-balanced. No immediate upgrades needed.";
      }

      setResult(bottleneck);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <nav className="mb-6 font-mono text-xs uppercase tracking-wide text-muted">
        <Link href="/" className="hover:text-trace">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Bottleneck Analyzer</span>
      </nav>

      <h1 className="font-display text-3xl font-bold text-ink">Bottleneck Analyzer</h1>
      <p className="text-muted mt-2">
        Enter your current specs to identify performance bottlenecks.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink">CPU</label>
          <select
            value={cpu}
            onChange={(e) => setCpu(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          >
            <option value="">Select your CPU</option>
            <option value="i9-14900K">Intel Core i9-14900K</option>
            <option value="i7-14700K">Intel Core i7-14700K</option>
            <option value="i5-14600K">Intel Core i5-14600K</option>
            <option value="ryzen9-7950X">AMD Ryzen 9 7950X</option>
            <option value="ryzen7-7800X3D">AMD Ryzen 7 7800X3D</option>
            <option value="ryzen5-7600X">AMD Ryzen 5 7600X</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">GPU</label>
          <select
            value={gpu}
            onChange={(e) => setGpu(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          >
            <option value="">Select your GPU</option>
            <option value="rtx-5090">NVIDIA RTX 5090</option>
            <option value="rtx-5080">NVIDIA RTX 5080</option>
            <option value="rtx-5070">NVIDIA RTX 5070</option>
            <option value="rx-7900XTX">AMD RX 7900 XTX</option>
            <option value="rx-7900XT">AMD RX 7900 XT</option>
            <option value="rx-7800XT">AMD RX 7800 XT</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">RAM</label>
          <select
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          >
            <option value="">Select your RAM</option>
            <option value="64GB">64GB DDR5</option>
            <option value="32GB">32GB DDR5</option>
            <option value="16GB">16GB DDR5</option>
            <option value="8GB">8GB DDR4</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Run Analysis"}
        </button>
      </form>

      {result && (
        <div className="mt-8 border border-line bg-surface p-6">
          <h2 className="font-display text-xl font-bold text-ink">Analysis Results</h2>
          
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-sm text-muted">CPU</p>
              <p className="text-2xl font-bold text-ink">{result.cpu}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted">GPU</p>
              <p className="text-2xl font-bold text-ink">{result.gpu}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted">RAM</p>
              <p className="text-2xl font-bold text-ink">{result.ram}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted">Storage</p>
              <p className="text-2xl font-bold text-ink">{result.storage}%</p>
            </div>
          </div>

          <div className="mt-6 border-t border-line pt-4">
            <p className="text-lg font-semibold text-trace">{result.recommendation}</p>
            <p className="text-sm text-muted mt-2">{result.details}</p>
          </div>
        </div>
      )}
    </div>
  );
}