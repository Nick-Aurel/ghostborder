# GhostBorder — Identity for the Invisible

GhostBorder is a cryptographic identity vault for displaced people who lack traditional documents or a single trusted authority. NGOs, clinics, and aid organizations can issue attestations—identity registration, vaccination records, aid receipts, residency claims—and each one is anchored with a SHA-256 hash and stored as an immutable bundle. Anyone with a link or QR code can verify that bundle without relying on a central registry.

## Live Demo

**[https://ghostborder-a59kvx1mb-ghostborder.vercel.app](https://ghostborder-a59kvx1mb-ghostborder.vercel.app)**

## Try it

- **Homepage:** [https://ghostborder-a59kvx1mb-ghostborder.vercel.app](https://ghostborder-a59kvx1mb-ghostborder.vercel.app)
- **Issue an attestation:** [https://ghostborder-a59kvx1mb-ghostborder.vercel.app/issue](https://ghostborder-a59kvx1mb-ghostborder.vercel.app/issue)
- **Verify identity (demo):** [https://ghostborder-a59kvx1mb-ghostborder.vercel.app/verify/amara-001](https://ghostborder-a59kvx1mb-ghostborder.vercel.app/verify/amara-001)

## Built With

- **Next.js** — App Router, API routes, and server-side verification pages
- **Vercel** — Deployment and edge hosting
- **Amazon DynamoDB** — Attestation storage keyed by person ID
- **SHA-256** — Cryptographic anchoring of each attestation payload
- **Tailwind CSS** — UI styling

## Why DynamoDB

Attestations are naturally modeled as a collection of records per person: one partition key (`person_id`) and many attestation items underneath it. DynamoDB's key-value access pattern maps directly to that model—issuing an attestation is a single write, and verification is a single query to fetch the full bundle.

For a humanitarian identity system, serverless storage also matters. There are no database servers to provision or patch, costs scale with actual usage rather than idle capacity, and the service stays available across regions without manual failover. That combination—simple data model, predictable lookups, and zero ops overhead—makes DynamoDB a practical foundation for a demo that could grow into production.

## What's Next

- **Aurora DSQL** — Explore a distributed SQL layer for richer queries and cross-organization trust graphs
- **ZK proofs** — Let individuals prove facts from their bundle without revealing the underlying data
- **Offline PWA** — Cache attestations locally so verification works without connectivity at a border or camp
