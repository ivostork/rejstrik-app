type DetailSectionProps = {
    label: string;
    children: React.ReactNode;
    className?: string;
};

export default function DetailSection({ label, children, className = '' }: DetailSectionProps) {
    return (
        <div className={`detail-section ${className}`}>
            <div className="detail-section-label">
                <span>{label}</span>
            </div>
            <div className="detail-section-content">
                {children}
            </div>
        </div>
    );
}
