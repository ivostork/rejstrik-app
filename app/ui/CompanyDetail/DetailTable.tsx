import { CompanyDetailData, formatDate } from '../../../lib/mockCompanyDetails';
import DetailSection from './DetailSection';
import MemberCard from './MemberCard';
import NestedList from './NestedList';

type DetailTableProps = {
    company: CompanyDetailData;
};

export default function DetailTable({ company }: DetailTableProps) {
    return (
        <div className="detail-table">
            {/* Creation and Registration Date */}
            <DetailSection label="Creation and registration date">
                <p className="detail-value">{formatDate(company.creationDate)}</p>
            </DetailSection>

            {/* File ID */}
            <DetailSection label="File ID">
                <p className="detail-value">{company.fileId}</p>
            </DetailSection>

            {/* Company Name */}
            <DetailSection label="Company name">
                <p className="detail-value">{company.companyName}</p>
            </DetailSection>

            {/* Registered Address */}
            <DetailSection label="Registered address">
                <p className="detail-value">{company.registeredAddress}</p>
            </DetailSection>

            {/* Identification Number */}
            <DetailSection label="Identification ID">
                <p className="detail-value">{company.identificationNumber}</p>
            </DetailSection>

            {/* Legal Structure */}
            <DetailSection label="Legal structure">
                <span className="legal-structure-tag">{company.legalStructure}</span>
            </DetailSection>

            {/* Business Operations */}
            <DetailSection label="Business operations">
                <div className="business-operations">
                    <p className="operations-title">{company.businessOperations.title}</p>
                    <NestedList items={company.businessOperations.items} />
                </div>
                <div className="project-activity-label">
                    <span>Construction project activities</span>
                </div>
            </DetailSection>

            {/* Management Body */}
            <DetailSection label="Management body">
                <div className="management-section">
                    <h4 className="subsection-label">{company.managementBody.label}</h4>
                    {company.managementBody.members.map((member, index) => (
                        <MemberCard key={index} member={member} />
                    ))}

                    <h4 className="subsection-label">Total members</h4>
                    <p className="detail-value indent">{company.managementBody.totalMembers}</p>

                    <h4 className="subsection-label">Method of representation</h4>
                    <p className="detail-value indent">{company.managementBody.mannerOfActing}</p>
                </div>
            </DetailSection>

            {/* Supervisory Board */}
            {company.supervisoryBoard && (
                <DetailSection label="Supervisory board">
                    <div className="supervisory-section">
                        <h4 className="subsection-label">Member of the Supervisory Board</h4>
                        {company.supervisoryBoard.members
                            .filter((m) => m.name !== company.supervisoryBoard?.chairperson?.name)
                            .slice(0, 1)
                            .map((member, index) => (
                                <MemberCard key={index} member={member} />
                            ))}

                        {company.supervisoryBoard.chairperson && (
                            <>
                                <h4 className="subsection-label">Chair of the Supervisory Board</h4>
                                <MemberCard member={company.supervisoryBoard.chairperson} />
                            </>
                        )}

                        {company.supervisoryBoard.members
                            .filter((m) => m.name !== company.supervisoryBoard?.chairperson?.name)
                            .slice(1)
                            .map((member, index) => (
                                <MemberCard key={`other-${index}`} member={member} />
                            ))}

                        <h4 className="subsection-label">Total members</h4>
                        <p className="detail-value indent">{company.supervisoryBoard.totalMembers}</p>

                        <h4 className="subsection-label">Method of representation</h4>
                        <p className="detail-value indent">{company.supervisoryBoard.mannerOfActing}</p>
                    </div>
                </DetailSection>
            )}

            {/* Members / Partners */}
            <DetailSection label="Members">
                <div className="partners-section">
                    <h4 className="subsection-label">Partner</h4>
                    {company.partners.map((partner, index) => (
                        <div key={index} className="partner-card">
                            <div className="partner-name">
                                {partner.name}, ID No.: {partner.idNumber}
                            </div>
                            <div className="partner-address">{partner.address}</div>
                        </div>
                    ))}

                    <h4 className="subsection-label">Ownership share</h4>
                    {company.partners.map((partner, index) => (
                        <div key={index} className="share-details">
                            <div className="share-row">
                                <span className="share-label">Contribution amount:</span>
                                <span className="share-value">{partner.contributionAmount}</span>
                            </div>
                            <div className="share-row">
                                <span className="share-label">Paid amount:</span>
                                <span className="share-value">{partner.paidAmount}</span>
                            </div>
                            <div className="share-row">
                                <span className="share-label">Business share:</span>
                                <span className="share-value">{partner.businessSharePercent}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </DetailSection>

            {/* Registered Capital */}
            <DetailSection label="Registered capital">
                <p className="detail-value">{company.registeredCapital}</p>
            </DetailSection>

            {/* Additional Information */}
            <DetailSection label="Additional information">
                <p className="detail-value">{company.additionalInformation}</p>
            </DetailSection>
        </div>
    );
}
