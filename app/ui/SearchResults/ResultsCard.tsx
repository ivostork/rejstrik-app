'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = {
    name: string;
    id: number;
};

export default function ResultsCard({ name, id }: Props) {
    const searchParams = useSearchParams();

    // Preserve current search/filter state for back navigation
    const currentParams = searchParams.toString();
    const detailHref = currentParams
        ? `/company/${id}?from=${encodeURIComponent(currentParams)}`
        : `/company/${id}`;

    return (
        <Link href={detailHref} className="result-card-link">
            <article className="result-card" role="article" aria-label={name}>
                <div className="result-card-content">
                    <h3 className="result-card-title">{name}</h3>
                    <div className="result-card-meta">
                        <div className="tags">
                            <span className="tag tag-status">
                                <Image className="icon-small" src="/icons/components/check-lg.svg" alt="" width={18} height={18} aria-hidden="true" />
                                <span>No insolvency</span>
                            </span>
                        </div>
                        <div className="contact">
                            <span className="phone">
                                <Image className="icon-small" src="/icons/components/hash.svg" alt="" width={16} height={16} aria-hidden="true" />
                                <span className="phone-text">123 456 789</span>
                            </span>
                            <span className="address">
                                <Image className="icon-small" src="/icons/components/geo-alt.svg" alt="" width={16} height={16} aria-hidden="true" />
                                <span className="address-text">Example address 1, City</span>
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
