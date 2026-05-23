import { redirect } from "next/navigation";

import { getPortalHomePath, getSession } from "@/lib/auth/session";

export default async function HomePage() {
  const session = await getSession();

  if (session) {
    redirect(getPortalHomePath(session.portal));
  }

  redirect("/login");
}
