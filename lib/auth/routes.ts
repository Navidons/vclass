import type { Portal } from "./roles";

export function portalPath(portal: Portal, segment = ""): string {
  const base = `/${portal}`;
  if (!segment) return base;
  return `${base}/${segment.replace(/^\//, "")}`;
}
