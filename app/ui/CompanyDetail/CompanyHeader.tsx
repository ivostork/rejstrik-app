import Image from 'next/image';
import { CompanyDetailData, formatDateTime } from '../../../lib/mockCompanyDetails';

type CompanyHeaderProps = {
    company: CompanyDetailData;
};

export default function CompanyHeader({ company }: CompanyHeaderProps) {
    return (
        <div className="company-header">
            <div className="company-header-main">
                <h1 className="company-title">{company.companyName}</h1>
                <div className="company-status-tags">
                    {!company.hasInsolvency && (
                        <span className="status-tag status-tag-success">
                            <Image
                                src="/icons/components/check-lg.svg"
                                alt=""
                                width={14}
                                height={14}
                                aria-hidden="true"
                            />
                            <span>No bankruptcy issues</span>
                        </span>
                    )}
                    <span className="company-id-tag">
                        <Image
                            src="/icons/components/hash.svg"
                            alt=""
                            width={14}
                            height={14}
                            aria-hidden="true"
                        />
                        <span>{company.registrationNumber}</span>
                    </span>
                    <span className="company-address-tag">
                        <Image
                            src="/icons/components/geo-alt.svg"
                            alt=""
                            width={14}
                            height={14}
                            aria-hidden="true"
                        />
                        <span>{company.registeredAddress}</span>
                    </span>
                </div>
            </div>
            <div className="company-header-meta">
                <span className="company-last-updated">
                    <strong>DATA VALID AS OF</strong> {formatDateTime(company.lastUpdated).toUpperCase()}
                </span>
            </div>
        </div>
    );
}
