"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../ui/Header';
import Footer from '../../ui/Footer';
import SearchSection from '../../ui/SearchSection';
import ResultsContainer from '../../ui/SearchResults/ResultsContainer';
import type { FilterValues } from '../../ui/AdvancedFilterPanel';

function ResultsContent() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') ?? '';

    const filters: FilterValues | null = {
        community: searchParams.get('community') ?? '',
        street: searchParams.get('street') ?? '',
        legalForm: searchParams.get('legalForm') ?? '',
        fileNumber: searchParams.get('fileNumber') ?? '',
        registeredAt: searchParams.get('registeredAt') ?? '',
    } as FilterValues;

    return (
        <>
            <SearchSection initialQuery={q} appliedFilters={filters} showBreadcrumbs />
            <ResultsContainer query={q} filters={filters} />
        </>
    );
}

export default function ResultsPage() {
    return (
        <div className="page-wrapper">
            <Header />
            <main>
                <Suspense fallback={<div className="page-container">Loading results...</div>}>
                    <ResultsContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
