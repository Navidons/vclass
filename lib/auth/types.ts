import type { AdminLevel, Portal, Role } from "./roles";

export interface SessionUser {
  id: string;
  name: string;
  identifier: string;
  role: Role;
  portal: Portal;
  adminLevel?: AdminLevel;
  department?: string;
  faculty?: string;
}

export interface SessionPayload extends SessionUser {
  exp: number;
}
