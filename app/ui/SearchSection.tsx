'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { GovFormSearch, GovFormInput, GovButton } from '@gov-design-system-ce/react';
import Image from 'next/image';
import FilterChips from './FilterChips';
import Breadcrumbs from './Breadcrumbs';
import type { FilterValues } from './AdvancedFilterPanel';
import { MOCK_COMPANIES } from '../../lib/mockCompanies';

const DEBOUNCE_MS = 300;
const RECENT_SEARCHES_KEY = 'recentSearches';
const RECENT_LIMIT = 5;

type SearchSectionProps = {
    onSearch?: (query: string) => void;
    onAdvancedSearchClick?: () => void;
    appliedFilters?: FilterValues | null;
    onRemoveFilter?: (key: keyof FilterValues) => void;
    initialQuery?: string;
    showBreadcrumbs?: boolean;
};

export default function SearchSection({ onSearch, onAdvancedSearchClick, appliedFilters = null, onRemoveFilter, initialQuery, showBreadcrumbs = false }: SearchSectionProps) {
    const [searchQuery, setSearchQuery] = useState(initialQuery ?? '');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // -1 means none
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [showingRecent, setShowingRecent] = useState(false);

    const debounceRef = useRef<number | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    // Flag used to suppress the blur close logic when a user submits a search
    const isSubmittingRef = useRef(false);
    const id = useId();
    const listboxId = `autocomplete-list-${id}`; 

    // Load recent searches from localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as string[];
                setRecentSearches(parsed.slice(0, RECENT_LIMIT));
            }
        } catch (e) {
            // ignore
        }
    }, []);

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                window.clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const saveRecentSearch = useCallback((query: string) => {
        if (!query) return;
        setRecentSearches((prev) => {
            const deduped = [query, ...prev.filter((p) => p !== query)].slice(0, RECENT_LIMIT);
            try {
                localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(deduped));
            } catch (e) {
                // ignore
            }
            return deduped;
        });
    }, []);

    const runFilter = useCallback((q: string) => {
        const term = q.trim().toLowerCase();
        if (!term) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }
        const matches = MOCK_COMPANIES.filter((c) => c.toLowerCase().includes(term)).slice(0, 10);
        setSuggestions(matches);
        setHighlightedIndex(-1); // do NOT highlight first item automatically
        setIsOpen(matches.length > 0);
        setShowingRecent(false);
    }, []);

    // If an initialQuery is provided (e.g., on the results page), prefill and run filter
    useEffect(() => {
        if (initialQuery !== undefined) {
            setSearchQuery(initialQuery ?? '');
            const trimmed = (initialQuery ?? '').trim();
            if (trimmed) {
                runFilter(trimmed);
                // store as recent search to keep behaviour consistent
                saveRecentSearch(trimmed);
            } else {
                setSuggestions([]);
                setIsOpen(false);
            }
        }
    }, [initialQuery, runFilter, saveRecentSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setHighlightedIndex(-1);
        setShowingRecent(false);

        if (debounceRef.current) {
            window.clearTimeout(debounceRef.current);
        }
        debounceRef.current = window.setTimeout(() => runFilter(value), DEBOUNCE_MS);
    };

    const handleFocus = () => {
        if (!searchQuery.trim()) {
            // Read recent searches fresh from storage every time on focus/click
            let list: string[] = [];
            try {
                const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
                const parsed = raw ? (JSON.parse(raw) as string[]) : [];
                list = parsed.slice(0, RECENT_LIMIT);
            } catch (e) {
                list = [];
            }

            setRecentSearches(list);
            setSuggestions(list.slice(0, 10)); // limit to 10
            setIsOpen(list.length > 0);
            setShowingRecent(list.length > 0);
            setHighlightedIndex(-1);
        } else {
            runFilter(searchQuery);
        }
    };

    const handleBlur = () => {
        // If we are submitting a search, skip the delayed close to avoid race conditions
        if (isSubmittingRef.current) {
            return;
        }

        // close after a short delay to allow keyboard interactions
        window.setTimeout(() => {
            setIsOpen(false);
            setHighlightedIndex(-1);
            setShowingRecent(false);
        }, 120);

        // Persist the current query into recent searches for testing purposes
        if (searchQuery.trim()) {
            saveRecentSearch(searchQuery.trim());
        }
    };

    const handleWrapperMouseDown = (e: React.MouseEvent) => {
        // When clicking inside the wrapper (but not on input), ensure the input gets focus
        // and the recent searches are shown for an empty input.
        const el = document.getElementById(`search-input-${id}`) as HTMLInputElement | null;
        if (el) {
            // Delay to allow the browser's native focus behavior to settle
            setTimeout(() => {
                el.focus();
                handleFocus();
            }, 0);
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        setSuggestions([]);
        setIsOpen(false);
        setShowingRecent(false);
        setHighlightedIndex(-1);

        // Clear applied filters if a removal callback is provided
        // if (appliedFilters && onRemoveFilter) {
        //     (Object.keys(appliedFilters) as Array<keyof FilterValues>).forEach((k) => {
        //         if (appliedFilters[k]) onRemoveFilter(k);
        //     });
        // }

        // Refocus input for better UX
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const items = showingRecent ? recentSearches : suggestions;
        const visibleLen = Math.min(items.length, 10);
        if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && visibleLen > 0) {
            e.preventDefault();
            setIsOpen(true);
            setHighlightedIndex((prev) => {
                if (e.key === 'ArrowDown') {
                    if (prev === -1) return 0;
                    return (prev + 1) % visibleLen;
                }
                if (prev === -1) return visibleLen - 1;
                return (prev - 1 + visibleLen) % visibleLen;
            });
            return;
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            // If there's content, treat Escape as clear; otherwise close suggestions
            if (searchQuery.trim() !== '') {
                handleClear();
                return;
            }
            setIsOpen(false);
            setHighlightedIndex(-1);
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            const val = searchQuery.trim();
            if (val) {
                // Mark that we're submitting so blur handler doesn't reopen the list
                isSubmittingRef.current = true;
                // Reset the flag shortly after to avoid sticky state (500ms is sufficient)
                window.setTimeout(() => { isSubmittingRef.current = false; }, 500);

                // Close suggestions first to avoid race conditions with navigation
                setIsOpen(false);
                setSuggestions([]);
                setShowingRecent(false);
                // Clear input to ensure the design-system input hides its internal suggestions
                setSearchQuery('');
                // Persist to recent searches
                saveRecentSearch(val);
                // Trigger navigation/search handler if provided
                if (onSearch) onSearch(val);
            }
            return;
        }
    };

    const getActiveDescendant = () => {
        if (highlightedIndex === -1) return undefined;
        return `autocomplete-option-${id}-${highlightedIndex}`;
    };

    // Ensure the highlighted option is scrolled into view for keyboard navigation
    useEffect(() => {
        if (highlightedIndex === -1) return;
        const el = document.getElementById(`autocomplete-option-${id}-${highlightedIndex}`);
        if (el) {
            el.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightedIndex, id]);

    // Keep highlightedIndex in range when suggestion list changes or is limited to 10 items
    useEffect(() => {
        const visibleLen = Math.min(suggestions.length, 10);
        if (visibleLen === 0 && highlightedIndex !== -1) {
            setHighlightedIndex(-1);
        } else if (highlightedIndex >= visibleLen) {
            setHighlightedIndex(visibleLen - 1);
        }
    }, [suggestions, highlightedIndex]);

    // When suggestions are closed, ensure all autocomplete state and UI is fully reset.
    useEffect(() => {
        if (!isOpen) {
            // Defensive reset of suggestion state
            setSuggestions([]);
            setShowingRecent(false);
            setHighlightedIndex(-1);
            // Stop treating as submitting (safety net)
            isSubmittingRef.current = false;

            // If the input is still focused, blur it to make sure the design-system component hides its internal list
            if (inputRef.current && document.activeElement === inputRef.current) {
                // Use a tick to let React updates propagate first
                window.setTimeout(() => {
                    if (inputRef.current && document.activeElement === inputRef.current) {
                        inputRef.current.blur();
                    }
                }, 0);
            }
        }
    }, [isOpen]);

    // handleClear is implemented above — duplicate removed to avoid redeclaration

    return (
        <section className="search-section">
            <div className="page-container">
                {showBreadcrumbs ? <Breadcrumbs query={searchQuery} /> : <h1 className="search-title">Search entity</h1>} 

                <div className="search-input-wrapper" onKeyDown={handleKeyDown} onMouseDown={handleWrapperMouseDown} onClick={handleFocus}>
                    <GovFormSearch
                        size="l"
                        button={
                            <GovButton
                                type="solid"
                                color="primary"
                                size="l"
                                onClick={() => {
                                    const val = searchQuery.trim();
                                    if (!val) return;

                                    // Mark that we're submitting so blur handler doesn't reopen the list
                                    isSubmittingRef.current = true;
                                    window.setTimeout(() => { isSubmittingRef.current = false; }, 500);

                                    // Close suggestions first
                                    setIsOpen(false);
                                    setSuggestions([]);
                                    setShowingRecent(false);
                                    // Clear the input so the webcomponent hides its internal suggestions
                                    setSearchQuery('');
                                    // Persist and then navigate
                                    saveRecentSearch(val);
                                    if (onSearch) onSearch(val);
                                }}  
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
                            ref={inputRef}
                            size="l"
                            id={`search-input-${id}`}
                            placeholder="Business name, number, person"
                            value={searchQuery}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            onClick={handleFocus}
                            aria-label="Search for business entity"
                            aria-controls={listboxId}
                            aria-expanded={isOpen}
                            aria-activedescendant={getActiveDescendant()}
                        />
                    </GovFormSearch>

                    {searchQuery.trim() !== '' && (
                        <button
                            type="button"
                            className="search-clear-button"
                            onClick={handleClear}
                            aria-label="Clear search"
                        >
                            <Image src="/icons/components/x-lg.svg" alt="" width={16} height={16} />
                        </button>
                    )}

                    {isOpen && suggestions.length > 0 && (
                        <div className="autocomplete-list" role="listbox" id={listboxId} aria-label={showingRecent ? 'Recent searches' : 'Suggestions'}>
                            {showingRecent}
                            {suggestions.map((s, i) => (
                                <div
                                    key={s + i}
                                    id={`autocomplete-option-${id}-${i}`}
                                    role="option"
                                    aria-selected={highlightedIndex === i}
                                    className={`autocomplete-item ${highlightedIndex === i ? 'highlighted' : ''}`}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                    )}
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
