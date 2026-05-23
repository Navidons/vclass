import { NextResponse } from "next/server";

import { authenticateUser } from "@/lib/auth/authenticate";
import { getPortalHomePath } from "@/lib/auth/config";
import { createSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = await request.json();
  const identifier = String(body.identifier ?? "").trim();
  const password = String(body.password ?? "");

  if (!identifier || !password) {
    return NextResponse.json(
      { error: "Identifier and password are required" },
      { status: 400 }
    );
  }

  const user = await authenticateUser(identifier, password);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createSession(user);

  return NextResponse.json({
    portal: user.portal,
    redirectTo: getPortalHomePath(user.portal),
    user: {
      name: user.name,
      identifier: user.identifier,
      role: user.role,
      portal: user.portal,
    },
  });
}
