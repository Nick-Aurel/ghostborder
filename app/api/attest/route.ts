import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { writeAttestation } from "@/lib/dynamo";

interface AttestRequestBody {
  person_id: string;
  issuer: string;
  attestation_type: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AttestRequestBody;
    const { person_id, issuer, attestation_type } = body;

    if (!person_id || !issuer || !attestation_type) {
      return NextResponse.json(
        { error: "person_id, issuer, and attestation_type are required" },
        { status: 400 },
      );
    }

    const attestation_id = uuidv4();
    const timestamp = new Date().toISOString();

    const payload = `${person_id}${issuer}${attestation_type}${attestation_id}${timestamp}`;
    const hash = createHash("sha256").update(payload).digest("hex");

    await writeAttestation({
      person_id,
      attestation_id,
      issuer,
      attestation_type,
      timestamp,
      hash,
    });

    return NextResponse.json({ person_id });
  } catch (error) {
    console.error("Attestation error:", error);
    return NextResponse.json(
      { error: "Failed to record attestation" },
      { status: 500 },
    );
  }
}
