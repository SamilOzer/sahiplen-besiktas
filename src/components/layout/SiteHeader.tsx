"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { primaryNavigation } from "@/config/navigation";

function isCurrentRoute(pathname: string, href: string): boolean {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const previousPathname = useRef(pathname);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      document.querySelector<HTMLElement>("#main-content")?.focus();
      previousPathname.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link
          className="brand"
          href="/"
          aria-label="Beşiktaş Belediyesi Hayvan Sağlığı ve Sahiplendirme ana sayfası"
        >
          <span className="brand__monogram" aria-hidden="true">B</span>
          <span className="brand__copy">
            <span className="brand__institution">Beşiktaş Belediyesi</span>
            <span className="brand__service">Hayvan hizmetleri</span>
          </span>
        </Link>

        <nav className="desktop-navigation" aria-label="Ana navigasyon">
          <ul>
            {primaryNavigation.map((item) => {
              const isCurrent = isCurrentRoute(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    className={`navigation-link${
                      item.href === "/sahiplendirme"
                        ? " navigation-link--cta"
                        : ""
                    }`}
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={menuButton}
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span aria-hidden="true">{isOpen ? "Kapat" : "Menü"}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
            {isOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className="mobile-navigation"
        aria-label="Mobil navigasyon"
        hidden={!isOpen}
      >
        <ul className="container">
          {primaryNavigation.map((item) => {
            const isCurrent = isCurrentRoute(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
