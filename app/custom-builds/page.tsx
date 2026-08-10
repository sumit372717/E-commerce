"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

type PartType = 'cpu' | 'gpu' | 'ram' | 'storage' | 'psu' | 'case';

interface Part {
  id: string;
  name: string;
  price: number;
  type: PartType;
  specs: Record<string, string>;
  image: string;
}

interface BuildStep {
  id: PartType;
  label: string;
  description: string;
}

const steps: BuildStep[] = [
  { id: 'cpu', label: 'CPU', description: 'Select your processor' },
  { id: 'gpu', label: 'GPU', description: 'Select your graphics card' },
  { id: 'ram', label: 'RAM', description: 'Select your memory' },
  { id: 'storage', label: 'Storage', description: 'Select your storage' },
  { id: 'psu', label: 'Power Supply', description: 'Select your PSU' },
  { id: 'case', label: 'Case', description: 'Select your case' },
];

export default function CustomBuildsPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [user, setUser] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [build, setBuild] = useState<Record<PartType, Part | null>>({
    cpu: null,
    gpu: null,
    ram: null,
    storage: null,
    psu: null,
    case: null,
  });
  const [availableParts, setAvailableParts] = useState<Record<PartType, Part[]>>({
    cpu: [],
    gpu: [],
    ram: [],
    storage: [],
    psu: [],
    case: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/login');
        return;
      }
      setUser(data.user);
      loadParts();
    };
    checkUser();
  }, [router]);

  const loadParts = async () => {
    try {
      const cpuParts: Part[] = [
        { id: 'cpu1', name: 'Intel Core i9-14900K', price: 589.99, type: 'cpu', specs: { cores: '24', baseClock: '3.2GHz' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=CPU' },
        { id: 'cpu2', name: 'AMD Ryzen 9 7950X', price: 549.99, type: 'cpu', specs: { cores: '16', baseClock: '4.5GHz' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=CPU' },
        { id: 'cpu3', name: 'Intel Core i7-14700K', price: 399.99, type: 'cpu', specs: { cores: '20', baseClock: '3.4GHz' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=CPU' },
      ];

      const gpuParts: Part[] = [
        { id: 'gpu1', name: 'NVIDIA RTX 5080 16GB', price: 899.99, type: 'gpu', specs: { memory: '16GB', interface: 'PCIe 5.0' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=GPU' },
        { id: 'gpu2', name: 'NVIDIA RTX 4080 16GB', price: 699.99, type: 'gpu', specs: { memory: '16GB', interface: 'PCIe 4.0' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=GPU' },
        { id: 'gpu3', name: 'AMD RX 7900 XTX', price: 629.99, type: 'gpu', specs: { memory: '24GB', interface: 'PCIe 4.0' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=GPU' },
      ];

      const ramParts: Part[] = [
        { id: 'ram1', name: 'Corsair Vengeance 32GB DDR5', price: 129.99, type: 'ram', specs: { size: '32GB', speed: '6000MHz' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=RAM' },
        { id: 'ram2', name: 'G.Skill Trident 16GB DDR5', price: 79.99, type: 'ram', specs: { size: '16GB', speed: '5600MHz' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=RAM' },
        { id: 'ram3', name: 'Kingston Fury 64GB DDR5', price: 249.99, type: 'ram', specs: { size: '64GB', speed: '5200MHz' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=RAM' },
      ];

      const storageParts: Part[] = [
        { id: 'st1', name: 'Samsung 990 Pro 2TB NVMe', price: 189.99, type: 'storage', specs: { capacity: '2TB', type: 'NVMe Gen4' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=SSD' },
        { id: 'st2', name: 'WD Black 1TB NVMe', price: 89.99, type: 'storage', specs: { capacity: '1TB', type: 'NVMe Gen4' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=SSD' },
        { id: 'st3', name: 'Crucial 4TB SSD', price: 299.99, type: 'storage', specs: { capacity: '4TB', type: 'SATA' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=SSD' },
      ];

      const psuParts: Part[] = [
        { id: 'psu1', name: 'Corsair RM850x 850W Gold', price: 149.99, type: 'psu', specs: { wattage: '850W', rating: 'Gold' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=PSU' },
        { id: 'psu2', name: 'Seasonic 750W Platinum', price: 179.99, type: 'psu', specs: { wattage: '750W', rating: 'Platinum' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=PSU' },
        { id: 'psu3', name: 'EVGA 1000W Gold', price: 199.99, type: 'psu', specs: { wattage: '1000W', rating: 'Gold' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=PSU' },
      ];

      const caseParts: Part[] = [
        { id: 'case1', name: 'Fractal Design Meshify C', price: 89.99, type: 'case', specs: { size: 'Mid-Tower', cooling: 'Great' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=Case' },
        { id: 'case2', name: 'Lian Li O11 Dynamic EVO', price: 159.99, type: 'case', specs: { size: 'Mid-Tower', cooling: 'Excellent' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=Case' },
        { id: 'case3', name: 'NZXT H5 Flow', price: 69.99, type: 'case', specs: { size: 'Compact', cooling: 'Good' }, image: 'https://placehold.co/100x100/121722/E3A24C?text=Case' },
      ];

      setAvailableParts({
        cpu: cpuParts,
        gpu: gpuParts,
        ram: ramParts,
        storage: storageParts,
        psu: psuParts,
        case: caseParts,
      });
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const selectPart = (type: PartType, part: Part) => {
    setBuild({ ...build, [type]: part });
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.values(build).forEach((part) => {
      if (part) total += part.price;
    });
    return total;
  };

  const getStepStatus = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (build[step.id]) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'pending';
  };

  const addToCartHandler = async () => {
    const parts = Object.values(build).filter(p => p !== null);
    if (parts.length < 6) {
      alert('Please select all parts before adding to cart');
      return;
    }

    setSaving(true);
    const total = getTotalPrice();

    const cpu = build.cpu?.name || 'CPU';
    const gpu = build.gpu?.name || 'GPU';
    const buildName = `Custom Build: ${cpu} + ${gpu}`;

    try {
      await addToCart(`custom-${Date.now()}`, 1, {
        buildName: buildName,
        parts: parts,
        total: total,
      });
      
      alert(`Custom build added to cart! Total: ৳${total}`);
      window.location.href = '/cart';
    } catch (error) {
      alert('Error adding build to cart');
    } finally {
      setSaving(false);
    }
  };

  const currentStepData = steps[currentStep];
  const stepType = currentStepData?.id;

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">Custom Build Wizard</h1>
      <p className="text-muted mt-2">Build your dream PC, part by part</p>

      <div className="mt-8">
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            return (
              <button
                key={step.id}
                onClick={() => index <= currentStep && goToStep(index)}
                className={`flex flex-col items-center flex-1 ${index > currentStep ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                disabled={index > currentStep}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  status === 'completed' ? 'bg-green-500 text-white' :
                  status === 'current' ? 'bg-trace text-white' :
                  'bg-gray-300 text-gray-500'
                }`}>
                  {status === 'completed' ? '✓' : index + 1}
                </div>
                <span className="text-xs text-center mt-1 text-muted">{step.label}</span>
              </button>
            );
          })}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 h-1 bg-gray-300 w-full rounded-full" />
          <div 
            className="absolute top-0 h-1 bg-trace rounded-full transition-all duration-300"
            style={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">{currentStepData?.label}</h2>
        <p className="text-muted">{currentStepData?.description}</p>

        {stepType && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availableParts[stepType]?.map((part) => (
              <div
                key={part.id}
                className={`border p-4 cursor-pointer transition-all ${
                  build[stepType]?.id === part.id ? 'border-trace bg-trace/5' : 'border-line hover:border-trace'
                }`}
                onClick={() => selectPart(stepType, part)}
              >
                <div className="flex items-center gap-4">
                  <img src={part.image} alt={part.name} className="h-16 w-16 object-contain" />
                  <div className="flex-1">
                    <h3 className="font-medium text-ink text-sm">{part.name}</h3>
                    <p className="text-sm text-muted">৳{part.price}</p>
                    {Object.entries(part.specs).map(([key, value]) => (
                      <p key={key} className="text-xs text-muted">{key}: {value}</p>
                    ))}
                  </div>
                </div>
                {build[stepType]?.id === part.id && (
                  <div className="mt-2 text-xs text-trace font-medium">✓ Selected</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div>
          <button
            className="px-4 py-2 text-ink/60 hover:text-ink disabled:opacity-30"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            ← Previous
          </button>
        </div>
        <div>
          {currentStep === steps.length - 1 ? (
            <button
              onClick={addToCartHandler}
              disabled={saving}
              className="bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
            >
              {saving ? 'Adding...' : 'Add Build to Cart ৳' + getTotalPrice()}
            </button>
          ) : (
            <button
              className="px-4 py-2 text-ink/60 hover:text-ink disabled:opacity-30"
              disabled={!build[currentStepData?.id as PartType]}
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}