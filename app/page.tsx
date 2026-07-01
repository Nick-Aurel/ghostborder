import Link from "next/link";

function StatusBar() {
  return (
    <div className="relative z-10 flex h-12 items-end justify-between px-7 pb-1">
      <span className="text-[15px] font-semibold text-white">9:41</span>
      <div className="flex items-center gap-1.5">
        {/* Cellular signal */}
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
          aria-hidden
        >
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="white" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill="white" />
          <rect x="10" y="2" width="3" height="10" rx="0.5" fill="white" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill="white" />
        </svg>
        {/* Wi-Fi */}
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          aria-hidden
        >
          <path
            d="M8 10.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
            fill="white"
          />
          <path
            d="M4.5 7.2a5.5 5.5 0 017 0"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M1.5 4.2a9.5 9.5 0 0113 0"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {/* Battery */}
        <svg
          width="27"
          height="13"
          viewBox="0 0 27 13"
          fill="none"
          aria-hidden
        >
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="12"
            rx="3"
            stroke="white"
            strokeOpacity="0.4"
          />
          <rect x="2" y="2" width="18" height="9" rx="1.5" fill="white" />
          <path
            d="M24 4.5v4a2 2 0 002-2v0a2 2 0 00-2-2z"
            fill="white"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

function PadlockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-[#00d4aa]/70"
    >
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 11V8a4 4 0 018 0v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111] p-6">
      {/* iPhone 14 Pro frame */}
      <div
        className="relative rounded-[3.25rem] bg-gradient-to-b from-[#4a4a4c] via-[#2c2c2e] to-[#1c1c1e] p-[11px]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.08), 0 25px 50px -12px rgba(0,0,0,0.8), 0 50px 100px -20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Side buttons (decorative) */}
        <div className="absolute -left-[2px] top-[120px] h-8 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -left-[2px] top-[170px] h-14 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -left-[2px] top-[230px] h-14 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -right-[2px] top-[180px] h-20 w-[3px] rounded-r-sm bg-[#3a3a3c]" />

        {/* Screen */}
        <div className="relative h-[844px] w-[390px] overflow-hidden rounded-[2.65rem] bg-[#0a1628]">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[11px] z-30 h-[34px] w-[126px] -translate-x-1/2 rounded-full bg-black" />

          <StatusBar />

          {/* App content */}
          <div className="flex h-[calc(100%-3rem)] flex-col px-7 pt-10">
            <div className="flex flex-1 flex-col items-center text-center">
              <p className="text-sm font-bold tracking-[0.35em] text-[#00d4aa]">
                GHOSTBORDER
              </p>

              <div className="mt-16 flex flex-col gap-4">
                <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-white">
                  Identity for the Invisible
                </h1>
                <p className="text-[15px] leading-relaxed text-white/55">
                  A cryptographic vault for displaced people. No documents. No
                  single authority.
                </p>
              </div>

              <div className="mt-12 w-full space-y-3">
                <Link
                  href="/issue"
                  className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-[#00d4aa] text-[15px] font-semibold text-[#0a1628] transition-colors hover:bg-[#00e8bb] active:bg-[#00c49a]"
                >
                  Issue Attestation
                </Link>
                <Link
                  href="/verify/amara-001"
                  className="flex h-[52px] w-full items-center justify-center rounded-2xl border border-[#00d4aa]/40 text-[15px] font-semibold text-[#00d4aa] transition-colors hover:border-[#00d4aa]/70 hover:bg-[#00d4aa]/5 active:bg-[#00d4aa]/10"
                >
                  Verify Identity
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 pb-10">
              <PadlockIcon />
              <span className="text-xs text-white/35">
                Cryptographically anchored
              </span>
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-white/25" />
        </div>
      </div>
    </div>
  );
}
