'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import ResultsCard from './ResultsCard';
import { MOCK_COMPANIES } from '../../../lib/mockCompanies';
import type { FilterValues } from '../AdvancedFilterPanel';

import { getCompanyIdByName } from '../../../lib/companyUtils';

type Props = {
    query?: string;
    filters?: FilterValues | null;
};

export default function ResultsContainer({ query = '', filters = null }: Props) {
    const [results, setResults] = useState<string[]>([]);

    useEffect(() => {
        const term = (query ?? '').trim().toLowerCase();
        if (!term && (!filters || Object.values(filters).every((v) => !v))) {
            setResults([]);
            return;
        }

        // Mock filtering logic using MOCK_COMPANIES for now
        const matched = MOCK_COMPANIES.filter((c) => c.toLowerCase().includes(term)).slice(0, 50);
        setResults(matched);
    }, [query, filters]);

    const count = results.length;

    return (
        <section className="results-section">
            <div className="page-container">
                <div className="results-header">
                    <div className="results-count">{count} results</div>
                    <button
                        className="results-sort"
                        aria-haspopup="menu"
                        aria-expanded={false}
                        onClick={() => {
                            /* TODO: open sort menu in future */
                        }}
                        type="button"
                    >
                        <span>Sort</span>
                        <Image src="/icons/components/chevron-down.svg" alt="" width={16} height={16} />
                    </button>
                </div>

                {count === 0 ? (
                    <div className="results-empty">No results found.</div>
                ) : (
                    <div className="results-grid">
                        {results.map((r) => (
                            <ResultsCard key={r} name={r} id={getCompanyIdByName(r)} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
