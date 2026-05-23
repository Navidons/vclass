import {
  BookOpen,
  Calendar,
  DollarSign,
  FileEdit,
  FileText,
  GraduationCap,
  Home,
  MessageCircle,
  PieChart,
  Settings,
  Users,
  Video,
  Vote,
} from "lucide-react";

import { portalPath } from "@/lib/auth/routes";
import { PORTALS } from "@/lib/auth/roles";
import type { NavItemConfig } from "./types";

const base = portalPath(PORTALS.STUDENT);

export const studentMainNavigation: NavItemConfig[] = [
  { name: "Home", href: base, icon: Home },
  { name: "My Modules", href: `${base}/modules`, icon: BookOpen },
  { name: "Lectures", href: `${base}/lectures`, icon: Users },
  { name: "My Timetable", href: `${base}/timetable`, icon: Calendar },
  { name: "Course Work", href: `${base}/coursework`, icon: FileText },
  { name: "Examinations", href: `${base}/exams`, icon: GraduationCap },
  { name: "Examination Results", href: `${base}/results`, icon: PieChart },
  { name: "Financial Statements", href: `${base}/finance`, icon: DollarSign },
  { name: "Tutorials", href: `${base}/tutorials`, icon: Video },
  { name: "VU Elections", href: `${base}/elections`, icon: Vote },
  { name: "Chats / Inquiries", href: `${base}/chats`, icon: MessageCircle },
  { name: "Apply For Changes", href: `${base}/changes`, icon: FileEdit },
];

export const studentBottomNavigation: NavItemConfig[] = [
  { name: "Settings", href: `${base}/settings`, icon: Settings },
];
