import { NextResponse } from "next/server";
import { getBundle } from "@/lib/dynamo";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const attestations = await getBundle(id);
    return NextResponse.json(attestations);
  } catch (error) {
    console.error("Bundle fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch attestation bundle" },
      { status: 500 },
    );
  }
}
