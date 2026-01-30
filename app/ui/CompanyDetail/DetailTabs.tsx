'use client';

import { useState } from 'react';

type Tab = {
    id: string;
    label: string;
};

const TABS: Tab[] = [
    { id: 'valid', label: 'Only valid' },
    { id: 'complete', label: 'Complete report' },
    { id: 'documents', label: 'Document collection' },
];

export default function DetailTabs() {
    const [activeTab, setActiveTab] = useState('valid');

    return (
        <div className="detail-tabs" role="tablist" aria-label="Company information tabs">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    className={`detail-tab ${activeTab === tab.id ? 'detail-tab-active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
