'use client';

import Image from 'next/image';

type Props = {
    name: string;
};

export default function ResultsCard({ name }: Props) {
    return (
        <article className="result-card" role="article" aria-label={name}>
            <div className="result-card-content">
                <h3 className="result-card-title">{name}</h3>
                <div className="result-card-meta">
                    <div className="tags">
                        <span className="tag tag-status">No insolvency</span>
                    </div>
                    <div className="contact">
                        <span className="phone">
                            <Image src="/icons/components/hash.svg" alt="" width={16} height={16} />
                            <span className="phone-text">123 456 789</span>
                        </span>
                        <span className="address">
                            <Image src="/icons/components/geo-alt.svg" alt="" width={16} height={16} />
                            <span className="address-text">Example address 1, City</span>
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}
