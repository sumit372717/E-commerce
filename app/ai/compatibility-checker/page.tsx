"use client";

import { useState } from "react";
import Link from "next/link";

export default function CompatibilityCheckerPage() {
  const [cpu, setCpu] = useState("");
  const [gpu, setGpu] = useState("");
  const [motherboard, setMotherboard] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const issues = [];
      
      if (cpu.includes("Intel") && motherboard.includes("AMD")) {
        issues.push("❌ CPU and motherboard are incompatible (Intel CPU with AMD socket)");
      }
      if (cpu.includes("AMD") && motherboard.includes("Intel")) {
        issues.push("❌ CPU and motherboard are incompatible (AMD CPU with Intel socket)");
      }
      if (cpu.includes("i9") && gpu.includes("rx")) {
        issues.push("⚠️ Powerful CPU + AMD GPU — works, but consider NVIDIA for better ray tracing");
      }
      if (gpu.includes("rtx") && motherboard.includes("B660")) {
        issues.push("⚠️ RTX GPU with B660 chipset — works but PCIe 4.0 limits performance");
      }
      if (issues.length === 0) {
        issues.push("✅ All components are compatible!");
      }

      setResult({
        status: issues.some(i => i.includes("❌")) ? "Incompatible" : "Compatible",
        issues: issues,
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <nav className="mb-6 font-mono text-xs uppercase tracking-wide text-muted">
        <Link href="/" className="hover:text-trace">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Compatibility Checker</span>
      </nav>

      <h1 className="font-display text-3xl font-bold text-ink">Compatibility Checker</h1>
      <p className="text-muted mt-2">
        Check if your components work together.
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
            <option value="">Select CPU</option>
            <option value="Intel i9-14900K">Intel i9-14900K</option>
            <option value="Intel i7-14700K">Intel i7-14700K</option>
            <option value="AMD Ryzen 9 7950X">AMD Ryzen 9 7950X</option>
            <option value="AMD Ryzen 7 7800X3D">AMD Ryzen 7 7800X3D</option>
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
            <option value="">Select GPU</option>
            <option value="NVIDIA RTX 5090">NVIDIA RTX 5090</option>
            <option value="NVIDIA RTX 5080">NVIDIA RTX 5080</option>
            <option value="AMD RX 7900 XTX">AMD RX 7900 XTX</option>
            <option value="AMD RX 7800 XT">AMD RX 7800 XT</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">Motherboard</label>
          <select
            value={motherboard}
            onChange={(e) => setMotherboard(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          >
            <option value="">Select Motherboard</option>
            <option value="Z790 (Intel)">Z790 (Intel)</option>
            <option value="B760 (Intel)">B760 (Intel)</option>
            <option value="X670E (AMD)">X670E (AMD)</option>
            <option value="B650 (AMD)">B650 (AMD)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Compatibility"}
        </button>
      </form>

      {result && (
        <div className={`mt-8 border p-6 ${
          result.status === "Compatible" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
        }`}>
          <h2 className={`font-display text-xl font-bold ${
            result.status === "Compatible" ? "text-green-700" : "text-red-700"
          }`}>
            Result: {result.status}
          </h2>
          <ul className="mt-4 space-y-2">
            {result.issues.map((issue: string, i: number) => (
              <li key={i} className={`text-sm ${
                issue.includes("❌") ? "text-red-700" : 
                issue.includes("⚠️") ? "text-yellow-700" : 
                "text-green-700"
              }`}>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}