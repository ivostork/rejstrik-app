'use client';

import { useEffect, useState } from 'react';
import { GovButton, GovFormSelect, GovFormInput } from '@gov-design-system-ce/react';
import Image from 'next/image';

export type FilterValues = {
    community: string;
    street: string;
    legalForm: string;
    fileNumber: string;
    registeredAt: string;
};

export const COMMUNITY_OPTIONS = [
    { value: '', label: 'Select community' },
    { value: 'plzen', label: 'Plzen' },
    { value: 'praha', label: 'Praha' },
    { value: 'brno', label: 'Brno' },
    { value: 'ostrava', label: 'Ostrava' },
];

export const LEGAL_FORM_OPTIONS = [
    { value: '', label: 'Select legal form' },
    { value: 'llc', label: 'Limited liability company' },
    { value: 'jsc', label: 'Joint-stock company' },
    { value: 'sole', label: 'Sole proprietorship' },
    { value: 'partnership', label: 'Partnership' },
];

export const REGISTERED_AT_OPTIONS = [
    { value: '', label: 'Select court' },
    { value: 'plzen', label: 'Regional Court in Plzen' },
    { value: 'praha', label: 'Municipal Court in Prague' },
    { value: 'brno', label: 'Regional Court in Brno' },
    { value: 'ostrava', label: 'Regional Court in Ostrava' },
];

type AdvancedFilterPanelProps = {
    isOpen: boolean;
    onClose: () => void;
    onApply?: (filters: FilterValues) => void;
    initialValues?: FilterValues | null;
};

export default function AdvancedFilterPanel({
    isOpen,
    onClose,
    onApply,
    initialValues = null,
}: AdvancedFilterPanelProps) {
    const emptyValues: FilterValues = {
        community: '',
        street: '',
        legalForm: '',
        fileNumber: '',
        registeredAt: '',
    };

    const [values, setValues] = useState<FilterValues>(initialValues ?? emptyValues);

    // Reset values when panel opens or initial values change
    useEffect(() => {
        if (isOpen) {
            setValues(initialValues ?? emptyValues);
        }
    }, [isOpen, initialValues]);

    const handleApply = () => {
        if (onApply) {
            onApply(values);
        }
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            {/* Overlay */}
            <div
                className="filter-panel-overlay"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Filter Panel */}
            <aside
                className="filter-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="filter-panel-title"
            >
                {/* Header */}
                <header className="filter-panel-header">
                    <h2 id="filter-panel-title" className="filter-panel-title">
                        Filter
                    </h2>
                    <button
                        type="button"
                        className="filter-panel-close"
                        onClick={onClose}
                        aria-label="Close filter panel"
                    >
                        <Image
                            src="/icons/components/x-lg.svg"
                            alt=""
                            width={14}
                            height={14}
                        />
                    </button>
                </header>

                {/* Content */}
                <div className="filter-panel-content">
                    {/* Location Filters Group */}
                    <div className="filter-group">
                        <div className="filter-field">
                            <label className="filter-label" htmlFor="filter-community">
                                Community
                            </label>
                            <GovFormSelect
                                value={values.community}
                                onChange={(e) => setValues({ ...values, community: (e.target as HTMLSelectElement).value })}
                                size="s"
                                id="filter-community"
                                aria-label="Select community"
                            >
                                {COMMUNITY_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                                <Image slot="sufix" src="/icons/components/chevron-down.svg" alt="" width={14} height={14} />
                            </GovFormSelect> 
                        </div>

                        <div className="filter-field">
                            <label className="filter-label" htmlFor="filter-street">
                                Street
                            </label>
                            <GovFormSelect
                                value={values.street}
                                onChange={(e) => setValues({ ...values, street: (e.target as HTMLSelectElement).value })}
                                size="s"
                                id="filter-street"
                                aria-label="Select street"
                            >
                                <option value="">Select street</option>
                                <Image slot="sufix" src="/icons/components/chevron-down.svg" alt="" width={14} height={14} />
                            </GovFormSelect> 
                        </div>

                        <div className="filter-field">
                            <label className="filter-label" htmlFor="filter-legal-form">
                                Legal form
                            </label>
                            <GovFormSelect
                                value={values.legalForm}
                                onChange={(e) => setValues({ ...values, legalForm: (e.target as HTMLSelectElement).value })}
                                size="s"
                                id="filter-legal-form"
                                aria-label="Select legal form"
                            >
                                {LEGAL_FORM_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                                <Image slot="sufix" src="/icons/components/chevron-down.svg" alt="" width={14} height={14} />
                            </GovFormSelect> 
                        </div>
                    </div>

                    <hr className="filter-divider" />

                    {/* Registration Filters Group */}
                    <div className="filter-group">
                        <div className="filter-field">
                            <label className="filter-label" htmlFor="filter-file-number">
                                File number
                            </label>
                            <GovFormInput
                                size="s"
                                id="filter-file-number"
                                placeholder=""
                                aria-label="Enter file number"
                                value={values.fileNumber}
                                onChange={(e) => setValues({ ...values, fileNumber: (e.target as HTMLInputElement).value })}
                            />
                        </div>

                        <div className="filter-field">
                            <label className="filter-label" htmlFor="filter-registered-at">
                                Registered at
                            </label>
                            <GovFormSelect
                                value={values.registeredAt}
                                onChange={(e) => setValues({ ...values, registeredAt: (e.target as HTMLSelectElement).value })}
                                size="s"
                                id="filter-registered-at"
                                aria-label="Select registration court"
                            >
                                {REGISTERED_AT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                                <Image slot="sufix" src="/icons/components/chevron-down.svg" alt="" width={14} height={14} />
                            </GovFormSelect> 
                        </div>
                    </div>
                </div>

                {/* Footer with Actions */}
                <footer className="filter-panel-footer">
                    <hr className="filter-divider" />
                    <div className="filter-actions">
                        <GovButton
                            type="solid"
                            color="primary"
                            size="m"
                            onClick={handleApply}
                        >
                            Apply
                        </GovButton>
                        <GovButton
                            type="outlined"
                            color="primary"
                            size="m"
                            onClick={handleCancel}
                        >
                            Cancel
                        </GovButton>
                    </div>
                </footer>
            </aside>
        </>
    );
}
