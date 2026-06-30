import QRCode from "qrcode";
import { getBundle } from "@/lib/dynamo";

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { id } = await params;
  const attestations = await getBundle(id);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const pageUrl = `${baseUrl}/verify/${encodeURIComponent(id)}`;
  const qrDataUrl = await QRCode.toDataURL(pageUrl, {
    margin: 2,
    width: 200,
    color: { dark: "#0a1628", light: "#ffffff" },
  });

  const organizations = [
    ...new Set(attestations.map((a) => a.issuer)),
  ].sort();

  return (
    <div className="min-h-full bg-[#0a1628] text-white">
      <div className="mx-auto flex min-h-full max-w-md flex-col px-5 py-10">
        <header className="mb-8">
          <p className="text-sm font-medium tracking-widest text-[#00d4aa] uppercase">
            GhostBorder
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Identity Attestation Bundle
          </h1>
        </header>

        <section className="mb-8 rounded-xl border border-white/10 bg-[#0d1e35] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs tracking-wide text-white/50 uppercase">
                Person ID
              </p>
              <p className="mt-1 break-all font-mono text-sm">{id}</p>

              <p className="mt-4 text-xs tracking-wide text-white/50 uppercase">
                Attestations
              </p>
              <p className="mt-1 text-3xl font-semibold text-[#00d4aa]">
                {attestations.length}
              </p>

              {organizations.length > 0 && (
                <>
                  <p className="mt-4 text-xs tracking-wide text-white/50 uppercase">
                    Organizations
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {organizations.map((org) => (
                      <li key={org} className="text-sm text-white/80">
                        {org}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="shrink-0 rounded-lg bg-white p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt="QR code linking to this verification page"
                width={100}
                height={100}
              />
            </div>
          </div>
        </section>

        {attestations.length === 0 ? (
          <p className="text-center text-sm text-white/50">
            No attestations found for this identity.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {attestations
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime(),
              )
              .map((att) => (
                <li
                  key={att.attestation_id}
                  className="rounded-xl border border-white/10 bg-[#0d1e35] p-4"
                >
                  <p className="text-xs font-medium tracking-wide text-[#00d4aa] uppercase">
                    {att.attestation_type}
                  </p>
                  <p className="mt-2 text-sm font-medium">{att.issuer}</p>
                  <p className="mt-1 text-xs text-white/50">
                    {formatDate(att.timestamp)}
                  </p>
                </li>
              ))}
          </ul>
        )}

        <footer className="mt-auto pt-10 text-center text-xs leading-relaxed text-white/40">
          No single organization controls this record. Cryptographically
          anchored.
        </footer>
      </div>
    </div>
  );
}
