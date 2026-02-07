import { NextResponse } from "next/server";
import { projectConfig } from "@/config";

export async function PUT(request: Request) {
  const apiKey = process.env.OUTSETA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OUTSETA_API_KEY not configured" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { Uid, ...fields } = body;

  if (!Uid) {
    return NextResponse.json({ error: "Uid is required" }, { status: 400 });
  }

  const domain = projectConfig.outsetaOptions.domain;

  const res = await fetch(`https://${domain}/api/v1/crm/people/${Uid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Outseta ${apiKey}`,
    },
    body: JSON.stringify({ Uid, ...fields }),
  });

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
