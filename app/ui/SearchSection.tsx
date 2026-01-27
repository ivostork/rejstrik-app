'use client';

import { useState } from 'react';
import { GovFormSearch, GovFormInput, GovButton } from '@gov-design-system-ce/react';
import Image from 'next/image';
import FilterChips from './FilterChips';
import type { FilterValues } from './AdvancedFilterPanel';

type SearchSectionProps = {
    onSearch?: (query: string) => void;
    onAdvancedSearchClick?: () => void;
    appliedFilters?: FilterValues | null;
    onRemoveFilter?: (key: keyof FilterValues) => void;
};

export default function SearchSection({ onSearch, onAdvancedSearchClick, appliedFilters = null, onRemoveFilter }: SearchSectionProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (onSearch && searchQuery) {
            onSearch(searchQuery);
        }
    };

    return (
        <section className="search-section">
            <div className="page-container">
                <h1 className="search-title">Search entity</h1>

                <div className="search-input-wrapper">
                    <GovFormSearch
                        size="l"
                        button={
                            <GovButton
                                type="solid"
                                color="primary"
                                size="l"
                                onClick={handleSearch}
                                aria-label="Search"
                            >
                                <Image
                                    src="/icons/components/search.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className='icon-currentColor'
                                />
                            </GovButton>
                        }
                    >
                        <GovFormInput
                            size="l"
                            placeholder="Business name, number, person"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search for business entity"
                        />
                    </GovFormSearch>
                </div>

                <button
                    type="button"
                    className="advanced-search-link"
                    onClick={onAdvancedSearchClick}
                >
                    Advanced search
                </button>

                {appliedFilters && (
                    <div className="filter-chips-wrapper">
                        <FilterChips filters={appliedFilters} onRemove={onRemoveFilter ?? (() => { })} />
                    </div>
                )}
            </div>
        </section>
    );
}
