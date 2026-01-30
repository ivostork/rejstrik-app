'use client';

import Image from 'next/image';
import Link from 'next/link';

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type DetailBreadcrumbsProps = {
    items: BreadcrumbItem[];
};

export default function DetailBreadcrumbs({ items }: DetailBreadcrumbsProps) {
    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <span key={index} className="breadcrumb-item">
                        {item.href && !isLast ? (
                            <Link href={item.href} className="breadcrumb-link">
                                {item.label}
                            </Link>
                        ) : (
                            <span className={isLast ? 'breadcrumb-current' : 'breadcrumb-text'}>
                                {item.label}
                            </span>
                        )}
                        {!isLast && (
                            <span className="breadcrumb-sep" aria-hidden="true">
                                <Image
                                    src="/icons/components/chevron-right.svg"
                                    alt=""
                                    width={12}
                                    height={12}
                                />
                            </span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}
