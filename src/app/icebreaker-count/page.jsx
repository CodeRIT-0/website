"use client";

import { useCallback, useEffect, useState } from "react";

export default function IcebreakerCount() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/icebreaker-count", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setCount(data.count);
      else setError(data.message || "Could not load the count");
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 px-4 pt-24">
      <div className="w-full max-w-sm text-center bg-white border-4 border-black rounded-lg p-8 shadow-[8px_8px_0_rgba(0,0,0,0.9)]">
        <h1 className="text-xl font-black uppercase text-black">
          Icebreaker 2026
        </h1>
        <p className="mt-1 text-sm font-bold text-gray-600">Registrations so far</p>

        <p className="my-6 text-7xl font-black text-red-600">
          {loading && count === null ? "…" : count ?? "–"}
        </p>

        {error && <p className="mb-4 text-sm font-bold text-red-700">{error}</p>}

        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="px-5 py-2 bg-yellow-300 border-4 border-black rounded font-black uppercase text-black disabled:opacity-60"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>
    </main>
  );
}
