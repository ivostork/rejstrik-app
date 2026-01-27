'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../ui/Header';
import SearchSection from '../ui/SearchSection';
import InterestingLinks from '../ui/InterestingLinks';
import FaqSection from '../ui/FaqSection';
import Footer from '../ui/Footer';
import AdvancedFilterPanel, { FilterValues } from '../ui/AdvancedFilterPanel';

export default function AdvancedFilterPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleOpenFilter = () => {
        setIsFilterOpen(true);
    };

    const handleCloseFilter = () => {
        setIsFilterOpen(false);
    };

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        if (Object.keys(params).length) {
            setAppliedFilters({
                community: (params.community as string) ?? '',
                street: (params.street as string) ?? '',
                legalForm: (params.legalForm as string) ?? '',
                fileNumber: (params.fileNumber as string) ?? '',
                registeredAt: (params.registeredAt as string) ?? '',
            });
        }
    }, [searchParams]);

    const applyFilters = (filters: FilterValues) => {
        setAppliedFilters(filters);
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([k, v]) => {
            if (v) params.set(k, v);
        });
        const url = params.toString() ? `/?${params.toString()}` : '/';
        router.replace(url);
        setIsFilterOpen(false);
    };

    const removeFilter = (key: keyof FilterValues) => {
        if (!appliedFilters) return;
        const next = { ...appliedFilters, [key]: '' };
        setAppliedFilters(next);
        const params = new URLSearchParams();
        Object.entries(next).forEach(([k, v]) => {
            if (v) params.set(k, v as string);
        });
        const url = params.toString() ? `/?${params.toString()}` : '/';
        router.replace(url);
    };

    return (
        <div className="page-wrapper">
            <Header />
            <main>
                <SearchSection onAdvancedSearchClick={handleOpenFilter} appliedFilters={appliedFilters} onRemoveFilter={removeFilter} />
                <InterestingLinks />
                <FaqSection />
            </main>
            <Footer />

            <AdvancedFilterPanel
                isOpen={isFilterOpen}
                onClose={handleCloseFilter}
                onApply={applyFilters}
                initialValues={appliedFilters}
            />
        </div>
    );
}
