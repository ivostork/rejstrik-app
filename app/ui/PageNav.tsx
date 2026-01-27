'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
    href: string;
    label: string;
};

const NAV_ITEMS: NavItem[] = [
    { href: '/', label: 'Homepage' },
    { href: '/advanced-filter', label: 'Advanced Filter' },
];

export default function PageNav() {
    const pathname = usePathname();

    return (
        <nav className="page-nav" aria-label="Test pages" role="navigation">
            <ul className="page-nav-list">
                {NAV_ITEMS.map((item) => (
                    <li key={item.href} className="page-nav-item">
                        <Link
                            href={item.href}
                            className={`page-nav-link ${pathname === item.href ? 'page-nav-link--active' : ''}`}
                            aria-current={pathname === item.href ? 'page' : undefined}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
