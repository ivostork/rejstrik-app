import { ExecutiveMember } from '../../../lib/mockCompanyDetails';

type MemberCardProps = {
    member: ExecutiveMember;
};

export default function MemberCard({ member }: MemberCardProps) {
    return (
        <div className="member-card">
            <div className="member-name">{member.name}</div>
            <div className="member-address">{member.address}</div>
            <div className="member-dates">
                {member.dateOfOffice && (
                    <span className="member-date">{member.dateOfOffice}</span>
                )}
                {member.membershipDate && (
                    <span className="member-date">{member.membershipDate}</span>
                )}
            </div>
        </div>
    );
}
