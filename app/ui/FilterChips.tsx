'use client';

import Image from 'next/image';
import { FilterValues, COMMUNITY_OPTIONS, LEGAL_FORM_OPTIONS, REGISTERED_AT_OPTIONS } from './AdvancedFilterPanel';

type FilterChipsProps = {
    filters: FilterValues | null;
    onRemove: (key: keyof FilterValues) => void;
};

export default function FilterChips({ filters, onRemove }: FilterChipsProps) {
    if (!filters) return null;

    const getLabel = (key: keyof FilterValues, value: string) => {
        if (!value) return '';
        switch (key) {
            case 'community':
                return COMMUNITY_OPTIONS.find((o) => o.value === value)?.label ?? value;
            case 'legalForm':
                return LEGAL_FORM_OPTIONS.find((o) => o.value === value)?.label ?? value;
            case 'registeredAt':
                return REGISTERED_AT_OPTIONS.find((o) => o.value === value)?.label ?? value;
            case 'fileNumber':
            case 'street':
            default:
                return value;
        }
    };

    const entries = Object.entries(filters) as Array<[keyof FilterValues, string]>;
    const active = entries.filter(([, v]) => v && v !== '');

    if (active.length === 0) return null;

    return (
        <div className="filter-chips" aria-live="polite">
            {active.map(([key, value]) => {
                const label = getLabel(key, value);
                return (
                    <span key={key} className="filter-chip">
                        <span className="filter-chip-text">{label}</span>
                        <button
                            type="button"
                            className="filter-chip-remove"
                            onClick={() => onRemove(key)}
                            aria-label={`Remove filter ${label}`}
                        >
                            <Image className="icon-currentColor" src="/icons/components/x-lg.svg" alt="Remove" width={12} height={12} />
                        </button>
                    </span>
                );
            })}
        </div>
    );
}
