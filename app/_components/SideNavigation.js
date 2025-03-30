"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="text-primary-600 h-5 w-5" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="text-primary-600 h-5 w-5" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="text-primary-600 h-5 w-5" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-primary-900 border-r">
      <ul className="flex h-full flex-col gap-1 text-lg md:gap-2">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`hover:bg-primary-900 hover:text-primary-100 text-primary-200 flex h-full items-center gap-4 px-2 py-3 font-semibold transition-colors md:px-5 ${pathname === link.href ? "bg-primary-900" : ""}`}
              href={link.href}
            >
              <span>{link.icon}</span>
              <span className="hidden md:block">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
