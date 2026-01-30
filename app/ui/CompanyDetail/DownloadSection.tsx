'use client';

import { GovButton } from '@gov-design-system-ce/react';
import Image from 'next/image';

export default function DownloadSection() {
    const handleDownload = () => {
        // In real implementation, this would trigger PDF download
        console.log('Downloading PDF document...');
    };

    const handlePrint = () => {
        // In real implementation, this would trigger print dialog
        window.print();
    };

    return (
        <div className="download-section">
            {/* Print icon button - per Figma design, appears first */}
            <GovButton
                type="outlined"
                color="secondary"
                size="m"
                onClick={handlePrint}
                aria-label="Print"
                className="print-icon-button"
            >
                <Image
                    src="/icons/components/printer.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                />
            </GovButton>
            {/* Download PDF button - solid secondary (orange) with black text per Figma design */}
            <GovButton
                type="solid"
                color="secondary"
                size="m"
                onClick={handleDownload}
                className="download-pdf-button"
                iconStart={
                    <Image
                        src="/icons/components/file-earmark-arrow-down.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="icon-black"
                    />
                }
            >
                Download PDF document
            </GovButton>
        </div>
    );
}
