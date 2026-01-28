'use client';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
    query?: string;
};

export default function Breadcrumbs({ query }: Props) {
    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep" aria-hidden>
                <Image src="/icons/components/chevron-right.svg" alt="" width={12} height={12} />
            </span>
            <span className="breadcrumb-current">{query ? `Results` : 'Results'}</span>
        </nav>
    );
}
