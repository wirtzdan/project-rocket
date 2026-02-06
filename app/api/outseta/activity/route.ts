import { NextResponse } from "next/server";
import { projectConfig } from "@/config";

export async function POST(request: Request) {
  const apiKey = process.env.OUTSETA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OUTSETA_API_KEY not configured" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { Title, Description, ActivityData, EntityType, EntityUid } = body;

  if (!Title || EntityType == null || !EntityUid) {
    return NextResponse.json(
      { error: "Title, EntityType, and EntityUid are required" },
      { status: 400 }
    );
  }

  const domain = projectConfig.outsetaOptions.domain;

  const res = await fetch(
    `https://${domain}/api/v1/activities/customactivity`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Outseta ${apiKey}`,
      },
      body: JSON.stringify({
        Title,
        Description,
        ActivityData,
        EntityType,
        EntityUid,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: `Outseta API error: ${res.status}`, details: text },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
