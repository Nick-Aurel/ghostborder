"use client";

import { FormEvent, useState } from "react";

const ATTESTATION_TYPES = [
  "Identity Registration",
  "Vaccination",
  "Aid Receipt",
  "Residency",
] as const;

export default function IssuePage() {
  const [personName, setPersonName] = useState("");
  const [attestationType, setAttestationType] = useState<string>(
    ATTESTATION_TYPES[0],
  );
  const [issuer, setIssuer] = useState("");
  const [personId, setPersonId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/attest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          person_id: personName.trim(),
          issuer: issuer.trim(),
          attestation_type: attestationType,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Request failed");
      }

      const data = await res.json();
      setPersonId(data.person_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-full bg-[#0a1628] text-white">
      <div className="mx-auto flex min-h-full max-w-md flex-col px-5 py-10">
        <header className="mb-10">
          <p className="text-sm font-medium tracking-widest text-[#00d4aa] uppercase">
            GhostBorder
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Issue Attestation
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Record a cryptographically anchored attestation for an individual.
          </p>
        </header>

        {personId ? (
          <div className="rounded-xl border border-[#00d4aa]/30 bg-[#0d1e35] p-6">
            <p className="text-sm font-medium text-[#00d4aa]">
              Attestation recorded.
            </p>
            <p className="mt-4 text-xs tracking-wide text-white/50 uppercase">
              Person ID
            </p>
            <p className="mt-1 break-all font-mono text-lg text-white">
              {personId}
            </p>
            <button
              type="button"
              onClick={() => {
                setPersonId(null);
                setPersonName("");
                setIssuer("");
                setAttestationType(ATTESTATION_TYPES[0]);
              }}
              className="mt-6 w-full rounded-lg border border-white/10 py-3 text-sm text-white/70 transition-colors hover:border-[#00d4aa]/40 hover:text-white"
            >
              Issue another attestation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-white/70">Person Name</span>
              <input
                type="text"
                required
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="Full legal name"
                className="rounded-lg border border-white/10 bg-[#0d1e35] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#00d4aa]/60"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-white/70">Attestation Type</span>
              <select
                required
                value={attestationType}
                onChange={(e) => setAttestationType(e.target.value)}
                className="rounded-lg border border-white/10 bg-[#0d1e35] px-4 py-3 text-white outline-none focus:border-[#00d4aa]/60"
              >
                {ATTESTATION_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#0d1e35]">
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-white/70">Issuing Organization</span>
              <input
                type="text"
                required
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="Organization name"
                className="rounded-lg border border-white/10 bg-[#0d1e35] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#00d4aa]/60"
              />
            </label>

            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full rounded-lg bg-[#00d4aa] py-3.5 text-sm font-semibold text-[#0a1628] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Recording…" : "Record Attestation"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
